import mongoose from "mongoose";
import MiningUser from "../models/miningApp/MiningUser.js";
import axios from "axios";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import BitCoinData from "../models/BitCoinData.js";

export const calculateAndDeductHostingFee = async () => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //get btc data

    const data = await BitCoinData.findOne();
    if (!data) throw new NotFoundError("No BTC Data found");
    const btcPriceUSD = data.price;
    const btcPriceAED = btcPriceUSD * 3.67;
    if (!btcPriceAED || btcPriceAED <= 0)
      throw new BadRequestError("Not able to get BTC price");

    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    // getting users owning a miner
    const users = await MiningUser.find({
      "ownedMiners.0": { $exists: true },
    })
      .populate("ownedMiners.itemId")
      .session(session);

    for (let user of users) {
      let totalHostingFee = 0;

      for (const owned of user.ownedMiners) {
        const product = owned.itemId;
        if (owned.validity && new Date(owned.validity) < endOfDay) continue;
        if (!product || !product.power || !product.hostingFeePerKw) continue;
        let fee = 0;

        if (product.category === "S19KPro") {
          fee = owned.qty * product.power * 24 * product.hostingFeePerKw * 3.67;
        }
        if (product.category === "A1246") {
          continue;
        }
        totalHostingFee += fee;
        owned.hostingFeePaid = (owned.hostingFeePaid || 0) + fee;
      }
      if (totalHostingFee > 0) {
        if (user.payoutMode === "hold") {
          user.walletBalance = (user.walletBalance || 0) - totalHostingFee;
          user.walletTransactions.push({
            date: now,
            amount: totalHostingFee,
            type: "debited",
            message:
              "Hosting For owned S19KPro, S21 (if any) based on 100% uptime",
            currentWalletBalance: user.walletBalance,
          });
        } else if (user.payoutMode === "profit") {
          const hostingFeeInBTC = totalHostingFee / btcPriceAED;
          const lastReward =
            user.allMinedRewards?.length > 0
              ? user.allMinedRewards[user.allMinedRewards.length - 1]
              : null;
          const lastRewardAmount = lastReward?.amount || 0;
          if (hostingFeeInBTC < lastRewardAmount) {
            user.currentBalance = (user.currentBalance || 0) - hostingFeeInBTC;
            user.ProfitModeDeductions.push({
              date: now,
              amountAED: totalHostingFee,
              amountBTC: hostingFeeInBTC,
              rateBTCNowAED: btcPriceAED,
              message:
                "Hosting for owned S19KPro, S21 (if any) based on 100% uptime",
            });
          } else {
            user.payoutMode = "hold";
            user.walletBalance = (user.walletBalance || 0) - totalHostingFee;
            user.walletTransactions.push({
              date: now,
              amount: totalHostingFee,
              type: "debited",
              message:
                "Hosting For owned S19KPro, S21 (if any) based on 100% uptime (Payout mode auto-switched to hold mode)",
              currentWalletBalance: user.walletBalance,
            });
          }
        }
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
