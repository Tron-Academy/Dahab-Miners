import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../../errors/customErrors.js";
import MiningProduct from "../../models/miningApp/MiningProduct.js";
import MiningUser from "../../models/miningApp/MiningUser.js";
import OwnedMiner from "../../models/miningApp/v2/OwnedMiners.js";
import WalletTransaction from "../../models/miningApp/v2/WalletTransaction.js";
import { v4 as uuid4 } from "uuid";
import BitCoinData from "../../models/BitCoinData.js";
import ProfitModeTransaction from "../../models/miningApp/v2/ProfitModeTransaction.js";
import axios from "axios";

export const getAllMiningUsers = async (req, res) => {
  const { currentPage, keyWord } = req.query;
  const queryObject = {};
  if (keyWord && keyWord !== "") {
    queryObject.username = { $regex: keyWord, $options: "i" };
  }
  const page = parseInt(currentPage) || 1;
  const limit = 15;
  const skip = (page - 1) * limit;
  const users = await MiningUser.find(queryObject)
    .select("-password")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  if (!users.length) throw new NotFoundError("No users found");
  const totalUsers = await MiningUser.countDocuments(queryObject);
  const totalPages = Math.ceil(totalUsers / limit);
  res.status(200).json({ users: users, totalPages });
};

export const updateWalletBalance = async (req, res) => {
  const { amount, id } = req.body;
  const user = await MiningUser.findById(id);
  if (!user) throw new NotFoundError("no user found");
  user.walletBalance = user.walletBalance + parseFloat(amount);
  const newWalletTransaction = new WalletTransaction({
    user: user._id,
    date: new Date(),
    amount: Number(amount),
    type: "credited",
    currentWalletBalance: user.walletBalance,
  });
  await newWalletTransaction.save();
  await user.save();
  res.status(200).json({ msg: "updated successfully" });
};

//get All users who owns a miner
export const getUsersMiners = async (req, res) => {
  try {
    const { currentPage, query } = req.query;
    const page = Number(currentPage) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;
    const queryObject = {
      "ownedMiners.0": { $exists: true },
    };
    if (query && query !== "") {
      queryObject.$or = [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ];
    }
    const users = await MiningUser.find(queryObject)
      .select("-password")
      .populate({
        path: "ownedMiners",
        populate: {
          path: "itemId",
          model: "MiningProduct",
        },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalUsers = await MiningUser.countDocuments(queryObject);
    const totalPages = Math.ceil(totalUsers / limit);
    res.status(200).json({ users, totalPages, totalUsers });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ msg: error.msg || error.message });
  }
};

export const getAllMinersForDropdown = async (req, res) => {
  try {
    const miners = await MiningProduct.find()
      .select("name hashRate power stock hostingFeePerKw")
      .lean();
    res.status(200).json(miners);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ msg: error.msg || error.message });
  }
};

export const settleNegativeWallet = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { userId } = req.body;
    const user = await MiningUser.findById(userId).session(session);
    if (!user) throw new NotFoundError("No user found");
    if (user.walletBalance >= 0)
      throw new BadRequestError(
        "Wallet balance is not negative. No deduction needed.",
      );
    const { data } = await axios.get(
      "https://api.minerstat.com/v2/coins?list=BTC",
      {
        headers: {
          "X-API-Key": process.env.MINERSTAT_API_KEY,
        },
      },
    );
    const btcData = data?.[0];
    if (!btcData || !btcData.price) throw new Error("Unable to get BTC DATA");
    const existing = await BitCoinData.findOne();
    if (!existing) {
      const newData = new BitCoinData({
        network_hashrate: btcData.network_hashrate,
        price: btcData.price,
        difficulty: btcData.difficulty,
        reward: btcData.reward,
        reward_block: btcData.reward_block,
        reward_unit: btcData.reward_unit,
      });
      await newData.save();
    } else {
      existing.network_hashrate = btcData.network_hashrate;
      existing.price = btcData.price;
      existing.difficulty = btcData.difficulty;
      existing.reward = btcData.reward;
      existing.reward_block = btcData.reward_block;
      existing.reward_unit = btcData.reward_unit;
      await existing.save();
    }
    const btcPriceAED = btcData.price * 3.67;
    const requiredAED = Math.abs(user.walletBalance);
    const requiredBTC = requiredAED / btcPriceAED;
    let btcToDeduct = 0;
    let walletRecoveredAED = 0;

    if (user.currentBalance >= requiredBTC) {
      btcToDeduct = requiredBTC;
      walletRecoveredAED = requiredAED;
      user.currentBalance -= btcToDeduct;
      user.walletBalance = 0;
    } else {
      btcToDeduct = user.currentBalance;
      walletRecoveredAED = btcToDeduct * btcPriceAED;

      user.currentBalance = 0;
      user.walletBalance += walletRecoveredAED;
    }
    const newWalletTransaction = new WalletTransaction({
      user: user._id,
      date: new Date(),
      amount: walletRecoveredAED,
      message: "Wallet deficit settled using BTC balance",
      type: "credited",
      currentWalletBalance: user.walletBalance,
    });
    const newProfitModeTransaction = new ProfitModeTransaction({
      user: user._id,
      date: new Date(),
      amountAED: walletRecoveredAED,
      amountBTC: btcToDeduct,
      message: "BTC converted to settle negative wallet balance",
      rateBTCNowAED: btcPriceAED,
    });
    await user.save({ session });
    await newWalletTransaction.save({ session });
    await newProfitModeTransaction.save({ session });
    await session.commitTransaction();
    res.status(200).json({ message: "successfully debited" });
  } catch (error) {
    await session.abortTransaction();
    res
      .status(error.statusCode || 500)
      .json({ msg: error.msg || error.message });
  } finally {
    session.endSession();
  }
};
