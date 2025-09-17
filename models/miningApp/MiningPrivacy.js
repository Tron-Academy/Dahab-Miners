import { model, Schema } from "mongoose";

const MiningPrivacySchema = new Schema(
  {
    version: {
      type: Number,
    },
    date: {
      type: Date,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const MiningPrivacy = model("MiningPrivacy", MiningPrivacySchema);
export default MiningPrivacy;
