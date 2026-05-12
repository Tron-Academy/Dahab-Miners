import mongoose, { model, Schema } from "mongoose";

const offlineHistorySchema = new Schema({
  issue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Issue",
  },
  date: {
    type: Date,
  },
  isOpen: {
    type: Boolean,
  },
  reason: {
    type: String,
    enum: ["issue", "farm_maintenance"],
  },
});

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
      unique: true,
      sparse: true,
    },
    modelName: {
      type: String,
    },
    serialNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    clientName: {
      type: String,
    },
    temporaryOwner: {
      type: String,
    },
    workerId: {
      type: String,
      unique: true,
      sparse: true,
    },
    serviceProviderChanged: {
      type: Boolean,
    },
    serviceProviderChangedTo: {
      type: String,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    clientName: {
      type: String,
    },
    manufacturer: {
      type: String,
    },
    coolingType: {
      type: String,
    },
    algorithm: {
      type: String,
    },
    model: {
      type: String,
    },
    modelId: { type: mongoose.Schema.Types.ObjectId, ref: "MinerModel" },
    status: {
      type: String,
      enum: ["online", "offline", "In Transit"],
    },
    actualLocationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MiningFarm",
    },
    currentLocationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MiningFarm",
    },
    warranty: {
      type: Number,
    },
    warrantyStartDate: {
      type: Date,
    },
    warrantyEndDate: {
      type: Date,
    },
    relatedWarranty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warranty",
    },
    offlineReason: {
      type: String,
      enum: ["issue", "farm maintenance", ""],
      default: "",
    },
    connectionDate: {
      type: Date,
    },
    currentIssue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DahabIssue",
      default: null,
    },
    issueHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DahabIssue",
      },
    ],
    changeHistory: [
      { type: mongoose.Schema.Types.ObjectId, ref: "DahabIssue" },
    ],
    hashRate: {
      type: Number,
    },
    hashUnit: {
      type: String,
      default: "TH",
    },
    power: {
      type: Number,
    },
    pool: {
      type: String,
    },
    internalNote: {
      type: [String],
      default: [],
    },
    coins: {
      type: String,
    },
    offlineHistory: {
      type: [offlineHistorySchema],
    },
    version: {
      type: String,
    },
  },
  { timestamps: true },
);

const Data = model("Data", DataSchema);

export default Data;
