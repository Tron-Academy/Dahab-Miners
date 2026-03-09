import mongoose, { model, Schema } from "mongoose";

const WarrantySchema = new Schema(
  {
    warrantyType: {
      type: String,
      required: true,
      enum: ["Manufacturer", "Dahab"],
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    miner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Data",
      required: true,
    },
    status: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Warranty = model("Warranty", WarrantySchema);
export default Warranty;
