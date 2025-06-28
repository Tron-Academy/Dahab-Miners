import { model, Schema } from "mongoose";

const miningUserSchema = new Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    username: {
      type: String,
    },
    ownedMiners: {
      type: [Number],
    },
  },
  { timestamps: true }
);

const MiningUser = model("MiningUser", miningUserSchema);
export default MiningUser;
