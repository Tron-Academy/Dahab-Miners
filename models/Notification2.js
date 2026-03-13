import mongoose, { model, Schema } from "mongoose";

const Notification2Schema = new Schema(
  {
    problem: {
      type: String,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    isIssue: {
      type: Boolean,
    },
    issue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue",
    },
    status: {
      type: String,
      enum: ["read", "unread"],
    },
    miner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Data",
    },
    isForAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Notification2 = model("Notification2", Notification2Schema);
export default Notification2;
