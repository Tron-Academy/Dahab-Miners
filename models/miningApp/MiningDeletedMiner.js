import mongoose, { model, Schema } from "mongoose";

const MiningDeletedMinerSchema = new Schema({
  minerDetails: {
    type: Object, // Full deleted miner details
    required: true,
  },
  removedOn: {
    type: Date,
    default: Date.now,
  },
  affectedUsers: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MiningUser",
      },
      username: String,
      email: String,
      ownedDetails: [
        {
          qty: Number,
          batchId: String,
          purchasedOn: Date,
          validity: Date,
          minedRevenue: Number,
        },
      ],
    },
  ],
});

const MiningDeletedMiner = model(
  "MiningDeletedMiner",
  MiningDeletedMinerSchema
);

export default MiningDeletedMiner;
