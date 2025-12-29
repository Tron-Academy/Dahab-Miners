import mongoose, { model, Schema } from "mongoose";

const ProfitModeTransactionSchema = new Schema(
  {
    date: Date,
    amountAED: Number,
    amountBTC: Number,
    message: String,
    rateBTCNowAED: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MiningUser",
    },
  },
  { timestamps: true }
);

const ProfitModeTransaction = model(
  "ProfitModeTransaction",
  ProfitModeTransactionSchema
);
export default ProfitModeTransaction;
