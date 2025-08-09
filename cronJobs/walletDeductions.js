import mongoose from "mongoose";
import MiningUser from "../models/miningApp/MiningUser.js";

export const calculateAndDeductHostingFee = async () => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const users = await MiningUser.find({
      "ownedMiners.0": { $exists: true },
    })
      .populate("ownedMiners.itemId")
      .session(session);
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    for (let user of users) {
      let totalHostingFee = 0;
      if (user.payoutMode === "profit") continue;
      for (const owned of user.ownedMiners) {
        const product = owned.itemId;
        if (owned.validity && new Date(owned.validity) < endOfDay) continue;
        if (!product || !product.power || !product.hostingFeePerKw) continue;
        const fee =
          owned.qty * product.power * 24 * product.hostingFeePerKw * 3.67 * 0.9;
        totalHostingFee += fee;
        owned.hostingFeePaid = (owned.hostingFeePaid || 0) + fee;
      }
      if (totalHostingFee > 0) {
        user.walletBalance = (user.walletBalance || 0) - totalHostingFee;
        user.walletTransactions.push({
          date: now,
          amount: totalHostingFee,
          type: "debited",
          currentWalletBalance: user.walletBalance,
        });
        await user.save({ session });
      }
    }
    await session.commitTransaction();
    session.endSession();
    console.log("Hosting Fees deducted successfully");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log("something went wrong", error.message);
  }
};
