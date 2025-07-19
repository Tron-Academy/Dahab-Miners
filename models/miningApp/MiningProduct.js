import { model, Schema } from "mongoose";

const miningProductSchema = new Schema(
  {
    name: String,
    image: String,
    power: Number,
    hashRate: Number,
    stock: Number,
    price: Number,
    description: String,
    coin: String,
    investmentFactor: Number,
    revenueFactor: Number,
    efficiencyFactor: Number,
    riskFactor: Number,
    hostingFactor: Number,
    algorithm: String,
    hostingFeePerKw: Number,
    subtitle: String,
  },
  { timestamps: true }
);

const MiningProduct = model("MiningProduct", miningProductSchema);
export default MiningProduct;
