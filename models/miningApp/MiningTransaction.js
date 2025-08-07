import mongoose, { model, Schema } from "mongoose";

const MiningTransactionSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MiningUser",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["Purchase", "Wallet"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Successfull", "Failed"],
      required: true,
      default: "Pending",
    },
    stripePaymentIntentId: {
      type: String,
    },
    stripeCustomerId: {
      type: String,
    },
  },
  { timestamps: true }
);

const MiningTransaction = model("MiningTransaction", MiningTransactionSchema);
export default MiningTransaction;
