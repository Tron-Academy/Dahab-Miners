import mongoose, { model, Schema } from "mongoose";

const MiningPaymentSchema = new Schema(
  {
    ziinaId: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MiningUser",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currencyCode: {
      type: String,
      default: "AED",
    },
    status: {
      type: String,
      default: "requires_payment_instrument",
    },
    redirectURL: {
      type: String,
    },
    successURL: {
      type: String,
    },
    cancelURL: {
      type: String,
    },
    message: {
      type: String,
    },
    allowTips: {
      type: Boolean,
      default: false,
    },
    isTest: {
      type: Boolean,
      default: false,
    },
    lastPayload: {
      type: Object,
    },
    processed: {
      type: Boolean,
      default: false,
    },
    items: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const MiningPayment = model("MiningPayment", MiningPaymentSchema);

export default MiningPayment;
