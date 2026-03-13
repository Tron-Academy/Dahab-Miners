import mongoose, { model, Schema } from "mongoose";

const FarmAnnouncementSchema = new Schema(
  {
    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MiningFarm",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    startAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["scheduled", "active", "completed", "cancelled"],
      default: "scheduled",
    },
    activatedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const FarmAnnouncement = model("FarmAnnouncement", FarmAnnouncementSchema);
export default FarmAnnouncement;
