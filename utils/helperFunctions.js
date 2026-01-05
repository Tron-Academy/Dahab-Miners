import mongoose from "mongoose";
import MiningUser from "../models/miningApp/MiningUser.js";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import MiningProduct from "../models/miningApp/MiningProduct.js";
import { v4 as uuid4 } from "uuid";
import WalletTransaction from "../models/miningApp/v2/WalletTransaction.js";
import OwnedMiner from "../models/miningApp/v2/OwnedMiners.js";

export const assignMinerToUser = async (userId, items) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const buyItems = JSON.parse(items);
  try {
    const user = await MiningUser.findById(userId).session(session);
    if (!user) throw new NotFoundError("No user found");
    const purchasedOn = new Date();
    const validity = new Date();
    validity.setFullYear(validity.getFullYear() + 3);
    const newOwnedMiners = [];
    const amount = buyItems.reduce(
      (sum, item) => {
        if (item.itemId.isBulkHosting) {
          return (
            sum +
            item.qty *
              item.itemId.power *
              24 *
              item.itemId.hostingFeePerKw *
              3.67 *
              365 *
              3
          );
        } else {
          return (
            sum +
            item.qty *
              item.itemId.power *
              24 *
              item.itemId.hostingFeePerKw *
              3.67 *
              30
          );
        }
      },

      0
    );
    user.walletBalance = (user.walletBalance || 0) + Number(amount);
    const newWalletTransaction = new WalletTransaction({
      user: user._id,
      date: new Date(),
      amount: Number(amount),
      type: "credited",
      currentWalletBalance: user.walletBalance,
      message: "Miner Purchase Hosting Fee Prepayment",
    });
    await newWalletTransaction.save({ session });
    for (const item of buyItems) {
      const product = await MiningProduct.findById(item.itemId).session(
        session
      );
      if (!product) throw new BadRequestError("No Product found");
      if (product.stock < item.qty)
        throw new BadRequestError("Product Qty Not in Stock");
      product.stock -= item.qty;
      product.sold = (product.sold || 0) + item.qty;
      await product.save({ session });
      const newOwned = new OwnedMiner({
        user: user._id,
        itemId: item.itemId,
        qty: item.qty,
        batchId: uuid4(),
        purchasedOn,
        validity,
        minedRevenue: 0,
        hostingFeePaid: 0,
        HostingFeeDue: 0,
      });
      await newOwned.save({ session });
      newOwnedMiners.push(newOwned._id);
    }

    user.ownedMiners.push(...newOwnedMiners);
    user.cartItems = [];
    await user.save({ session });
    await session.commitTransaction();
    session.endSession();
    return { ownedMiners: user.ownedMiners, user: user._id };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const updateUserWallet = async (userId, amount) => {
  try {
    const user = await MiningUser.findById(userId);
    if (!user) throw new NotFoundError("no user found");
    user.walletBalance = (user.walletBalance || 0) + Number(amount);
    const newWalletTransaction = new WalletTransaction({
      user: user._id,
      date: new Date(),
      amount: Number(amount),
      type: "credited",
      currentWalletBalance: user.walletBalance,
      message: "Wallet Recharge",
    });
    await newWalletTransaction.save();
    await user.save();
    return {
      amount: Number(amount),
      currentBalance: user.currentBalance,
    };
  } catch (error) {
    throw error;
  }
};
