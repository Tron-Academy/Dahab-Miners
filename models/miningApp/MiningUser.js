import mongoose, { model, Schema } from "mongoose";
import { type } from "os";

const cartSchema = new Schema({
  itemId: {
    type: mongoose.Types.ObjectId,
    ref: "MiningProduct",
  },
  qty: Number,
});

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
    ownedMiners: [cartSchema],
    cartItems: [cartSchema],
  },
  { timestamps: true }
);

const MiningUser = model("MiningUser", miningUserSchema);
export default MiningUser;
