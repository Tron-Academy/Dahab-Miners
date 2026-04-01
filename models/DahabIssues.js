import mongoose, { model, Schema } from "mongoose";

const statusHistorySchema = new Schema(
  {
    status: String,
    changedBy: String,
    changedOn: Date,
  },
  { _id: false },
);

const IssueSchema = new Schema(
  {
    issue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IssueType",
    },
    workerAddress: {
      type: String,
    },
    changeRequest: {
      pool: String,
      worker: String,
    },
    miner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Data",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },

    description: {
      type: String,
    },
    status: {
      type: String,
    },
    response: {
      type: String,
    },
    type: {
      type: String,
      enum: ["repair", "change"],
    },
    messages: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Message",
    },

    owner: {
      type: String,
    },
    resolvedOn: {
      type: Date,
    },
    statusHistory: {
      type: [statusHistorySchema],
    },
  },
  { timestamps: true },
);

const DahabIssue = model("DahabIssue", IssueSchema);
export default DahabIssue;
