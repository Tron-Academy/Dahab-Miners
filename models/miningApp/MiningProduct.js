import { model, Schema } from "mongoose";

const miningProductSchema = new Schema(
  {
    name: String,
    image: String,
    status: String,
    power: String,
    h24_hashRate: String,
    h1_hashRate: String,
    minedRewards: String,
    h1_staleShare: String,
    h24_efficiency: String,
    h24_minedRewards: String,
    h1_validShare: String,
    h1_rejectedShare: String,
    lastShare: String,
    stock: Number,
    price: String,
  },
  { timestamps: true }
);

const MiningProduct = model("MiningProduct", miningProductSchema);
export default MiningProduct;
