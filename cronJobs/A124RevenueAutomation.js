import axios from "axios";
import A1246PoolReward from "../models/miningApp/A1246PoolReward.js";
import A1246Uptime from "../models/miningApp/MiningA1246Uptime.js";
import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import MiningUser from "../models/miningApp/MiningUser.js";
import MiningRevenue from "../models/miningApp/MiningRevenue.js";
import BitCoinData from "../models/BitCoinData.js";

export const calculateTotalA124Revenue = async () => {
  try {
    const response = await axios.get(
      `https://ourpool.io/api/v1/anonymous/${process.env.OUR_POOL_WALLET}/transactions`
    );
    const response2 = await axios.get(
      `https://ourpool.io/api/v1/anonymous/${process.env.OUR_POOL_WALLET}/btc/rewards-stats`
    );
    const totalPaidInPool = response2.data;
    const totalTransactions = response.data.transactions || [];
    const now = new Date();
    const today = new Date(now);
    today.setUTCHours(3, 30, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const filteredTransactions = totalTransactions.filter((item) => {
      const created = new Date(item.createdAt);
      return (
        item.type === "TX_TYPE_SCHEDULED_USER_MINING_REWARDS_WITHDRAWAL" &&
        created >= yesterday &&
        created < today
      );
    });
    const totalRevenue = filteredTransactions.reduce(
      (sum, item) => sum + Number(item.value),
      0
    );
    const todayReward = new A1246PoolReward({
      totalPaid: totalPaidInPool?.totalPaid,
    });
    await todayReward.save();
    if (totalRevenue > 0) {
      return { date: yesterday.toISOString(), BTC: totalRevenue };
    } else {
      const rewards = await A1246PoolReward.find()
        .sort({ createdAt: -1 })
        .limit(2);
      if (rewards.length < 2) {
        return { error: "No mining Rewards found" };
      }
      const fallBackTotalRevenue = rewards[0].totalPaid - rewards[1].totalPaid;
      return { date: yesterday.toISOString(), BTC: fallBackTotalRevenue };
    }
  } catch (error) {
    console.log(
      "Something went wrong",
      error.response?.data?.error || error.message
    );
  }
};

export const getAutomatedUptime = async () => {
  try {
    const response = await axios.get(
      `https://ourpool.io/api/v1/anonymous/${process.env.OUR_POOL_WALLET}/btc/miner/workers`
    );
    const totalWorkers = response.data;
    const deliveredHashrate = Object.values(totalWorkers.workers).reduce(
      (sum, item) => sum + Number(item.hashrate24h || 0),
      0
    );
    const deliveredHashRateinTH = deliveredHashrate / 1e12;
    const uptime = deliveredHashRateinTH / 90000;
    const now = new Date();
    const today = new Date(now);
    today.setUTCHours(3, 30, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    let lastUptime = await A1246Uptime.findOne();
    if (!lastUptime) {
      lastUptime = new A1246Uptime({
        A1246Uptime: uptime,
        uptimeHistory: [{ date: yesterday, uptime }],
      });
    } else {
      lastUptime.A1246Uptime = uptime;
      lastUptime.uptimeHistory.push({ date: yesterday, uptime });
    }
    lastUptime.uptimeHistory = lastUptime.uptimeHistory.slice(-30);
    await lastUptime.save();
    return { date: yesterday.toISOString(), uptime: uptime };
  } catch (error) {
    console.log(
      "Something went wrong",
      error.response?.data?.error || error.message
    );
  }
};

export const addA1246AutomatedRevenue = async () => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const amountObj = await calculateTotalA124Revenue();
    const amount = amountObj?.BTC;
    if (!amount) {
      throw new Error("Unable to get the reward");
    }
    const uptimeObj = await getAutomatedUptime();
    const uptime = uptimeObj?.uptime;
    if (uptime == null || isNaN(uptime)) {
      throw new Error("Uptime not available or invalid");
    }
    const category = "A1246";
    const hashRate = 90000;
    const revenuePerTh = amount / hashRate;
    //getting live btc price

    const data = await BitCoinData.findOne();
    if (!data) throw new NotFoundError("No BTC Data found");
    const btcPriceUSD = data.price;
    if (!btcPriceUSD || btcPriceUSD <= 0)
      throw new Error("Unable to fetch BTC price");
    const btcPriceAED = btcPriceUSD * 3.67;
    if (!btcPriceAED || btcPriceAED <= 0)
      throw new BadRequestError("Not able to get BTC price");

    //finding all users who owns atleast 1 miner
    const users = await MiningUser.find({
      "ownedMiners.0": { $exists: true },
    })
      .populate("ownedMiners.itemId")
      .session(session);
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
              uptime >= 0.95 ? "100%" : (uptime * 100).toFixed(3) + "%"
            } uptime`,
          });
        } else if (user.payoutMode === "profit") {
          const hostingFeeInBTC = totalHostingFee / btcPriceAED;
          if (hostingFeeInBTC < userTotalRevenue) {
            user.currentBalance = (user.currentBalance || 0) - hostingFeeInBTC;
            user.ProfitModeDeductions.push({
              date: now,
              amountAED: totalHostingFee,
              amountBTC: hostingFeeInBTC,
              rateBTCNowAED: btcPriceAED,
              message: `Hosting for A1246 based on ${
                uptime >= 0.95 ? "100%" : (uptime * 100).toFixed(3) + "%"
              } uptime`,
            });
          } else {
            user.payoutMode = "hold";
            user.walletBalance = (user.walletBalance || 0) - totalHostingFee;
            user.walletTransactions.push({
              date: now,
              amount: totalHostingFee,
              type: "debited",
              currentWalletBalance: user.walletBalance,
              message: `Hosting for A1246 based on ${
                uptime >= 0.95 ? "100%" : (uptime * 100).toFixed(3) + "%"
              } uptime (Payout mode auto-switched to hold mode)`,
            });
          }
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
    console.log("Successfull");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log("something went wrong", error.message);
  }
};
