import { model, Schema } from "mongoose";

const InventorySchema = new Schema(
  {
    itemName: {
      type: String,
    },
    category: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    threshold: {
      type: Number,
    },
    location: {
      type: String,
    },
    status: {
      type: String,
    },
    notes: {
      type: String,
    },
    restockStatus: {
      type: String,
    },
  },
  { timestamps: true }
);

const Inventory = model("Inventory", InventorySchema);
export default Inventory;
