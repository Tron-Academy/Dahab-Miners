import { model, Schema } from "mongoose";

const MiningTermsSchema = new Schema(
  {
    version: {
      type: String,
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

const MiningTerms = model("MiningTerms", MiningTermsSchema);
export default MiningTerms;
