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
    features: [String],
    idealFor: [String],
    category: {
      type: String,
      enum: ["A1246", "S19KPro"],
    },
  },
  { timestamps: true }
);

const MiningProduct = model("MiningProduct", miningProductSchema);
export default MiningProduct;
