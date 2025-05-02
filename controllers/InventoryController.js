import { NotFoundError } from "../errors/customErrors.js";
import Inventory from "../models/InventoryModel.js";

export const addInventoryItem = async (req, res) => {
  const { itemName, category, quantity, threshold, location, remark } =
    req.body;
  const newItem = new Inventory({
    itemName,
    category,
    quantity,
    threshold,
    location,
    remark,
  });
  await newItem.save();
  res.status(201).json({ msg: "success" });
};

export const getAllItems = async (req, res) => {
  const { search, type } = req.query;
  let queryObject = {};
  if (search && search !== "") {
    queryObject.itemName = { $regex: search, $options: "i" };
  }
  if (type && type !== "All") {
    queryObject.category = type;
  }
  const items = await Inventory.find(queryObject);
  if (!items) throw new NotFoundError("No Items found");
  res.status(200).json(items);
};

export const getSingleItem = async (req, res) => {
  const item = await Inventory.findById(req.params.id);
  if (!item) throw new NotFoundError("no item found");
  res.status(200).json(item);
};

export const updateItem = async (req, res) => {
  const item = await Inventory.findById(req.params.id);
  if (!item) throw new NotFoundError("No item found");
  item.itemName = req.body.itemName;
  item.category = req.body.category;
  item.quantity = req.body.quantity;
  item.threshold = req.body.threshold;
  item.location = req.body.location;
  item.remark = req.body.remark;
  if (item.quantity >= item.threshold) {
    item.restockStatus = "";
  }
  await item.save();
  res.status(200).json({ msg: "success" });
};
