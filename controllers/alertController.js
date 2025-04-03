import { NotFoundError } from "../errors/customErrors.js";
import Alert from "../models/AlertModel.js";
import Inventory from "../models/InventoryModel.js";

export const getAllAlerts = async (req, res) => {
  const alerts = await Alert.find();
  if (!alerts) throw new NotFoundError("No alerts found");
  res.status(200).json({ alerts });
};

export const totalAlerts = async (req, res) => {
  const total = await Alert.countDocuments();
  res.status(200).json({ total });
};

export const updateRestock = async (req, res) => {
  const alert = await Alert.findById(req.body.id);
  if (!alert) throw new NotFoundError("No alerts found");
  alert.status = req.body.status;
  const item = await Inventory.findOne({ itemName: alert.alertItem });
  if (!item) throw new NotFoundError("No item found");
  item.restockStatus = req.body.status;
  await alert.save();
  await item.save();
  res.status(200).json({ msg: "success" });
};

export const clearAlert = async (req, res) => {
  const alert = await Alert.findByIdAndDelete(req.params.id);
  if (!alert) throw new NotFoundError("No alert found");
  res.status(200).json({ msg: "success" });
};
