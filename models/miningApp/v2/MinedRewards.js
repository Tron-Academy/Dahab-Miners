import mongoose, { model, Schema } from "mongoose";

const MinedRewardsSchema = new Schema(
  {
    date: Date,
    amount: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "MiningUser" },
  },
  { timestamps: true }
);

const MinedReward = model("MinedReward", MinedRewardsSchema);
export default MinedReward;
