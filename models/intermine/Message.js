import mongoose, { model, Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    message: {
      type: String,
    },
    issue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue",
    },
    sendBy: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Released",
        "Cancelled",
        "Modified",
        "Modified & Released",
      ],
    },
  },
  { timestamps: true }
);

const Message = model("Message", MessageSchema);
export default Message;
