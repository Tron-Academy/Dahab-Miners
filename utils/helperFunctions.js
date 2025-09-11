import mongoose from "mongoose";
import MiningUser from "../models/miningApp/MiningUser.js";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import MiningProduct from "../models/miningApp/MiningProduct.js";
import { v4 as uuid4 } from "uuid";

export const assignMinerToUser = async (userId) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await MiningUser.findById(userId).session(session);
    if (!user) throw new NotFoundError("No user found");
    const purchasedOn = new Date();
    const validity = new Date();
    validity.setFullYear(validity.getFullYear() + 3);
    const newOwnedMiners = [];
    for (const item of user.cartItems) {
      const product = await MiningProduct.findById(item.itemId).session(
        session
      );
      if (!product) throw new BadRequestError("No Product found");
      if (product.stock < item.qty)
        throw new BadRequestError("Product Qty Not in Stock");
      product.stock -= item.qty;
      await product.save({ session });
      newOwnedMiners.push({
        itemId: item.itemId,
        qty: item.qty,
        batchId: uuid4(),
        purchasedOn,
        validity,
        minedRevenue: 0,
        hostingFeePaid: 0,
        HostingFeeDue: 0,
      });
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
    user.walletBalance = user.walletBalance + Number(amount / 100);
    user.walletTransactions.push({
      date: new Date(),
      amount: Number(amount / 100),
      type: "credited",
      currentWalletBalance: user.walletBalance,
    });
    await user.save();
    return {
      amount: Number(amount / 100),
      currentBalance: user.currentBalance,
    };
  } catch (error) {
    throw error;
  }
};
