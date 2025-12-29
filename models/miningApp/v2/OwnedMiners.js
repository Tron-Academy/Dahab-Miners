import mongoose, { model, Schema } from "mongoose";

const minedRewardsSchema = new Schema({
  date: Date,
  amount: Number,
});

const OwnedMinersSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MiningUser",
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

const OwnedMiner = model("OwnedMiner", OwnedMinersSchema);
export default OwnedMiner;
