import axios from "axios";
import { v4 as uuid4 } from "uuid";
import { NotFoundError } from "../../errors/customErrors.js";
import MiningUser from "../../models/miningApp/MiningUser.js";
import MiningPayment from "../../models/miningApp/MiningPayment.js";
import crypto from "crypto";
import {
  assignMinerToUser,
  updateUserWallet,
} from "../../utils/helperFunctions.js";
import { deusxPayRequest, verifyWebhook } from "../../utils/deusxpay.js";
import MiningCryptoPayment from "../../models/miningApp/MiningCryptoPayment.js";
import MiningPayout from "../../models/miningApp/MiningPayout.js";

export const createPaymentIntent = async (req, res) => {
  const { amount, message, items } = req.body;
  const user = await MiningUser.findById(req.user.userId);
  if (!user) throw new NotFoundError("No user has been found");
  const payload = {
    amount: Number(amount * 100),
    currency_code: "AED",
    message: message,
    success_url:
      message === "miner purchase"
        ? process.env.FRONTEND_SUCCESS_URL
        : process.env.FRONTEND_SUCCESS_URL_WALLET,
    cancel_url: process.env.FRONTEND_CANCEL_URL,
    failure_url: process.env.FRONTEND_FAILURE_URL,
    test: false,
    expiry: null,
    allow_tips: false,
  };

  const { data } = await axios.post(
    "https://api-v2.ziina.com/api/payment_intent",
    payload,
    { headers: { Authorization: `Bearer ${process.env.ZIINA_ACCESS_TOKEN}` } }
  );

  const pi = new MiningPayment({
    ziinaId: data.id,
    userId: user._id,
    amount: data.amount,
    currencyCode: data.currency_code,
    status: data.status,
    redirectURL: data.redirect_url,
    successURL: data.success_url,
    cancelURL: data.cancel_url,
    message: data.message,
    allowTips: data.allow_tips,
    isTest: false,
    lastPayload: data,
    items: items,
  });
  await pi.save();

  res
    .status(200)
    .json({ payment_intent_id: data.id, redirect_url: data.redirect_url });
};

export const getPaymentIntent = async (req, res) => {
  const { ziinaId } = req.params;
  const { data } = await axios.get(
    `https://api-v2.ziina.com/api/payment_intent/${ziinaId}`,
    { headers: { Authorization: `Bearer ${process.env.ZIINA_ACCESS_TOKEN}` } }
  );
  await MiningPayment.findOneAndUpdate(
    { ziinaId },
    { status: data.status, lastPayload: data }
  );
  res.status(200).json(data);
};

export const registerWebhook = async (req, res) => {
  const { url, secret } = req.body;
  const { data } = await axios.post(
    "https://api-v2.ziina.com/api/webhook",
    {
      url,
      secret,
    },
    { headers: { Authorization: `Bearer ${process.env.ZIINA_ACCESS_TOKEN}` } }
  );
  res.status(200).json(data);
};

export const deleteWebHook = async (req, res) => {
  const { data } = await axios.delete("https://api-v2.ziina.com/api/webhook", {
    headers: { Authorization: `Bearer ${process.env.ZIINA_ACCESS_TOKEN}` },
  });
  res.status(200).json(data);
};
export const processWebHook = async (req, res) => {
  const signature = req.header("X-Hmac-Signature");
  const secret = process.env.ZIINA_WEBHOOK_SECRET;
  const raw = req.body;
  if (secret) {
    const expected = crypto
      .createHmac("sha256", secret)
      .update(raw)
      .digest("hex");
    if (expected !== signature) {
      console.warn("Invalid webHook Signature");
      return res.sendStatus(401);
    }
  }
  const payload = JSON.parse(raw.toString("utf8"));
  if (payload.event !== "payment_intent.status.updated") {
    return res.sendStatus(200);
  }

  const intent = payload.data;
  const { id: ziinaId, status, amount } = intent;

  const pi = await MiningPayment.findOneAndUpdate(
    { ziinaId },
    { status, lastPayload: intent },
    { new: true }
  );
  try {
    if (
      status === "completed" &&
      pi &&
      pi.message === "miner purchase" &&
      !pi.processed
    ) {
      await assignMinerToUser(pi.userId, pi.items);
      pi.processed = true;
      await pi.save();
    }
    if (
      status === "completed" &&
      pi &&
      pi.message === "wallet Topup" &&
      !pi.processed
    ) {
      await updateUserWallet(pi.userId, amount);
      pi.processed = true;
      await pi.save();
    }
  } catch (err) {
    console.error("Error processing webhook:", err);
  }
  res.sendStatus(200);
};

