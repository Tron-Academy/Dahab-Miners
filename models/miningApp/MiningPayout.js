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
      default: "Pending",
      enum: ["Pending", "Completed", "Failed"],
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
  },
  { timestamps: true }
);

const MiningPayout = model("MiningPayout", MiningPayoutSchema);
export default MiningPayout;
