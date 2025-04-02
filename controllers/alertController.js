import { NotFoundError } from "../errors/customErrors.js";
import Alert from "../models/AlertModel.js";

export const getAllAlerts = async (req, res) => {
  const alerts = await Alert.find();
  if (!alerts) throw new NotFoundError("No alerts found");
  res.status(200).json({ alerts });
};

export const totalAlerts = async (req, res) => {
  const total = await Alert.countDocuments();
  res.status(200).json({ total });
};
