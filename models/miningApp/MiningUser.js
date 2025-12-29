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

const referralVoucherSchema = new Schema({
  name: String,
  code: String,
  discount: Number,
  description: String,
  minimumSpent: Number,
  isApplied: Boolean,
  applicableFor: String,
  validity: Date,
});

const walletTransactionSchema = new Schema({
  date: Date,
  amount: Number,
  message: String,
  type: {
    type: String,
    enum: ["debited", "credited"],
  },
  currentWalletBalance: Number,
});

const termsAgrementSchema = new Schema({
  date: Date,
  version: Number,
});

const privacyAgrementSchema = new Schema({
  date: Date,
  version: Number,
});

const profitModeHostingTransactionSchema = new Schema({
  date: Date,
  amountAED: Number,
  amountBTC: Number,
  message: String,
  rateBTCNowAED: Number,
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
    ownedMiners: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "OwnedMiner",
    },
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
    lastPayoutSelected: {
      type: Date,
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
    referredBy: {
      type: String,
    },
    referralVouchers: { type: [referralVoucherSchema], default: [] },
    walletTransactions: [walletTransactionSchema],
    ProfitModeDeductions: [profitModeHostingTransactionSchema],
    latestTermVersion: String,
    termsAgreementHistory: [termsAgrementSchema],
    latestPrivacyVersion: String,
    privacyAgreementHistory: [privacyAgrementSchema],
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MiningNotification",
      },
    ],
  },
  { timestamps: true }
);

const MiningUser = model("MiningUser", miningUserSchema);
export default MiningUser;
