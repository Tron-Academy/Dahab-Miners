import { model, Schema } from "mongoose";

const AlertSchema = new Schema(
  {
    alertItem: {
      type: String,
    },
    currentStock: {
      type: String,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Alert = model("Alert", AlertSchema);

export default Alert;
