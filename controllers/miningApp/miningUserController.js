import { NotFoundError } from "../../errors/customErrors.js";
import MiningUser from "../../models/miningApp/MiningUser.js";

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
  user.walletTransactions.push({
    date: new Date(),
    amount: parseFloat(amount),
    type: "credited",
    currentWalletBalance: user.walletBalance,
  });
  await user.save();
  res.status(200).json({ msg: "updated successfully" });
};