export const createCryptoPaymentIntent = async (req, res) => {
  const { amount, message, items, crypto } = req.body;
  const orderId = uuid4();
  const requestBody = {
    requested_currency: "AED",
    requested_amount: amount.toString(),
    payment_currency: crypto,
    profile_uuid: process.env.DEUSX_PROFILE_UUID,
    passthrough: JSON.stringify({ orderId: orderId, note: message }),
    notes: message,
  };

  const response = await deusxPayRequest("payments/", requestBody, "POST");
  const paymentData = response.data;

  const payment = new MiningCryptoPayment({
    deusxId: paymentData.result.id,
    userId: req.user.userId,
    orderId: orderId,
    requestedCurrency: paymentData.result.requested_currency,
    requestedAmount: paymentData.result.requested_amount,
    paymentCurrency: paymentData.result.payment_currency,
    status: paymentData.result.status,
    addresses: paymentData.result.addresses,
    notes: paymentData.result.notes,
    passthrough: paymentData.result.passthrough,
    rawResponse: paymentData.result,
    paymentAmount: paymentData.result.payment_amount,
    items: items,
  });

  await payment.save();
  res.status(200).json(paymentData.result);
};

export const getCryptoPaymentIntent = async (req, res) => {
  const payment = await MiningCryptoPayment.findOne({ deusxId: req.params.id });
  if (!payment) throw new NotFoundError("No Payment Found");
  res.status(200).json(payment);
};

export const deusxWebhook = async (req, res) => {
  try {
    const event = req.body;
    if (!verifyWebhook(event.callback_id, event.signature)) {
      console.error("❌ Invalid webhook signature");
      return res.status(401).json({ error: "Invalid signature" });
    }
    console.log("✅ Webhook verified:", event.callback_status);

    if (event.payment) {
      const payment = await MiningCryptoPayment.findOne({
        deusxId: event.payment?.id,
      });
      if (!payment) {
        console.warn("⚠️ No payment found for deusxId:", event.payment?.id);
        return res.sendStatus(200);
      }
      payment.status = event.payment.status;
      payment.rawResponse = req.body;
      if (event.callback_status === "payment_complete" && !payment.processed) {
        try {
          if (payment.notes === "miner purchase") {
            await assignMinerToUser(payment.userId, payment.items);
          }
          if (payment.notes === "wallet Topup") {
            const paymentAmount = payment.requestedAmount * 100; //because using the same function of ziina. in zina amount is in smaller units
            await updateUserWallet(payment.userId, paymentAmount);
          }
          payment.processed = true;
          await payment.save();
          console.log("🎉 Miner assigned to user:", payment.userId);
        } catch (error) {
          console.error("❌ assignMinerToUser failed:", error.message);
          return res.sendStatus(500); // ⚡ DeusX will retry webhook later
        }
      } else {
        await payment.save();
      }

      console.log("🔄 Updated payment:", payment.orderId, event.payment.status);
      res.sendStatus(200);
    } else if (event.withdrawal) {
      const withdrawal = await MiningPayout.findOne({
        deusxId: event.withdrawal?.id,
      });
      if (!withdrawal) {
        console.warn(
          "⚠️ No withdrawal found for deusxId:",
          event.withdrawal?.id
        );
        return res.sendStatus(200);
      }
      withdrawal.status = event.withdrawal.status;
      withdrawal.rawResponse = JSON.stringify(req.body);
      if (
        event.callback_status === "withdrawal_complete" &&
        !withdrawal.isUpdated
      ) {
        try {
          const user = await MiningUser.findById(withdrawal.user);
          if (!user) throw new NotFoundError("No user found");
          user.currentBalance = user.currentBalance - withdrawal.amount;
          user.amountWithdrawed = user.amountWithdrawed + withdrawal.amount;
          withdrawal.isUpdated = true;
          await user.save();
          await withdrawal.save();
          console.log(
            "🎉 Amount successfully transferred to user:",
            withdrawal.user
          );
        } catch (error) {
          console.error("❌ Transaction failed failed:", error.message);
          return res.sendStatus(500); // ⚡ DeusX will retry webhook later
        }
      } else {
        await withdrawal.save();
      }
      console.log(
        "🔄 Updated Withdrawal:",
        withdrawal._id,
        event.withdrawal.status
      );
      res.sendStatus(200);
    }
  } catch (error) {
    console.error("Webhook error:", error.message);
    res.sendStatus(500);
  }
};

export const getCryptoTransactions = async (req, res) => {
  const { currentPage } = req.query;
  const page = currentPage || 1;
  const limit = 15;
  const skip = (page - 1) * limit;
  const payments = await MiningCryptoPayment.find({
    userId: req.user.userId,
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  if (!payments) throw new NotFoundError("No payments");
  const totalTransactions = await MiningCryptoPayment.countDocuments({
    userId: req.user.userId,
  });
  const totalPages = Math.ceil(totalTransactions / limit);
  res.status(200).json({ payments, totalPages });
};

export const walletInfo = async (req, res) => {
  res.status(200).json({
    message:
      "This is a read only page to make payments towards wallet please visit mining.dahabminers.com",
  });
};
