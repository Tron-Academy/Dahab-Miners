import { model, Schema } from "mongoose";

const ProblemsSchema = new Schema(
  {
    problem: {
      type: String,
    },
    component: {
      type: String,
    },
    issueStatus: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const RepairSchema = new Schema(
  {
    serialNumber: {
      type: String,
    },
    macAddress: {
      type: String,
    },
    workerId: {
      type: String,
    },
    owner: {
      type: String,
    },
    nowRunning: {
      type: String,
    },
    timeInRepair: {
      type: String,
    },
    status: {
      type: String,
    },
    problems: {
      type: [ProblemsSchema],
    },
    testStatus: {
      type: String,
      default: "To Be Tested",
    },
    successImgUrl: {
      type: String,
    },
    successImgPublicId: {
      type: String,
    },
    failImgUrl: {
      type: String,
    },
    failImgPublicId: {
      type: String,
    },
    remarks: {
      type: [String],
    },
    report: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Repair = model("Repair", RepairSchema);

export default Repair;
