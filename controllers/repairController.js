import { NotFoundError } from "../errors/customErrors.js";
import Data from "../models/DataModel.js";
import Repair from "../models/RepairModel.js";

export const addNewRepairMiner = async (req, res) => {
  const { serialNumber, macAddress, workerId, owner, nowRunning } = req.body;
  const newMiner = new Repair({
    serialNumber,
    macAddress,
    workerId,
    owner,
    nowRunning,
    status: "Need to Identify Issue",
  });
  await newMiner.save();
  res.status(201).json({ msg: "success" });
};

export const getAllRepairMiner = async (req, res) => {
  const miners = await Repair.find();
  if (!miners) throw new NotFoundError("No miners has been found");
  res.status(200).json(miners);
};

export const getRelatedMiner = async (req, res) => {
  const { serialNumber } = req.query;
  const relatedMiner = await Data.findOne({ serialNumber: serialNumber });
  if (!relatedMiner) throw new NotFoundError("No related miner found");
  res.status(200).json(relatedMiner);
};
