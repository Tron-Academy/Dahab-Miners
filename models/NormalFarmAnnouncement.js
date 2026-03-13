import mongoose, { model, Schema } from "mongoose";

const NormalFarmAnnouncementSchema = new Schema(
  {
    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MiningFarm",
    },
    message: {
      type: String,
    },
  },
  { timestamps: true },
);

const NormalFarmAnnouncement = model(
  "NormalFarmAnnouncement",
  NormalFarmAnnouncementSchema,
);

export default NormalFarmAnnouncement;
