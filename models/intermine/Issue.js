import mongoose, { model, Schema } from "mongoose";

const IssueSchema = new Schema(
  {
    issueId: {
      type: String,
      required: true,
      unique: true,
    },
    clientName: {
      type: String,
    },
    issue: {
      type: String,
    },
    description: {
      type: String,
    },
    miner: {
      type: String,
    },
    serialNumber: {
      type: String,
    },
    messages: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Message",
    },
  },
  { timestamps: true }
);

const Issue = model("Issue", IssueSchema);
export default Issue;
