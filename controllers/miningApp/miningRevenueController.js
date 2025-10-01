import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../../errors/customErrors.js";
import MiningRevenue from "../../models/miningApp/MiningRevenue.js";
import MiningUser from "../../models/miningApp/MiningUser.js";
import A1246Uptime from "../../models/miningApp/MiningA1246Uptime.js";
import axios from "axios";

export const getAllRevenuesByCategory = async (req, res) => {
  const { currentPage, category } = req.query;
  const page = currentPage || 1;
  const limit = 15;
  const skip = (page - 1) * limit;
  const revenues = await MiningRevenue.find({ category: category })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  if (!revenues) throw new NotFoundError("No revenue found");
  const totalRevenues = await MiningRevenue.countDocuments({
    category: category,
  });
  const totalPages = Math.ceil(totalRevenues / limit);
  res.status(200).json({ revenues, totalPages });
};

export const addRevenueByCategory = async (req, res) => {
  const { amount, hashRate, category, uptime } = req.body;

  const revenuePerTh = amount / hashRate;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //getting live btc price
    const { data } = await axios.get(
      "https://api.minerstat.com/v2/coins?list=BTC"
    );
    const btcPriceUSD = data[0]?.price;
    const btcPriceAED = btcPriceUSD * 3.67;
    if (!btcPriceAED || btcPriceAED <= 0)
      throw new BadRequestError("Not able to get BTC price");
    //finding all users who owns atleast 1 miner
    const users = await MiningUser.find({
      "ownedMiners.0": { $exists: true },
    })
      .populate("ownedMiners.itemId")
      .session(session);
    //adding the new uptime for the day.
    const uptimes = await A1246Uptime.find().session(session);
    if (uptimes.length < 1) {
      const newUptime = new A1246Uptime({
        A1246Uptime: uptime,
        uptimeHistory: [{ date: new Date(), uptime: uptime }],
      });
      await newUptime.save({ session });
    } else {
      uptimes[0].A1246Uptime = uptime;
      uptimes[0].uptimeHistory.push({ date: new Date(), uptime: uptime });
      await uptimes[0].save({ session });
    }
    //logic for revenue splitting for A1246
    const splitUp = [];
    const now = new Date();
    for (let user of users) {
      let userTotalRevenue = 0;
      let modified = false;

      let totalHostingFee = 0;

      for (let owned of user.ownedMiners) {
        const product = owned.itemId;
        if (!product || product.category !== category) continue;
        if (!product || !product.hashRate) continue;
        if (owned.validity && new Date(owned.validity) < now) continue;

        let fee = 0;
        //revenue part
        const totalHashRate = product.hashRate * owned.qty;
        const revenue = totalHashRate * revenuePerTh;
        owned.minedRevenue = (owned.minedRevenue || 0) + revenue;
        owned.revenueHistory.push({ date: now, amount: revenue });
        userTotalRevenue += revenue;
        modified = true;
        //hosting fee part
        if (product.category === "A1246") {
          if (uptime >= 0.95) {
            fee =
              owned.qty * product.power * 24 * product.hostingFeePerKw * 3.67;
          }
          if (uptime < 0.95) {
            fee =
              owned.qty *
              product.power *
              24 *
              product.hostingFeePerKw *
              3.67 *
              uptime;
          }
        }
        totalHostingFee += fee;
        owned.hostingFeePaid = (owned.hostingFeePaid || 0) + fee;
      }
      //revenue part
      if (userTotalRevenue > 0 && modified) {
        user.minedRevenue = (user.minedRevenue || 0) + userTotalRevenue;
        user.currentBalance = (user.currentBalance || 0) + userTotalRevenue;
        splitUp.push({ user: user._id, amount: userTotalRevenue });
        user.allMinedRewards.push({
          date: now,
          amount: userTotalRevenue,
        });
      }
      //hosting fee part
      if (totalHostingFee > 0) {
        if (user.payoutMode === "hold") {
          user.walletBalance = (user.walletBalance || 0) - totalHostingFee;
          user.walletTransactions.push({
            date: now,
            amount: totalHostingFee,
            type: "debited",
            currentWalletBalance: user.walletBalance,
            message: `Hosting for A1246 based on ${
              uptime >= 0.95 ? "100%" : uptime * 100 + "%"
            } uptime`,
          });
        } else if (user.payoutMode === "profit") {
          const hostingFeeInBTC = totalHostingFee / btcPriceAED;
          user.currentBalance = (user.currentBalance || 0) - hostingFeeInBTC;
          user.ProfitModeDeductions.push({
            date: now,
            amountAED: totalHostingFee,
            amountBTC: hostingFeeInBTC,
            rateBTCNowAED: btcPriceAED,
            message: `Hosting for A1246 based on ${
              uptime >= 0.95 ? "100%" : uptime * 100 + "%"
            } uptime`,
          });
        }
      }
      await user.save({ session });
    }
    const newRevenue = new MiningRevenue({
      date: now,
      amount: amount,
      hashRate: hashRate,
      split: splitUp,
      category: category,
    });
    await newRevenue.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ msg: "successfull" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ msg: "something went wrong", error: error.message });
  }
};
