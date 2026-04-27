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
    issueName: {
      type: String,
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
    minerModel: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    username: {
      type: String,
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
    intermineId: { type: String },
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
