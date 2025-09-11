import axios from "axios";
import { NotFoundError } from "../../errors/customErrors.js";
import MiningUser from "../../models/miningApp/MiningUser.js";
import MiningPayment from "../../models/miningApp/MiningPayment.js";
import crypto from "crypto";
import {
  assignMinerToUser,
  updateUserWallet,
} from "../../utils/helperFunctions.js";

export const createPaymentIntent = async (req, res) => {
  const { amount, message } = req.body;
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
      await assignMinerToUser(pi.userId);
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
