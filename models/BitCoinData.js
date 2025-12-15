import { model, Schema } from "mongoose";

const BitCoinDataSchema = new Schema(
  {
    network_hashrate: Number,
    difficulty: Number,
    reward: Number,
    reward_unit: String,
    reward_block: Number,
    price: Number,
    volume: Number,
  },
  { timestamps: true }
);

const BitCoinData = model("BitCoinData", BitCoinDataSchema);
export default BitCoinData;
