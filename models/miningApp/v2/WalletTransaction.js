import mongoose, { model, Schema } from "mongoose";

const WalletTransactionSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MiningUser",
    },
    date: Date,
    amount: Number,
    message: String,
    type: {
      type: String,
      enum: ["debited", "credited"],
    },
    currentWalletBalance: Number,
  },
  { timestamps: true }
);

const WalletTransaction = model("WalletTransaction", WalletTransactionSchema);
export default WalletTransaction;
