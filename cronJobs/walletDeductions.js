import mongoose from "mongoose";
import MiningUser from "../models/miningApp/MiningUser.js";
import axios from "axios";
import { BadRequestError } from "../errors/customErrors.js";
import A1246Uptime from "../models/miningApp/MiningA1246Uptime.js";

export const calculateAndDeductHostingFee = async () => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //get btc data
    const { data } = await axios.get(
      "https://api.minerstat.com/v2/coins?list=BTC"
    );
    const btcPriceUSD = data[0]?.price;
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
    const uptimes = await A1246Uptime.find();
    const uptime = uptimes[0]?.A1246Uptime || 1;
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
      if (totalHostingFee > 0) {
        if (user.payoutMode === "hold") {
          user.walletBalance = (user.walletBalance || 0) - totalHostingFee;
          user.walletTransactions.push({
            date: now,
            amount: totalHostingFee,
            type: "debited",
            currentWalletBalance: user.walletBalance,
          });
        } else if (user.payoutMode === "profit") {
          const hostingFeeInBTC = totalHostingFee / btcPriceAED;
          user.currentBalance = (user.currentBalance || 0) - hostingFeeInBTC;
          user.ProfitModeDeductions.push({
            date: now,
            amountAED: totalHostingFee,
            amountBTC: hostingFeeInBTC,
            rateBTCNowAED: btcPriceAED,
          });
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

// export const calculateAndDeductHostingFee = async () => {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     const users = await MiningUser.find({
//       "ownedMiners.0": { $exists: true },
//     })
//       .populate("ownedMiners.itemId")
//       .session(session);
//     const now = new Date();
//     const endOfDay = new Date(now);
//     endOfDay.setHours(23, 59, 59, 999);
//     for (let user of users) {
//       let totalHostingFee = 0;
//       if (user.payoutMode === "profit") continue;
//       for (const owned of user.ownedMiners) {
//         const product = owned.itemId;
//         if (owned.validity && new Date(owned.validity) < endOfDay) continue;
//         if (!product || !product.power || !product.hostingFeePerKw) continue;
//         const fee =
//           owned.qty * product.power * 24 * product.hostingFeePerKw * 3.67 * 0.9;
//         totalHostingFee += fee;
//         owned.hostingFeePaid = (owned.hostingFeePaid || 0) + fee;
//       }
//       if (totalHostingFee > 0) {
//         user.walletBalance = (user.walletBalance || 0) - totalHostingFee;
//         user.walletTransactions.push({
//           date: now,
//           amount: totalHostingFee,
//           type: "debited",
//           currentWalletBalance: user.walletBalance,
//         });
//         await user.save({ session });
//       }
//     }
//     await session.commitTransaction();
//     session.endSession();
//     console.log("Hosting Fees deducted successfully");
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     console.log("something went wrong", error.message);
//   }
// };
