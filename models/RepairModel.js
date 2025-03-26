import { model, Schema } from "mongoose";

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
  },
  {
    timestamps: true,
  }
);

const Repair = model("Repair", RepairSchema);

export default Repair;
