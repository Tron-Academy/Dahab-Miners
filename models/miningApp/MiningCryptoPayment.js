import mongoose, { model, Schema } from "mongoose";

const MiningCryptoPaymentSchema = new Schema(
  {
    deusxId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MiningUser",
    },
    requestedCurrency: {
      type: String,
      default: "AED",
    },
    requestedAmount: {
      type: Number,
      required: true,
    },
    actualAmount: {
      type: Number,
      required: true,
    },
    paymentAmount: {
      type: Number,
      required: true,
    },
    paymentCurrency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "new",
    },
    addresses: {
      type: Object,
    },
    notes: {
      type: String,
    },
    passthrough: {
      type: String,
    },
    rawResponse: {
      type: Object,
    },
    processed: {
      type: Boolean,
      default: false,
    },
    items: {
      type: String,
    },
    voucherCode: String,
    discountApplied: Number,
    discountAmount: Number,
  },
  { timestamps: true }
);

const MiningCryptoPayment = model(
  "MiningCryptoPayment",
  MiningCryptoPaymentSchema
);

export default MiningCryptoPayment;
