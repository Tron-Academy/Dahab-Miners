import { BadRequestError, NotFoundError } from "../../errors/customErrors.js";
import MiningPayout from "../../models/miningApp/MiningPayout.js";
import MiningUser from "../../models/miningApp/MiningUser.js";
import { deusxPayRequest } from "../../utils/deusxpay.js";

export const getAllPayouts = async (req, res) => {
  const { currentPage } = req.query;
  const page = currentPage || 1;
  const limit = 15;
  const skip = (page - 1) * limit;
  const payouts = await MiningPayout.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("user", "username email currentBalance");
  if (!payouts) throw new NotFoundError("No user found");
  const totalPayouts = await MiningPayout.countDocuments();
  const totalPages = Math.ceil(totalPayouts / limit);
  res.status(200).json({ payouts, totalPages });
};

export const makeWithdrawal = async (req, res) => {
  const user = await MiningUser.findById(req.user.userId);
  if (!user) throw new NotFoundError("No user found");
  const { amount, address } = req.body;
  if (amount < 0.005)
    throw new BadRequestError(
      "Minimum withdrawal amount is 0.005 BTC. Please enter an amount equal to or greater than this threshold"
    );
  if (user.currentBalance < amount)
    throw new BadRequestError("Insufficient Balance");
  if (user.walletBalance < 0)
    throw new BadRequestError(
      "Unable to withdraw due to negative wallet balance, Please top-up your wallet balance to withdraw"
    );
  const newPayout = new MiningPayout({
    user: user._id,
    date: new Date(),
    walletAddress: address,
    amount: amount,
    status: "Pending",
    isUpdated: false,
  });
  await newPayout.save();
  user.currentBalance = user.currentBalance - amount;
  user.amountWithdrawed = user.amountWithdrawed + amount;
  user.allPayouts.push(newPayout._id);
  await user.save();
  res.status(200).json({ msg: "Withdrawal processed successfully", user });
};

export const getUserPayouts = async (req, res) => {
  const { status, currentPage } = req.query;
  const queryObject = { user: req.user.userId };
  if (status && status !== "All") {
    queryObject.status = { $regex: status, $options: "i" };
  }
  const page = parseInt(currentPage) || 1;
  const limit = 15;
  const skip = (page - 1) * limit;
  const payouts = await MiningPayout.find(queryObject)
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);
  if (!payouts) throw new NotFoundError("No payouts found");
  const totalPayouts = await MiningPayout.countDocuments(queryObject);
  const totalPages = Math.ceil(totalPayouts / limit);
  res.status(200).json({ payouts, totalPages });
};

export const updatePayoutStatus = async (req, res) => {
  const { status, id, userId, amount } = req.body;
  console.log(req.body);

  const payout = await MiningPayout.findById(id);
  if (!payout) throw new NotFoundError("No Payout Found");
  if (payout.isUpdated)
    throw new BadRequestError("Payout status already updated");
  if (status === "Completed") {
    const user = await MiningUser.findById(userId);
    if (!user) throw new NotFoundError("No user found");
    user.currentBalance = user.currentBalance + amount;
    user.amountWithdrawed = user.amountWithdrawed - amount;
    await user.save();
  }
  payout.status = status;
  payout.isUpdated = true;
  await payout.save();
  res.status(200).json({ msg: "successfully updated" });
};

export const createWithdrawalIntent = async (req, res) => {
  const user = await MiningUser.findById(req.user.userId);
  if (!user) throw new NotFoundError("No user found");
  const { amount, address } = req.body;
  const totalAmount = Number(amount) + 0.00033;
  if (amount < 0.005)
    throw new BadRequestError(
      "Minimum withdrawal amount is 0.005 BTC. Please enter an amount equal to or greater than this threshold"
    );
  const payouts = await MiningPayout.find({
    user: req.user.userId,
    status: { $nin: ["Complete", "Failed", "Cancelled", "Rejected"] },
  });
  if (payouts.length > 0)
    throw new BadRequestError(
      "Cannot Process Withdrawal because of Pending requests"
    );
  if (user.currentBalance < totalAmount)
    throw new BadRequestError("Insufficient Balance");
  if (user.walletBalance < 0)
    throw new BadRequestError(
      "Unable to withdraw due to negative wallet balance, Please top-up your wallet balance to withdraw"
    );

  const requestBody = {
    fiat_currency: "AED",
    crypto_amount_net: Number(amount),
    profile_id: process.env.DEUSX_PROFILE_UUID,
    address: address,
    currency: "BTC",
    network: "BTC",
    notes: "Withdrawal",
  };
  const response = await deusxPayRequest("withdrawals/", requestBody, "POST");
  const withdrawalData = response.data.result;
  console.log(withdrawalData);

  const withdrawal = new MiningPayout({
    deusxId: withdrawalData.id,
    user: req.user.userId,
    date: new Date(),
    amount: withdrawalData.amount,
    status: withdrawalData.status,
    walletAddress: withdrawalData.address,
    txid: withdrawalData.txid,
    remoteUID: withdrawalData.remote_uuid,
    referenceId: withdrawalData.reference,
    withdrawCurrency: withdrawalData.fiat_currency,
    recieverCurrency: withdrawalData.currency,
    network: withdrawalData.network,
    notes: withdrawalData.notes,
    transactionFee: withdrawalData.fee,
    rawResponse: JSON.stringify(withdrawalData),
  });
  await withdrawal.save();
  user.allPayouts.push(withdrawal._id);
  await user.save();
  res.status(200).json(withdrawalData);
};
