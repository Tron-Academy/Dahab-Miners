import { Parser } from "json2csv";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import Data from "../models/DataModel.js";
import mongoose from "mongoose";
import { isStrictValidObject } from "../middleware/bulkUploadValidation.js";
import Client from "../models/Clients.js";
import MinerModel from "../models/MinerModel.js";
import MiningFarm from "../models/MiningFarm.js";
import Warranty from "../models/Warranty.js";

export const addNewData = async (req, res) => {
  const {
    actualLocation,
    currentLocation,
    macAddress,
    modelName,
    serialNumber,
    clientName,
    temporary,
    workerId,
  } = req.body;
  const newData = new Data({
    currentLocation,
    actualLocation,
    modelName,
    serialNumber,
    macAddress,
    clientName,
    temporaryOwner: temporary,
    workerId,
  });
  await newData.save();
  res.status(201).json({ msg: "success" });
};

export const addNewDataV2 = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      client,
      workerId,
      serialNumber,
      model,
      status,
      location,
      warrantyStart,
      warrantyEnd,
      poolAddress,
      connectionDate,
      macAddress,
    } = req.body;
    const clientUser = await Client.findById(client).session(session);
    if (!clientUser) throw new NotFoundError("No client found");
    const minerModel = await MinerModel.findById(model).session(session);
    if (!minerModel) throw new NotFoundError("No miner model found");
    const existingMiner = await Data.findOne({
      $or: [
        { serialNumber: serialNumber },
        { workerId: workerId },
        { macAddress: macAddress },
      ],
    }).session(session);
    if (existingMiner)
      throw new BadRequestError("Miner with same SN/worker/mac found");
    let miningFarm = null;
    let newTotal;
    miningFarm = await MiningFarm.findById(location).session(session);
    if (!miningFarm) throw new NotFoundError("No miningfarm found");
    newTotal = miningFarm.current + Number(minerModel.power);
    if (miningFarm.capacity < newTotal) {
      throw new BadRequestError("Mining Farm maximum capacity reached");
    }
    if (miningFarm.occupiedSlots >= miningFarm.totalSlots) {
      throw new BadRequestError("No slots available at farm");
    }
    const newData = new Data({
      client: client,
      clientName: clientUser.clientName,
      workerId: workerId,
      serialNumber: serialNumber,
      model: minerModel.name,
      modelId: minerModel._id,
      status: status,
      actualLocation: miningFarm.farm,
      actualLocationId: miningFarm._id,
      currentLocation: miningFarm.farm,
      currentLocationId: miningFarm._id,
      pool: poolAddress,
      hashRate: minerModel.hashRate,
      power: minerModel.power,
      coins: minerModel.coins,
      algorithm: minerModel.algorithm,
      coolingType: minerModel.coolingType,
      manufacturer: minerModel.manufacturer,
      macAddress: macAddress,
      version: "2",
    });
    if (connectionDate) {
      newData.connectionDate = new Date(connectionDate);
    }
    let newWarranty;
    if (warrantyStart && warrantyEnd) {
      const start = new Date(warrantyStart);
      const end = new Date(warrantyEnd);
      newData.warrantyStartDate = start;
      newData.warrantyEndDate = end;
      newWarranty = new Warranty({
        warrantyType: "Manufacturer",
        startDate: start,
        endDate: end,
        user: client,
        miner: newData._id,
        status: "active",
      });
      newData.relatedWarranty = newWarranty._id;
      await newWarranty.save({ session });
    }
    if (miningFarm) {
      miningFarm.current = miningFarm.current + Number(newData.power);
      miningFarm.occupiedSlots += 1;
      miningFarm.miners.push(newData._id);
      await miningFarm.save({ session });
    }
    clientUser.owned.push(newData._id);
    await clientUser.save({ session });
    await newData.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: `New miner added` });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const getAllDatas = async (req, res) => {
  const { search, farm, currentPage, limit, sortby } = req.query;
  let queryObject = {};
  let conditions = [];
  if (search && search !== "") {
    conditions.push({
      $or: [
        { macAddress: { $regex: search, $options: "i" } },
        { serialNumber: { $regex: search, $options: "i" } },
        { clientName: { $regex: search, $options: "i" } },
        { temporaryOwner: { $regex: search, $options: "i" } },
        { workerId: { $regex: search, $options: "i" } },
        { modelName: { $regex: search, $options: "i" } },
      ],
    });
  }
  if (farm && farm !== "ALL") {
    conditions.push({
      $or: [
        { actualLocation: { $regex: farm.trim(), $options: "i" } }, //trimmed the space
        { currentLocation: { $regex: farm.trim(), $options: "i" } },
      ],
    });
  }

  if (conditions.length > 0) {
    queryObject = { $and: conditions };
  }
  const sortOptions = {
    new: "-createdAt",
    clientAZ: "clientName",
    clientZA: "-clientName",
    modelAZ: "modelName",
    modelZA: "-modelName",
    serialAZ: "serialNumber",
    serialZA: "-serialNumber",
    workerAZ: "workerId",
    workerZA: "-workerId",
    macAZ: "macAddress",
    macZA: "-macAddress",
    actLocAZ: "actualLocation",
    actLocZA: "-actualLocation",
    currLocAZ: "currentLocation",
    currLocZA: "-currentLocation",
    nowRunAZ: "temporaryOwner",
    nowRunZA: "-temporaryOwner",
  };
  const page = currentPage || 1;
  const totalLimit = limit || 20;
  const skip = (page - 1) * totalLimit;
  const sortKey = sortOptions[sortby] || sortOptions.new;
  let sortObj = {};

  if (sortKey.startsWith("-")) {
    sortObj[sortKey.slice(1)] = -1;
  } else {
    sortObj[sortKey] = 1;
  }
  sortObj["_id"] = 1; // tie-breaker to keep pagination stable
  const datas = await Data.find(queryObject)
    .sort(sortObj)
    .skip(skip)
    .limit(totalLimit);
  if (!datas) throw new NotFoundError("No datas found");
  const totalDatas = await Data.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalDatas / totalLimit);
  res.status(200).json({ msg: "success", datas, totalDatas, page, numOfPages });
};

