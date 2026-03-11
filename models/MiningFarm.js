import mongoose, { model, Schema } from "mongoose";

const MiningFarmSchema = new Schema(
  {
    farm: {
      type: String,
      unique: true,
    },
    capacity: {
      type: Number,
    },
    current: {
      type: Number,
      default: 0,
    },
    totalSlots: {
      type: Number,
    },
    occupiedSlots: {
      type: Number,
      default: 0,
    },
    miners: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Data",
    },
    farmStatus: {
      type: String,
      enum: ["Offline", "Active", "Planned", "In-Building"],
    },
    farmType: {
      type: String,
    },
    country: {
      type: String,
    },
    contractType: {
      type: String,
    },
    dayOfCommissioning: {
      type: Date,
    },
    contractDuration: {
      type: Date,
    },
    serviceProvider: {
      type: String,
    },
    farmInfo: {
      type: String,
    },
    downTimeHistory: [
      {
        announcement: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "FarmAnnouncement",
        },
        startAt: Date,
        endAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const MiningFarm = model("MiningFarm", MiningFarmSchema);
export default MiningFarm;
