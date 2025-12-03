import mongoose, { model, Schema } from "mongoose";

const NotificationSchema = new Schema(
  {
    notification: String,
    isRead: Boolean,
    issueId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const Notification = model("Notification", NotificationSchema);
export default Notification;
