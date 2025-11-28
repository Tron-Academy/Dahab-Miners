import { model, Schema } from "mongoose";

const MiningVoucherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    applicableFor: {
      type: String,
      enum: ["miner purchase", "wallet Topup", "Both"],
      required: true,
    },
    validity: {
      type: Date,
      required: true,
    },
    minimumSpent: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const MiningVoucher = model("MiningVoucher", MiningVoucherSchema);
export default MiningVoucher;
