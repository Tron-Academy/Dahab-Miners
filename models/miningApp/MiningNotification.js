import { model, Schema } from "mongoose";

const MiningNotificationSchema = new Schema(
  {
    content: String,
  },
  { timestamps: true }
);

const MiningNotification = model(
  "MiningNotification",
  MiningNotificationSchema
);

export default MiningNotification;
