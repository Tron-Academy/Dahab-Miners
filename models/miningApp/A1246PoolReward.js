import { model, Schema } from "mongoose";

const A1246PoolRewardSchema = new Schema(
  {
    totalPaid: {
      type: Number,
    },
  },
  { timestamps: true }
);

const A1246PoolReward = model("A1246PoolReward", A1246PoolRewardSchema);
export default A1246PoolReward;
