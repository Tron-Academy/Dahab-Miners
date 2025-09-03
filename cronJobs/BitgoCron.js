// import axios from "axios";
// import MiningPayout from "../models/miningApp/MiningPayout.js";
// import MiningUser from "../models/miningApp/MiningUser.js";
// import { BitGo } from "bitgo";

// export const processBitGoPayouts = async () => {
//   const pendingPayouts = await MiningPayout.find({
//     isUpdated: false,
//     status: "Pending",
//   });
//   console.log("Payouts", pendingPayouts);

//   const bitgo = new BitGo({
//     env: "test",
//     accessToken: process.env.BITGO_ACCESS_TOKEN,
//   });

//   try {
//     const wallet = await bitgo
//       .coin("tbtc")
//       .wallets()
//       .get({ id: process.env.BITGO_WALLET_ID });
//     for (let payout of pendingPayouts) {
//       try {
//         const response = await wallet.send({
//           address: payout.walletAddress,
//           amount: Math.round(payout.amount * 1e8),
//           walletPassphrase: process.env.BITGO_WALLET_PASSPHRASE,
//         });
//         const txid = response?.transfer?.txid || null;
//         console.log("res: ", response);

//         payout.status = "Completed";
//         payout.txid = txid;
//         payout.isUpdated = true;
//         await payout.save();
//         console.log(
//           `✅ Sent ${payout.amount} BTC to ${payout.walletAddress} (txid: ${txid})`
//         );
//       } catch (err) {
//         console.error(
//           `❌ Withdrawal failed for ${payout._id}:`,
//           err.response?.data || err.message || err.toString()
//         );
//         const user = await MiningUser.findById(payout.user);
//         if (user) {
//           user.currentBalance += payout.amount;
//           user.amountWithdrawed -= payout.amount;
//           await user.save();
//         }
//         payout.status = "Failed";
//         payout.isUpdated = true;
//         await payout.save();
//       }
//     }
//   } catch (err) {
//     console.error(
//       "⚠️ Error initializing BitGo or fetching wallet:",
//       err.message
//     );
//   }
// };
