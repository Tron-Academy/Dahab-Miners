import mongoose from "mongoose";
import MiningRevenue from "../models/miningApp/MiningRevenue.js";
import MiningSats from "../models/miningApp/MiningSats.js";
import MiningUser from "../models/miningApp/MiningUser.js";

export const addS19Revenue = async () => {
  //   const { amount, hashRate, category } = req.body;

  //   const revenuePerTh = amount / hashRate;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const sats = await MiningSats.find().session(session);
    if (!sats.length || !sats[0].satPerDay)
      throw new Error("Unable to Find Sats");
    const users = await MiningUser.find({
      "ownedMiners.0": { $exists: true },
    })
      .populate("ownedMiners.itemId")
      .session(session);
    const now = new Date();

    let sumHashRate = 0;
    for (let user of users) {
      for (let owned of user.ownedMiners) {
        const product = owned.itemId;
        if (!product || product.category !== "S19KPro") continue;
        if (!product.hashRate) continue;
        if (owned.validity && new Date(owned.validity) < now) continue;
        sumHashRate += product.hashRate * owned.qty;
      }
    }
    if (sumHashRate === 0) {
      throw new Error("No active S19KPro miners found");
    }

    const satsPerDay = sats[0].satPerDay;
    const revenuePerTh = (satsPerDay * sumHashRate * 0.9) / sumHashRate;

    const splitUp = [];

    for (let user of users) {
      let userTotalRevenue = 0;
      let modified = false;
      for (let owned of user.ownedMiners) {
        const product = owned.itemId;
        if (!product || product.category !== "S19KPro") continue;
        if (!product || !product.hashRate) continue;
        if (owned.validity && new Date(owned.validity) < now) continue;
        const totalHashRate = product.hashRate * owned.qty;
        const revenue = totalHashRate * revenuePerTh;
        owned.minedRevenue = (owned.minedRevenue || 0) + revenue;
        owned.revenueHistory.push({ date: now, amount: revenue });
        userTotalRevenue += revenue;
        modified = true;
      }
      if (userTotalRevenue > 0 && modified) {
        user.minedRevenue = (user.minedRevenue || 0) + userTotalRevenue;
        user.currentBalance = (user.currentBalance || 0) + userTotalRevenue;
        splitUp.push({ user: user._id, amount: userTotalRevenue });
        user.allMinedRewards.push({
          date: now,
          amount: userTotalRevenue,
        });
        await user.save({ session });
      }
    }
    const newRevenue = new MiningRevenue({
      date: now,
      amount: satsPerDay * sumHashRate * 0.9,
      hashRate: sumHashRate,
      split: splitUp,
      category: "S19KPro",
    });
    await newRevenue.save({ session });
    await session.commitTransaction();
    session.endSession();
    console.log("Successfull");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log("Something went wrong", error.message);
  }
};
