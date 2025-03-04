import { model, Schema } from "mongoose";

const DataSchema = new Schema(
  {
    actualLocation: {
      type: String,
      required: true,
    },
    currentLocation: {
      type: String,
      required: true,
    },
    macAddress: {
      type: String,
      required: true,
    },
    modelName: {
      type: String,
      required: true,
    },
    serialNumber: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    temporaryOwner: {
      type: String,
    },
    workerId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Data = model("Data", DataSchema);

export default Data;