export const getSingleData = async (req, res) => {
  const { id } = req.params;
  const data = await Data.findById(id);
  if (!data) throw new NotFoundError("No data found");
  res.status(200).json({ msg: "success", data });
};

export const updateSingleData = async (req, res) => {
  const { id } = req.params;
  const {
    actualLocation,
    currentLocation,
    macAddress,
    modelName,
    serialNumber,
    clientName,
    temporary,
    workerId,
  } = req.body;
  const data = await Data.findById(id);
  if (!data) throw new NotFoundError("No data found");
  data.actualLocation = actualLocation;
  data.currentLocation = currentLocation;
  data.macAddress = macAddress;
  data.modelName = modelName;
  data.serialNumber = serialNumber;
  data.clientName = clientName;
  data.temporaryOwner = temporary;
  data.workerId = workerId;

  await data.save();
  res.status(200).json({ msg: "success" });
};

export const restrictedUpdate = async (req, res) => {
  const { currentLocation, temporary } = req.body;
  const data = await Data.findById(req.params.id);
  if (!data) throw new NotFoundError("No data found");
  data.currentLocation = currentLocation;
  data.temporaryOwner = temporary;
  await data.save();
  res.status(200).json({ msg: "success" });
};

export const deleteData = async (req, res) => {
  const { id } = req.params;
  const data = await Data.findByIdAndDelete(id);
  if (!data) throw new NotFoundError("No data found");
  res.status(200).json({ msg: "success" });
};

export const DownloadCSV = async (req, res) => {
  const data = await Data.find().lean();

  if (!data.length) throw new NotFoundError("No data to export");
  const fields = Object.keys(data[0]);
  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(data);
  res.header("Content-Type", "text/csv");
  res.attachment("inventory.csv");
  res.send(csv);
};

