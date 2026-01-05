import {
  BadRequestError,
  NotFoundError,
} from "../../../errors/customErrors.js";
import { formatImage } from "../../../middleware/multerMiddleware.js";
import MiningUser from "../../../models/miningApp/MiningUser.js";
import ProfitModeTransaction from "../../../models/miningApp/v2/ProfitModeTransaction.js";
import WalletTransaction from "../../../models/miningApp/v2/WalletTransaction.js";
import { v2 as cloudinary } from "cloudinary";

export const getUserInfoV2 = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await MiningUser.findById(userId)
      .select(
        "email username cartItems minedRevenue currentBalance profilePic ownedMiners notifications amountWithdrawed isVerified isFirst walletBalance payoutMode lastPayoutSelected is2FAEnabled isTest latestTermVersion latestPrivacyVersion"
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

export const updateProfilePic = async (req, res) => {
  try {
    if (!req.file) throw new BadRequestError("No file found");
    const user = await MiningUser.findById(req.user.userId);
    if (!user) throw new NotFoundError("No user found");
    if (user.profilePicPublicId) {
      await cloudinary.uploader.destroy(user.profilePicPublicId);
    }
    const file = formatImage(req.file);
    const response = await cloudinary.uploader.upload(file);
    user.profilePic = response.secure_url;
    user.profilePicPublicId = response.public_id;
    await user.save();
    res.status(200).json({ msg: "success" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || error.msg });
  }
};
