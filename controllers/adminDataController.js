import { Parser } from "json2csv";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import Data from "../models/DataModel.js";
import mongoose from "mongoose";
import { isStrictValidObject } from "../middleware/bulkUploadValidation.js";
import Client from "../models/Clients.js";
import MinerModel from "../models/MinerModel.js";
import MiningFarm from "../models/MiningFarm.js";
import Warranty from "../models/Warranty.js";
import DahabIssue from "../models/DahabIssues.js";
import DahabMessage from "../models/DahabMessage.js";
import { parseCSVBuffer } from "../utils/parseCSV.js";
import fs from "fs";
import axios from "axios";
import { intermineURL } from "../utils/dropdowns.js";

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
      nowRunning,
      temporaryLocation,
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
    if (minerModel && !minerModel.modelCode)
      throw new BadRequestError(
        `Please add a model code for the miner ${minerModel.name}`,
      );
    const existingMiner = await Data.findOne({
      $or: [
        { serialNumber: serialNumber },
        { workerId: workerId },
        { macAddress: macAddress },
      ],
    }).session(session);
    if (existingMiner && existingMiner.version === "2")
      throw new BadRequestError("Miner with same SN/worker/mac found");
    let miningFarm = null;
    let temporaryFarm = null;
    let newTotal;
    miningFarm = await MiningFarm.findById(location).session(session);
    if (!miningFarm) throw new NotFoundError("No miningfarm found");
    if (miningFarm && !miningFarm.facilityCode)
      throw new NotFoundError(
        `Please add facility code to the farm ${miningFarm.farm}`,
      );
    if (temporaryLocation) {
      temporaryFarm =
        await MiningFarm.findById(temporaryLocation).session(session);
      if (!temporaryFarm) throw new NotFoundError("No mining farm found");
    }
    if (temporaryFarm) {
      newTotal = temporaryFarm.current + Number(minerModel.power);
      // if (temporaryFarm.capacity < newTotal) {
      //   throw new BadRequestError(
      //     "Mining Farm maximum capacity reached at temporary farm",
      //   );
      // }
      if (temporaryFarm.occupiedSlots >= temporaryFarm.totalSlots) {
        throw new BadRequestError("No slots available at temporary farm");
      }
    } else if (miningFarm) {
      newTotal = miningFarm.current + Number(minerModel.power);
      // if (miningFarm.capacity < newTotal) {
      //   throw new BadRequestError("Mining Farm maximum capacity reached");
      // }
      if (miningFarm.occupiedSlots >= miningFarm.totalSlots) {
        throw new BadRequestError("No slots available at farm");
      }
    }

    const newData = new Data({
      client: client,
      clientName: clientUser.clientName,
      workerId: workerId,
      serialNumber: serialNumber,
      model: minerModel.name,
      modelId: minerModel._id,
      status: status,
      hashUnit: minerModel.hashUnit || "TH",
      actualLocation: miningFarm.farm,
      actualLocationId: miningFarm._id,
      currentLocation: temporaryFarm?.farm || undefined,
      currentLocationId: temporaryFarm?._id || undefined,
      pool: poolAddress,
      hashRate: minerModel.hashRate,
      power: minerModel.power,
      coins: minerModel.coins,
      algorithm: minerModel.algorithm,
      coolingType: minerModel.coolingType,
      manufacturer: minerModel.manufacturer,
      macAddress: macAddress,
      temporaryOwner: nowRunning ? nowRunning : undefined,
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

    if (temporaryFarm) {
      temporaryFarm.current = temporaryFarm.current + Number(newData.power);
      temporaryFarm.occupiedSlots += 1;
      temporaryFarm.temporaryMiners.push({
        miner: newData._id,
        serialNumber: newData.serialNumber,
      });
      miningFarm.movedMiners.push({
        miner: newData._id,
        serialNumber: newData.serialNumber,
      });
      await temporaryFarm.save({ session });
      await miningFarm.save({ session });
    } else if (miningFarm) {
      miningFarm.current = miningFarm.current + Number(newData.power);
      miningFarm.occupiedSlots += 1;
      miningFarm.miners.push(newData._id);
      await miningFarm.save({ session });
    }
    clientUser.owned.push(newData._id);
    await clientUser.save({ session });
    await newData.save({ session });
    if (clientUser.clientName?.toLowerCase() === "intermine" && serialNumber) {
      try {
        const response = await axios.post(
          `${intermineURL}/create-miner`,
          {
            location: miningFarm?.facilityCode,
            model: minerModel?.modelCode,
            serialNumber: serialNumber || undefined,
            mac: macAddress || undefined,
            worker: workerId || undefined,
            status,
            poolAddress: poolAddress || "",
            warrantyStart: warrantyStart || undefined,
            warrantyEnd: warrantyEnd || undefined,
          },
          {
            headers: {
              "x-api-key": process.env.INTERMINE_API_KEY,
            },
          },
        );
      } catch (err) {
        await session.abortTransaction();
        session.endSession();

        return res.status(err.response?.status || 500).json({
          error:
            err.response?.data?.msg ||
            err.response?.data?.message ||
            err.response?.data?.error ||
            err.message,
        });
      }
    }
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

export const bulkUploadDataV2 = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (!req.file) throw new BadRequestError("No CSV file found");
    const rows = await parseCSVBuffer(req.file.buffer);
    if (!rows.length) throw new BadRequestError("CSV is Empty");

    //collecting unique values
    const clientNames = [...new Set(rows.map((r) => r.clientName))];
    const modelNames = [...new Set(rows.map((r) => r.modelName))];
    const locationNames = [...new Set(rows.map((r) => r.actualLocation))];
    const tempLocationNames = [
      ...new Set(rows.map((r) => r.currentLocation).filter(Boolean)),
    ];

    //Fetching all Data
    const [clients, models, farms, tempFarms] = await Promise.all([
      Client.find({ clientName: { $in: clientNames } }).session(session),
      MinerModel.find({ name: { $in: modelNames } }).session(session),
      MiningFarm.find({ farm: { $in: locationNames } }).session(session),
      MiningFarm.find({ farm: { $in: tempLocationNames } }).session(session),
    ]);

    //Mapping Data for easy retrieval
    const clientMap = new Map(clients.map((c) => [c.clientName, c]));
    const modelMap = new Map(models.map((m) => [m.name, m]));
    const farmMap = new Map(farms.map((f) => [f.farm, f]));
    const tempFarmMap = new Map(tempFarms.map((f) => [f.farm, f]));

    //Duplicate Check
    const serials = rows.map((r) => r.serialNumber);
    const workers = rows.map((r) => r.workerId);
    const macs = rows.map((r) => r.macAddress);

    const existing = await Data.find({
      $or: [
        { serialNumber: { $in: serials } },
        { macAddress: { $in: macs } },
        { workerId: { $in: workers } },
      ],
      version: "2",
    }).session(session);
    const existingSet = new Set(
      existing.map((e) => `${e.serialNumber}_${e.workerId}_${e.macAddress}`),
    );

    //Prepare bulk data
    const dataToInsert = [];
    const warrantiesToInsert = [];
    const cleanedRows = rows.filter((row) =>
      Object.values(row).some((val) => val && val.toString().trim() !== ""),
    );

    for (const row of cleanedRows) {
      const client = clientMap.get(row.clientName);
      const model = modelMap.get(row.modelName);
      const farm = farmMap.get(row.actualLocation);
      const tempFarm = row.currentLocation
        ? tempFarmMap.get(row.currentLocation)
        : null;

      if (!client)
        throw new NotFoundError(
          `Client Not Found under name ${row.clientName}`,
        );
      if (!model)
        throw new NotFoundError(
          `Model not found under the name ${row.modelName}`,
        );
      if (!farm)
        throw new NotFoundError(
          `Farm for actual location Not found under the name ${row.actualLocation}`,
        );

      if (row.currentLocation && !tempFarm)
        throw new NotFoundError(
          `Farm for current location not found under the name ${row.currentLocation}`,
        );
      if (tempFarm && tempFarm._id.toString() === farm._id.toString()) {
        throw new BadRequestError(
          "Temporary and actual location cannot be same for " +
            row.serialNumber,
        );
      }
      const key = `${row.serialNumber}_${row.workerId}_${row.macAddress}`;
      if (existingSet.has(key))
        throw new BadRequestError(`Dulicate miner ${row.serialNumber}`);
      const selectedFarm = tempFarm || farm;
      const newTotal = selectedFarm.current + Number(model.power);
      // if (selectedFarm.capacity < newTotal)
      //   throw new BadRequestError(`Capacity exceeded in ${selectedFarm.farm}`);
      if (selectedFarm.occupiedSlots >= selectedFarm.totalSlots)
        throw new BadRequestError(`No slots available at ${selectedFarm.farm}`);
      const minerId = new mongoose.Types.ObjectId();
      const newMiner = {
        _id: minerId,
        client: client._id,
        clientName: client.clientName,
        workerId: row.workerId?.trim() || undefined,
        serialNumber: row.serialNumber,
        model: model.name,
        modelId: model._id,
        status: row.status,
        actualLocation: farm.farm,
        actualLocationId: farm._id,
        currentLocation: tempFarm?.farm,
        currentLocationId: tempFarm?._id,
        hashRate: model.hashRate,
        hashUnit: model.hashUnit || "TH",
        power: model.power,
        coins: model.coins,
        algorithm: model.algorithm,
        coolingType: model.coolingType,
        manufacturer: model.manufacturer,
        macAddress: row.macAddress?.trim() || undefined,
        temporaryOwner: row.nowRunning ? row.nowRunning : undefined,
        version: "2",
      };
      if (row.connectionDate) {
        newMiner.connectionDate = new Date(row.connectionDate);
      }
      if (row.warrantyStart && row.warrantyEnd) {
        const warrantyId = new mongoose.Types.ObjectId();
        warrantiesToInsert.push({
          _id: warrantyId,
          warrantyType: "Manufacturer",
          startDate: new Date(row.warrantyStart),
          endDate: new Date(row.warrantyEnd),
          user: client._id,
          miner: minerId,
          status: "active",
        });
        newMiner.relatedWarranty = warrantyId;
      }
      dataToInsert.push(newMiner);

      //Farm updates
      selectedFarm.current += Number(model.power);
      selectedFarm.occupiedSlots += 1;
      if (tempFarm) {
        tempFarm.temporaryMiners.push({
          miner: minerId,
          serialNumber: row.serialNumber,
        });
        farm.movedMiners.push({
          miner: minerId,
          serialNumber: row.serialNumber,
        });
      } else {
        farm.miners.push(minerId);
      }
      client.owned.push(minerId);
    }
    await Data.insertMany(dataToInsert, { session });
    if (warrantiesToInsert.length) {
      await Warranty.insertMany(warrantiesToInsert, { session });
    }
    for (const c of clients) {
      await c.save({ session });
    }

    for (const f of farms) {
      await f.save({ session });
    }

    for (const f of tempFarms) {
      await f.save({ session });
    }
    await session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .json({ message: "successfully uploaded", count: dataToInsert.length });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res
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
  const data = await Data.findById(id)
    .populate({
      path: "issueHistory",
      select:
        "status type description createdAt updatedAt owner resolvedOn issueName", // only needed fields
    })
    .populate({
      path: "changeHistory",
      select:
        "status type createdAt updatedAt changeRequest owner resolvedOn issueName",
    });
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
      temporaryLocation,
      nowRunning,
      poolAddress,
      connectionDate,
      macAddress,
      warrantyStart,
      warrantyEnd,
    } = req.body;
    const clientUser = await Client.findById(client).session(session);
    if (!clientUser) throw new NotFoundError("No user found");
    const minermodel = await MinerModel.findById(model).session(session);
    if (!minermodel) throw new NotFoundError("No miner model found");
    const miner = await Data.findById(req.params.id).session(session);
    if (!miner) throw new NotFoundError("NO miners found");

    const oldPower = Number(miner.power || 0);
    const newPower = Number(minermodel.power);

    const oldFarmId = miner.actualLocationId || null;
    let oldFarm = null;
    let newFarm = null;

    const temporaryOldFarmId = miner.currentLocationId || null;
    let tempOldFarm = null;
    let tempNewFarm = null;

    newFarm = await MiningFarm.findById(location).session(session);
    if (!newFarm) throw new NotFoundError("NO Farm found");

    if (temporaryLocation) {
      tempNewFarm =
        await MiningFarm.findById(temporaryLocation).session(session);
      if (!tempNewFarm) throw new NotFoundError("No temporary farm found");
    }

    if (tempNewFarm) {
      //if there is a temporary farm
      if (!temporaryOldFarmId) {
        //if this is a first time temporary farm
        const adjusted = tempNewFarm.current + newPower;
        // if (adjusted > tempNewFarm.capacity)
        //   throw new BadRequestError("Capacity exceeded at temporary farm");
        if (tempNewFarm.occupiedSlots >= tempNewFarm.totalSlots) {
          throw new BadRequestError("No slots available in temporary farm");
        }
        tempNewFarm.current += newPower;
        tempNewFarm.occupiedSlots += 1;
        if (
          !tempNewFarm.temporaryMiners.some(
            (item) => item.miner.toString() === miner._id.toString(),
          )
        ) {
          tempNewFarm.temporaryMiners.push({
            miner: miner._id,
            serialNumber: miner.serialNumber,
          });
        }
        //if the the actual farms are different with a new temporary farm
        if (newFarm._id.toString() !== oldFarmId.toString()) {
          oldFarm = await MiningFarm.findById(oldFarmId).session(session);
          if (!oldFarm)
            throw new BadRequestError("Old Actual location not found");
          oldFarm.miners = oldFarm.miners.filter(
            (item) => item.toString() !== miner._id.toString(),
          );
          oldFarm.current = Math.max(0, oldFarm.current - oldPower);
          oldFarm.occupiedSlots = Math.max(0, oldFarm.occupiedSlots - 1);
          if (
            !newFarm.movedMiners.some(
              (item) => item.miner.toString() === miner._id.toString(),
            )
          ) {
            newFarm.movedMiners.push({
              miner: miner._id,
              serialNumber: miner.serialNumber,
            });
          }
          await newFarm.save({ session });
          await oldFarm.save({ session });

          //if the actual farms are same with a new temporary farm
        } else if (newFarm._id.toString() === oldFarmId.toString()) {
          newFarm.miners = newFarm.miners.filter(
            (item) => item.toString() !== miner._id.toString(),
          );
          if (
            !newFarm.movedMiners.some(
              (item) => item.miner.toString() === miner._id.toString(),
            )
          ) {
            newFarm.movedMiners.push({
              miner: miner._id,
              serialNumber: miner.serialNumber,
            });
          }

          newFarm.current = Math.max(0, newFarm.current - oldPower);
          newFarm.occupiedSlots = Math.max(0, newFarm.occupiedSlots - 1);
          await newFarm.save({ session });
        }
        await tempNewFarm.save({ session });
        //if there is a change in temporary farm
      } else if (temporaryOldFarmId.toString() !== tempNewFarm._id.toString()) {
        tempOldFarm =
          await MiningFarm.findById(temporaryOldFarmId).session(session);
        if (!tempOldFarm)
          throw new NotFoundError("Old temporary farm is not found");
        const adjusted = tempNewFarm.current + newPower;
        // if (adjusted > tempNewFarm.capacity) {
        //   throw new BadRequestError("Capacity exceeded at new temporary farm");
        // }
        if (tempNewFarm.occupiedSlots >= tempNewFarm.totalSlots) {
          throw new BadRequestError("No slots available at new temporary farm");
        }
        tempOldFarm.current = Math.max(0, tempOldFarm.current - oldPower);
        tempOldFarm.occupiedSlots = Math.max(0, tempOldFarm.occupiedSlots - 1);
        tempOldFarm.temporaryMiners = tempOldFarm.temporaryMiners.filter(
          (item) => item.miner.toString() !== miner._id.toString(),
        );
        tempNewFarm.current += newPower;
        tempNewFarm.occupiedSlots += 1;
        if (
          !tempNewFarm.temporaryMiners.some(
            (item) => item.miner.toString() === miner._id.toString(),
          )
        ) {
          tempNewFarm.temporaryMiners.push({
            miner: miner._id,
            serialNumber: miner.serialNumber,
          });
        }

        //if the actual farms are different with different temporary farms
        if (oldFarmId.toString() !== newFarm._id.toString()) {
          oldFarm = await MiningFarm.findById(oldFarmId).session(session);
          if (!oldFarm)
            throw new NotFoundError("Old Actual location not found");
          oldFarm.movedMiners = oldFarm.movedMiners.filter(
            (item) => item.miner.toString() !== miner._id.toString(),
          );
          if (
            !newFarm.movedMiners.some(
              (item) => item.miner.toString() === miner._id.toString(),
            )
          ) {
            newFarm.movedMiners.push({
              miner: miner._id,
              serialNumber: miner.serialNumber,
            });
          }
          await oldFarm.save({ session });
          await newFarm.save({ session });
        }
        await tempOldFarm.save({ session });
        await tempNewFarm.save({ session });
        //if there is a change in power with no change in temporary farm
      } else if (oldPower !== newPower) {
        const adjusted = tempNewFarm.current - oldPower + newPower;
        // if (adjusted > tempNewFarm.capacity) {
        //   throw new BadRequestError(
        //     "Capacity exceeded at the temporary location",
        //   );
        // }
        tempNewFarm.current = adjusted;
        await tempNewFarm.save({ session });
        //if the actual farms are different with same temporary farms
        if (oldFarmId.toString() !== newFarm._id.toString()) {
          oldFarm = await MiningFarm.findById(oldFarmId).session(session);
          if (!oldFarm)
            throw new NotFoundError("Old Actual location not found");
          oldFarm.movedMiners = oldFarm.movedMiners.filter(
            (item) => item.miner.toString() !== miner._id.toString(),
          );
          if (
            !newFarm.movedMiners.some(
              (item) => item.miner.toString() === miner._id.toString(),
            )
          ) {
            newFarm.movedMiners.push({
              miner: miner._id,
              serialNumber: miner.serialNumber,
            });
          }
          await oldFarm.save({ session });
          await newFarm.save({ session });
        }
      }
      //if there is no temporary farm
    } else {
      //if both actual farms are different without a temporary farm
      if (oldFarmId.toString() !== newFarm._id.toString()) {
        oldFarm = await MiningFarm.findById(oldFarmId).session(session);
        if (!oldFarm) throw new NotFoundError("old mining farm not found");
        const adjusted = newFarm.current + newPower;
        // if (adjusted > newFarm.capacity) {
        //   throw new BadRequestError("Capacity exceeded at new farm");
        // }
        if (newFarm.occupiedSlots >= newFarm.totalSlots) {
          throw new BadRequestError("No slots available in new farm");
        }
        oldFarm.current = Math.max(0, oldFarm.current - oldPower);
        oldFarm.miners = oldFarm.miners.filter(
          (item) => item.toString() !== miner._id.toString(),
        );
        oldFarm.occupiedSlots = Math.max(0, oldFarm.occupiedSlots - 1);
        newFarm.current += newPower;
        if (
          !newFarm.miners.some(
            (item) => item.toString() === miner._id.toString(),
          )
        ) {
          newFarm.miners.push(miner._id);
        }

        newFarm.occupiedSlots += 1;
        //if there is an old temporary farm and no new
        if (temporaryOldFarmId) {
          tempOldFarm =
            await MiningFarm.findById(temporaryOldFarmId).session(session);
          if (!tempOldFarm)
            throw new NotFoundError("No old temporary farm found");
          tempOldFarm.current = Math.max(0, tempOldFarm.current - oldPower);
          tempOldFarm.occupiedSlots = Math.max(
            0,
            tempOldFarm.occupiedSlots - 1,
          );
          tempOldFarm.temporaryMiners = tempOldFarm.temporaryMiners.filter(
            (item) => item.miner.toString() !== miner._id.toString(),
          );
          await tempOldFarm.save({ session });
        }

        await oldFarm.save({ session });
        await newFarm.save({ session });
        //if power is different and same actual farm without temporary farm
      } else if (oldPower !== newPower) {
        const adjusted = newFarm.current - oldPower + newPower;
        // if (adjusted > newFarm.capacity) {
        //   throw new BadRequestError("Capacity ecxceeded at current farm");
        // }
        newFarm.current = adjusted;
        await newFarm.save({ session });
        //if old temp farm exists without change in actual farm and no new temp farm and change in power
        if (temporaryOldFarmId) {
          tempOldFarm =
            await MiningFarm.findById(temporaryOldFarmId).session(session);
          if (!tempOldFarm)
            throw new NotFoundError("No old temporary farm found");
          tempOldFarm.current = Math.max(0, tempOldFarm.current - oldPower);
          tempOldFarm.occupiedSlots = Math.max(
            0,
            tempOldFarm.occupiedSlots - 1,
          );
          tempOldFarm.temporaryMiners = tempOldFarm.temporaryMiners.filter(
            (item) => item.miner.toString() !== miner._id.toString(),
          );
          await tempOldFarm.save({ session });
        }
      } else if (temporaryOldFarmId) {
        tempOldFarm =
          await MiningFarm.findById(temporaryOldFarmId).session(session);
        if (!tempOldFarm)
          throw new NotFoundError("No old temporary farm found");
        tempOldFarm.current = Math.max(0, tempOldFarm.current - oldPower);
        tempOldFarm.occupiedSlots = Math.max(0, tempOldFarm.occupiedSlots - 1);
        tempOldFarm.temporaryMiners = tempOldFarm.temporaryMiners.filter(
          (item) => item.miner.toString() !== miner._id.toString(),
        );
        const adjusted = newFarm.current + newPower;
        // if (adjusted > newFarm.capacity) {
        //   throw new BadRequestError("Capacity exceeded at actual location");
        // }
        if (newFarm.occupiedSlots >= newFarm.totalSlots)
          throw new BadRequestError("Slots exceeded at actual location");
        newFarm.movedMiners = newFarm.movedMiners.filter(
          (item) => item.miner.toString() !== miner._id.toString(),
        );
        if (
          !newFarm.miners.some(
            (item) => item.toString() === miner._id.toString(),
          )
        ) {
          newFarm.miners.push(miner._id);
        }
        newFarm.current += newPower;
        newFarm.occupiedSlots += 1;
        await newFarm.save({ session });
        await tempOldFarm.save({ session });
      }
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
    miner.hashUnit = minermodel.hashUnit || "TH";
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
    miner.currentLocation = tempNewFarm?.farm || undefined;
    miner.currentLocationId = tempNewFarm?._id || undefined;
    miner.temporaryOwner = nowRunning ? nowRunning : undefined;

    if (clientUser.clientName?.toLowerCase() === "intermine" && serialNumber) {
      if (!minermodel.modelCode) {
        throw new BadRequestError(
          `Please add model code for the miner model ${minermodel.name}`,
        );
      }
      try {
        const response = await axios.post(
          `${intermineURL}/create-miner`,
          {
            location: newFarm?.facilityCode,
            model: minermodel?.modelCode,
            serialNumber: serialNumber || miner.serialNumber || "",
            mac: macAddress || miner.macAddress || "",
            worker: workerId || miner.workerId || "",
            status,
            poolAddress: poolAddress || miner.pool || "",
            warrantyStart: warrantyStart || miner.warrantyStartDate || "",
            warrantyEnd: warrantyEnd || miner.warrantyEndDate || "",
          },
          {
            headers: {
              "x-api-key": process.env.INTERMINE_API_KEY,
            },
          },
        );
      } catch (err) {
        await session.abortTransaction();
        session.endSession();

        return res.status(err.response?.status || 500).json({
          error:
            err.response?.data?.msg ||
            err.response?.data?.message ||
            err.response?.data?.error ||
            err.message,
        });
      }
    }
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

export const deleteDataV2 = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;
    const miner = await Data.findById(id).session(session);
    if (!miner) throw new NotFoundError("No miner found");
    const client = await Client.findById(miner.client).session(session);
    if (!client) throw new NotFoundError("No client found");
    await DahabIssue.deleteMany({ miner: miner._id }).session(session);
    await DahabMessage.deleteMany({ miner: miner._id }).session(session);
    await Warranty.deleteMany({ miner: miner._id }).session(session);
    const farm = await MiningFarm.findById(miner.actualLocationId).session(
      session,
    );
    if (!farm) throw new BadRequestError("No farm has been found");
    let temporaryFarm;

    if (miner.currentLocationId) {
      temporaryFarm = await MiningFarm.findById(
        miner.currentLocationId,
      ).session(session);
      if (!temporaryFarm)
        throw new BadRequestError("No temporary farm has been found");
      temporaryFarm.current -= miner.power;
      temporaryFarm.occupiedSlots = Math.max(
        0,
        temporaryFarm.occupiedSlots - 1,
      );
      temporaryFarm.temporaryMiners = temporaryFarm.temporaryMiners.filter(
        (item) => item.miner.toString() !== miner._id.toString(),
      );
      farm.movedMiners = farm.movedMiners.filter(
        (item) => item.miner.toString() !== miner._id.toString(),
      );
      await temporaryFarm.save({ session });
      await farm.save({ session });
    } else {
      farm.current -= miner.power;
      farm.miners = farm.miners.filter(
        (item) => item.toString() !== miner._id.toString(),
      );
      farm.occupiedSlots -= 1;
      await farm.save({ session });
    }
    client.owned = client.owned.filter(
      (item) => item.toString() !== miner._id.toString(),
    );
    await client.save({ session });
    await miner.deleteOne({ session });
    await session.commitTransaction();
    res.status(200).json({ message: "Miner successfully" });
  } catch (error) {
    await session.abortTransaction();
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  } finally {
    session.endSession();
  }
};

export const getDataDropdown = async (req, res) => {
  try {
    const { search } = req.query;
    const queryObject = { version: "2" };
    if (search && search !== "") {
      queryObject.client = search;
    }
    const datas = await Data.find(queryObject)
      .select("workerId manufacturer model")
      .lean();
    res.status(200).json(datas);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};
