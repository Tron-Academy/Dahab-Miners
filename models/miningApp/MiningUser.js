import mongoose, { model, Schema } from "mongoose";

const cartSchema = new Schema({
  itemId: {
    type: mongoose.Types.ObjectId,
    ref: "MiningProduct",
  },
  qty: Number,
});

const ownedSchema = new Schema({
  itemId: {
    type: mongoose.Types.ObjectId,
    ref: "MiningProduct",
  },
  qty: Number,
  batchId: String,
  purchasedOn: Date,
  validity: Date,
  minedRevenue: Number,
  hostingFeePaid: Number,
  HostingFeeDue: Number,
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
    ownedMiners: [ownedSchema],
    cartItems: [cartSchema],
    minedRevenue: {
      type: Number,
      default: 0,
    },
    currentBalance: {
      type: Number,
      default: 0,
    },
    amountWithdrawed: {
      type: Number,
      default: 0,
    },
    verificationCode: String,
  },
  { timestamps: true }
);

const MiningUser = model("MiningUser", miningUserSchema);
export default MiningUser;
