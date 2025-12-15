import axios from "axios";
import BitCoinData from "../models/BitCoinData.js";
import { NotFoundError } from "../errors/customErrors.js";

export const getBitcoinData = async () => {
  try {
    const { data } = await axios.get(
      "https://api.minerstat.com/v2/coins?list=BTC",
      {
        headers: {
          "X-API-Key": process.env.MINERSTAT_API_KEY,
        },
      }
    );
    const btcData = data?.data[0];
    if (!btcData) throw new Error("Unable to get BTC DATA");
    const existing = await BitCoinData.findOne();
    if (!existing) {
      const newData = new BitCoinData({
        network_hashrate: btcData.network_hashrate,
        price: btcData.price,
        difficulty: btcData.difficulty,
        reward: btcData.reward,
        reward_block: btcData.reward_block,
        reward_unit: btcData.reward_unit,
      });
      await newData.save();
    } else {
      existing.network_hashrate = btcData.network_hashrate;
      existing.price = btcData.price;
      existing.difficulty = btcData.difficulty;
      existing.reward = btcData.reward;
      existing.reward_block = btcData.reward_block;
      existing.reward_unit = btcData.reward_unit;
      await existing.save();
    }
    console.log("Successfully Completed");
  } catch (error) {
    console.log("something went wrong", error.message);
  }
};
