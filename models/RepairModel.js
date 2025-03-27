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
    report: {
      type: String,
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
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Repair = model("Repair", RepairSchema);

export default Repair;
