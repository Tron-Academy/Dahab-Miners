import { model, Schema } from "mongoose";

const MinerModelSchema = new Schema(
  {
    manufacturer: {
      type: String,
    },
    name: {
      type: String,
    },
    power: {
      type: Number,
    },
    hashRate: {
      type: Number,
    },
    hashUnit: {
      type: String,
      default: "TH",
    },
    coolingType: {
      type: String,
    },
    algorithm: {
      type: String,
    },
    coins: {
      type: String,
    },
  },
  { timestamps: true },
);

const MinerModel = model("MinerModel", MinerModelSchema);
export default MinerModel;