export const bulkUpload = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const items = req.body;

    if (!Array.isArray(items)) {
      throw new Error("Payload must be an array of objects");
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!isStrictValidObject(item)) {
        throw new Error(
          `Invalid data at index ${
            i + 1
          }: All required fields must exist, match exactly ("actualLocation", "currentLocation", "macAddress", "modelName", "serialNumber", "clientName", "temporaryOwner", "workerId",), and contain non-empty strings.`,
        );
      }
    }

    await Data.insertMany(items, { session });
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ msg: "Bulk upload successful" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ msg: err.message });
  }
};

export const editV2Data = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      client,
      workerId,
      serialNumber,
      model,
      status,
      location,
      poolAddress,
      connectionDate,
      macAddress,
    } = req.body;
    const clientUser = await Client.findById(client).session(session);
    if (!clientUser) throw new NotFoundError("No user found");
    const minermodel = await MinerModel.findById(model).session(session);
    if (!minermodel) throw new NotFoundError("No miner model found");
    const miner = await Data.findById(req.params.id).session(session);
    if (!miner) throw new NotFoundError("NO miners found");

    const oldPower = Number(miner.power || 0);
    const newPower = Number(minermodel.power);

    const oldFarmName = miner.actualLocation || null;
    let oldFarm = null;
    let newFarm = null;

    newFarm = await MiningFarm.findById(location).session(session);
    if (!newFarm) throw new NotFoundError("NO Farm found");

    if (oldFarmName !== newFarm.farm) {
      oldFarm = await MiningFarm.findOne({ farm: oldFarmName }).session(
        session,
      );
      if (!oldFarm) throw new NotFoundError("old mining farm not found");
      const adjusted = newFarm.current + newPower;
      if (adjusted > newFarm.capacity) {
        throw new BadRequestError("Capacity exceeded at new farm");
      }
      if (newFarm.occupiedSlots >= newFarm.totalSlots) {
        throw new BadRequestError("No slots available in new farm");
      }
      oldFarm.current -= oldPower;
      oldFarm.miners = oldFarm.miners.filter(
        (item) => item.toString() !== miner._id.toString(),
      );
      oldFarm.occupiedSlots -= 1;
      newFarm.current += newPower;
      newFarm.miners.push(miner._id);
      newFarm.occupiedSlots += 1;

      await oldFarm.save({ session });
      await newFarm.save({ session });
    } else if (oldPower !== newPower) {
      const adjusted = newFarm.current - oldPower + newPower;
      if (adjusted > newFarm.capacity) {
        throw new BadRequestError("Capacity ecxceeded at current farm");
      }
      newFarm.current = adjusted;
      await newFarm.save({ session });
    }
    if (miner.client.toString() !== clientUser._id.toString()) {
      const oldClient = await Client.findById(miner.client).session(session);
      if (oldClient) {
        oldClient.owned = oldClient.owned.filter(
          (id) => id.toString() !== miner._id.toString(),
        );
        await oldClient.save({ session });
      }
      if (!clientUser.owned.includes(miner._id)) {
        clientUser.owned.push(miner._id);
      }
      miner.client = client;
      miner.clientName = clientUser.clientName;
    }
    miner.model = minermodel.name;
    miner.modelId = minermodel._id;
    miner.status = status;
    miner.hashRate = minermodel.hashRate;
    miner.power = minermodel.power;
    miner.manufacturer = minermodel.manufacturer;
    miner.coins = minermodel.coins;
    miner.algorithm = minermodel.algorithm;
    miner.coolingType = minermodel.coolingType;
    miner.workerId = workerId;
    miner.serialNumber = serialNumber;
    miner.pool = poolAddress;
    miner.macAddress = macAddress;
    if (connectionDate) miner.connectionDate = new Date(connectionDate);
    miner.actualLocation = newFarm.farm;
    miner.actualLocationId = newFarm._id;

    await miner.save({ session });
    await clientUser.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "success" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};
