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
      type: [],
    },
    cartItems: {
      type: [],
      default: [],
    },
  },
  { timestamps: true }
);

const MiningUser = model("MiningUser", miningUserSchema);
export default MiningUser;
