import { NotFoundError } from "../../../errors/customErrors.js";
import MiningUser from "../../../models/miningApp/MiningUser.js";
import ProfitModeTransaction from "../../../models/miningApp/v2/ProfitModeTransaction.js";
import WalletTransaction from "../../../models/miningApp/v2/WalletTransaction.js";

export const getUserInfoV2 = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await MiningUser.findById(userId)
      .select(
        "email username cartItems minedRevenue currentBalance ownedMiners notifications amountWithdrawed isVerified isFirst walletBalance payoutMode lastPayoutSelected is2FAEnabled isTest latestTermVersion latestPrivacyVersion"
      )
      .populate({
        path: "ownedMiners",
        populate: {
          path: "itemId",
          model: "MiningProduct",
        },
      })
      .lean();
    if (!user) throw new NotFoundError("No user found");
    res.status(200).json(user);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || error.msg });
  }
};

export const getProfitModeTransactions = async (req, res) => {
  try {
    const { currentPage } = req.query;
    const page = Number(currentPage) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;
    const transactions = await ProfitModeTransaction.find({
      user: req.user.userId,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalTransactions = await ProfitModeTransaction.countDocuments({
      user: req.user.userId,
    });
    const totalPages = Math.ceil(totalTransactions / limit);
    res.status(200).json({ transactions, totalPages, totalTransactions });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || error.msg });
  }
};

export const walletTransactions = async (req, res) => {
  try {
    const { currentPage } = req.query;
    const page = Number(currentPage) || 1;
    const limit = 15;
    const skip = (page - 1) * limit;
    const transactions = await WalletTransaction.find({
      user: req.user.userId,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalTransactions = await WalletTransaction.countDocuments({
      user: req.user.userId,
    });
    const totalPages = Math.ceil(totalTransactions / limit);
    res.status(200).json({ transactions, totalPages, totalTransactions });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || error.msg });
  }
};
