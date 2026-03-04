import { NotFoundError } from "../errors/customErrors.js";
import MinerModel from "../models/MinerModel.js";

export const addNewMinerModel = async (req, res) => {
  try {
    const {
      manufacturer,
      name,
      hashrate,
      power,
      coolingType,
      algorithm,
      coins,
    } = req.body;
    const newModel = await MinerModel.create({
      manufacturer,
      name,
      hashRate: hashrate,
      power: power,
      coolingType: coolingType,
      algorithm,
      coins,
    });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const getAllMinerModelsForDropdown = async (req, res) => {
  try {
    const models = await MinerModel.find().sort({ name: 1 }).lean();
    res.status(200).json(models);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const editMinerModel = async (req, res) => {
  try {
    const {
      manufacturer,
      name,
      hashrate,
      power,
      coolingType,
      algorithm,
      coins,
    } = req.body;
    const { id } = req.params;
    const miner = await MinerModel.findById(id);
    if (!miner) throw new NotFoundError("No miner found");
    miner.manufacturer = manufacturer;
    miner.name = name;
    miner.hashRate = hashrate;
    miner.power = power;
    miner.coolingType = coolingType;
    miner.algorithm = algorithm;
    miner.coins = coins;
    await miner.save();
    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const deleteMinerModel = async (req, res) => {
  try {
    const { id } = req.params;
    const miner = await MinerModel.findByIdAndDelete(id);
    if (!miner) throw new NotFoundError("No miner found");
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const getSingleMinerModel = async (req, res) => {
  try {
    const { id } = req.params;
    const miner = await MinerModel.findById(id);
    if (!miner) throw new NotFoundError("No miner found");
    res.status(200).json(miner);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const getAllMinerModels = async (req, res) => {
  try {
    const { search, currentPage } = req.query;
    const queryObject = {};
    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search, "i");
      queryObject.$or = [{ manufacturer: searchRegex }, { name: searchRegex }];
    }
    const page = Number(currentPage) || 1;
    const limit = 15;
    const skip = (page - 1) * limit;
    const miners = await MinerModel.find(queryObject)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const totalMiners = await MinerModel.countDocuments(queryObject);
    const totalPages = Math.ceil(totalMiners / limit);
    res.status(200).json({ miners, totalMiners, totalPages });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};
