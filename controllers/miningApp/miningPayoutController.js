import { BadRequestError, NotFoundError } from "../../errors/customErrors.js";
import MiningPayout from "../../models/miningApp/MiningPayout.js";
import MiningUser from "../../models/miningApp/MiningUser.js";

export const getAllPayouts = async (req, res) => {
  const payouts = await MiningPayout.find().populate(
    "user",
    "username email currentBalance"
  );
  if (!payouts) throw new NotFoundError("No user found");
  res.status(200).json(payouts);
};

export const makeWithdrawal = async (req, res) => {
  const user = await MiningUser.findById(req.user.userId);
  if (!user) throw new NotFoundError("No user found");
  const { amount, address } = req.body;
  if (user.currentBalance < amount)
    throw new BadRequestError("Insufficient Balance");
  const newPayout = new MiningPayout({
    user: user._id,
    date: new Date(),
    walletAddress: address,
    amount: amount,
    status: "Pending",
  });
  await newPayout.save();
  user.currentBalance = user.currentBalance - amount;
  user.amountWithdrawed = user.amountWithdrawed + amount;
  user.allPayouts.push(newPayout._id);
  await user.save();
  res.status(200).json({ msg: "Withdrawal processed successfully", user });
};

export const getUserPayouts = async (req, res) => {
  const payouts = await MiningPayout.find({ user: req.user.userId });
  if (!payouts) throw new NotFoundError("No payouts found");
  res.status(200).json(payouts);
};

export const updatePayoutStatus = async (req, res) => {
  const { status, id, userId, amount } = req.body;
  console.log(req.body);

  const payout = await MiningPayout.findById(id);
  if (!payout) throw new NotFoundError("No Payout Found");
  if (payout.isUpdated)
    throw new BadRequestError("Payout status already updated");
  if (status === "Failed") {
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
