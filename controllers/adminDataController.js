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
    brand,
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
    brand,
    workerId,
  });
  await newData.save();
  res.status(201).json({ msg: "success" });
};

export const getAllDatas = async (req, res) => {
  const { model, serial, client } = req.query;
  const queryObject = {};
  if (model && model !== "") {
    queryObject.modelName = { $regex: model, $options: "i" };
  }
  if (serial && serial !== "") {
    queryObject.serialNumber = { $regex: serial, $options: "i" };
  }
  if (client && client !== "") {
    queryObject.clientName = { $regex: client, $options: "i" };
  }
  const datas = await Data.find(queryObject);
  if (!datas) throw new NotFoundError("No datas found");
  res.status(200).json({ msg: "success", datas });
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
    brand,
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
  data.brand = brand;
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
