import { model, Schema } from "mongoose";

const DataSchema = new Schema(
  {
    location: {
      type: String,
      required: true,
    },
    macAddress: {
      type: String,
      unique: true,
      required: true,
    },
    modelNumber: {
      type: String,
      unique: true,
      required: true,
    },
    serialNumber: {
      type: String,
      unique: true,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    temporaryOwner: {
      type: String,
    },
  },
  { timestamps: true }
);

const Data = model("Data", DataSchema);

export default Data;
