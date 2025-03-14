import { NotFoundError } from "../errors/customErrors.js";
import Data from "../models/DataModel.js";

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
  const { search, farm, currentPage } = req.query;
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
  const page = currentPage || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const datas = await Data.find(queryObject).skip(skip).limit(limit);
  if (!datas) throw new NotFoundError("No datas found");
  const totalDatas = await Data.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalDatas / limit);
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
