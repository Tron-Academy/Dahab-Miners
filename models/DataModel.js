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
      ref: "Issue",
      default: null,
    },
    issueHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue",
      },
    ],
    changeHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Issue" }],
    hashRate: {
      type: Number,
    },
    power: {
      type: Number,
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
  },
  { timestamps: true },
);

const Data = model("Data", DataSchema);

export default Data;
