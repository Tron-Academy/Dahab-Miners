import { model, Schema } from "mongoose";

const DataSchema = new Schema(
  {
    actualLocation: {
      type: String,
    },
    currentLocation: {
      type: String,
    },
    macAddress: {
      type: String,
    },
    modelName: {
      type: String,
    },
    serialNumber: {
      type: String,
    },
    clientName: {
      type: String,
    },
    temporaryOwner: {
      type: String,
    },
    workerId: {
      type: String,
    },
    serviceProviderChanged: {
      type: Boolean,
    },
    serviceProviderChangedTo: {
      type: String,
    },
  },
  { timestamps: true }
);

const Data = model("Data", DataSchema);

export default Data;
