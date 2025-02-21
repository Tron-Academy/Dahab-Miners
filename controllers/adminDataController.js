import { NotFoundError } from "../errors/customErrors.js";
import Data from "../models/DataModel.js";

export const addNewData = async (req, res) => {
  const {
    location,
    macAddress,
    modelNumber,
    serialNumber,
    clientName,
    temporary,
  } = req.body;
  const newData = new Data({
    location,
    modelNumber,
    serialNumber,
    macAddress,
    clientName,
    temporaryOwner: temporary,
  });
  await newData.save();
  res.status(201).json({ msg: "success" });
};

export const getAllDatas = async (req, res) => {
  const { model, serial, client } = req.query;
  const queryObject = {};
  if (model && model !== "") {
    queryObject.modelNumber = { $regex: model, $options: "i" };
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
    location,
    macAddress,
    modelNumber,
    serialNumber,
    clientName,
    temporary,
  } = req.body;
  const data = await Data.findById(id);
  if (!data) throw new NotFoundError("No data found");
  data.location = location;
  data.macAddress = macAddress;
  data.modelNumber = modelNumber;
  data.serialNumber = serialNumber;
  data.clientName = clientName;
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
