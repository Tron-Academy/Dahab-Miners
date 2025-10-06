import mongoose, { model, Schema } from "mongoose";

const MiningPayoutSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MiningUser",
      required: true,
    },
    date: {
      type: Date,
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
      default: "pending",
    },
    walletAddress: {
      type: String,
      required: true,
    },
    isUpdated: {
      type: Boolean,
      default: false,
    },
    txid: {
      type: String,
    },
    deusxId: {
      type: String,
    },
    remoteUID: {
      type: String,
    },
    transactionFee: {
      type: Number,
    },
    referenceId: {
      type: String,
    },
    withdrawCurrency: {
      type: String,
    },
    recieverCurrency: {
      type: String,
    },
    network: {
      type: String,
    },
    notes: {
      type: String,
    },
    rawResponse: {
      type: String,
    },
  },
  { timestamps: true }
);

const MiningPayout = model("MiningPayout", MiningPayoutSchema);
export default MiningPayout;
