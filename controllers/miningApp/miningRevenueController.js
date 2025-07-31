import mongoose from "mongoose";
import { NotFoundError } from "../../errors/customErrors.js";
import MiningRevenue from "../../models/miningApp/MiningRevenue.js";
import MiningUser from "../../models/miningApp/MiningUser.js";

export const getAllRevenues = async (req, res) => {
  const revenues = await MiningRevenue.find();
  if (!revenues) throw new NotFoundError("No revenue found");
  res.status(200).json(revenues);
};

export const addRevenue = async (req, res) => {
  const { amount, hashRate } = req.body;
  const revenuePerTh = amount / hashRate;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const users = await MiningUser.find({
      "ownedMiners.0": { $exists: true },
    })
      .populate("ownedMiners.itemId")
      .session(session);
    const splitUp = [];
    const now = new Date();
    for (let user of users) {
      let userTotalRevenue = 0;
      for (let owned of user.ownedMiners) {
        if (owned.validity && new Date(owned.validity) < now) continue;
        const product = owned.itemId;
        if (!product || !product.hashRate) continue;
        const totalHashRate = product.hashRate * owned.qty;
        const revenue = totalHashRate * revenuePerTh;
        owned.minedRevenue = (owned.minedRevenue || 0) + revenue;
        owned.revenueHistory.push({ date: now, amount: revenue });
        userTotalRevenue += revenue;
      }
      user.minedRevenue = (user.minedRevenue || 0) + userTotalRevenue;
      user.currentBalance = (user.currentBalance || 0) + userTotalRevenue;
      splitUp.push({ user: user._id, amount: userTotalRevenue });
      user.allMinedRewards.push({
        date: now,
        amount: userTotalRevenue,
      });
      await user.save({ session });
    }
    const newRevenue = new MiningRevenue({
      date: now,
      amount: amount,
      hashRate: hashRate,
      split: splitUp,
    });
    await newRevenue.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ msg: "successfull" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ msg: "something went wrong" });
  }
};
