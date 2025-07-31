import mongoose, { model, Schema } from "mongoose";

const SplitSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MiningUser",
  },
  amount: {
    type: Number,
  },
});

const MiningRevenueSchema = new Schema(
  {
    amount: {
      type: Number,
    },
    date: {
      type: Date,
    },
    hashRate: {
      type: Number,
    },
    split: [SplitSchema],
  },
  { timestamps: true }
);

const MiningRevenue = model("MiningRevenue", MiningRevenueSchema);
export default MiningRevenue;
