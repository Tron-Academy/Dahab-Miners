import { model, Schema } from "mongoose";

const MiningAccountClosureSchema = new Schema(
  {
    username: String,
    email: String,
    lastWalletBalance: Number,
    lastBTCBalance: Number,
    lastBTCinAED: Number,
    BTCPriceInAED: Number,
    totalBalance: Number,
    type: {
      type: String,
      enum: ["refund", "due", "neutral"],
    },
    rawData: String,
  },
  { timestamps: true }
);

const MiningAccountClosure = model(
  "MiningAccountClosure",
  MiningAccountClosureSchema
);

export default MiningAccountClosure;
