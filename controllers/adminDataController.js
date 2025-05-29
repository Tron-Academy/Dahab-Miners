import { Parser } from "json2csv";
import { NotFoundError } from "../errors/customErrors.js";
import Data from "../models/DataModel.js";
import mongoose from "mongoose";
import { isStrictValidObject } from "../middleware/bulkUploadValidation.js";

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
          }: All required fields must exist, match exactly ("actualLocation", "currentLocation", "macAddress", "modelName", "serialNumber", "clientName", "temporaryOwner", "workerId",), and contain non-empty strings.`
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
