import mongoose, { model, Schema } from "mongoose";

const cartSchema = new Schema({
  itemId: {
    type: mongoose.Types.ObjectId,
    ref: "MiningProduct",
  },
  qty: Number,
});

const minedRewardsSchema = new Schema({
  date: Date,
  amount: Number,
});

const walletTransactionSchema = new Schema({
  date: Date,
  amount: Number,
  type: {
    type: String,
    enum: ["debited", "credited"],
  },
  currentWalletBalance: Number,
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
  revenueHistory: [minedRewardsSchema],
});

const miningUserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
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
    isVerified: {
      type: Boolean,
      default: false,
    },
    isFirst: {
      type: Boolean,
      default: true,
    },
    walletBalance: {
      type: Number,
      default: 0,
    },
    payoutMode: {
      type: String,
      default: "hold",
      enum: ["hold", "profit"],
    },
    twoFactorSecret: String,
    is2FAEnabled: {
      type: Boolean,
      default: false,
    },
    allMinedRewards: [minedRewardsSchema],
    allPayouts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "MiningPayout",
    },
    isTest: Boolean,
    walletTransactions: [walletTransactionSchema],
  },
  { timestamps: true }
);

const MiningUser = model("MiningUser", miningUserSchema);
export default MiningUser;
