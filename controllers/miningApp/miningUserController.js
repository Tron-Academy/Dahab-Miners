import { NotFoundError } from "../../errors/customErrors.js";
import MiningUser from "../../models/miningApp/MiningUser.js";
import WalletTransaction from "../../models/miningApp/v2/WalletTransaction.js";

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
