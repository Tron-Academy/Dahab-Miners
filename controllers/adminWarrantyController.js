import mongoose from "mongoose";
import { NotFoundError } from "../errors/customErrors.js";
import Warranty from "../models/Warranty.js";
import Data from "../models/DataModel.js";

//get all warranties
export const getAllWarranties = async (req, res) => {
  try {
    const { currentPage, type, query } = req.query;
    const matchStage = {};
    if (type && type !== "ALL") {
      matchStage.warrantyType = type;
    }
    const page = Number(currentPage || 1);
    const limit = 20;
    const skip = (page - 1) * limit;
    let searchRegex = null;
    if (query && query.trim() !== "") {
      searchRegex = new RegExp(query, "i");
    }

    const pipeline = [
      { $match: matchStage },
      {
        $lookup: {
          from: "datas",
          let: { minerId: "$miner" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$minerId"] } } },
            { $project: { model: 1, serialNumber: 1 } },
          ],
          as: "data",
        },
      },
      { $unwind: { path: "$data", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "clients",
          let: { userId: "$user" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
            { $project: { clientName: 1, clientId: 1 } },
          ],
          as: "client",
        },
      },
      { $unwind: { path: "$client", preserveNullAndEmptyArrays: true } },
    ];
    if (query && query.trim() !== "") {
      pipeline.push({
        $match: {
          $or: [
            { "data.model": searchRegex },
            { "data.serialNumber": searchRegex },
            { "client.clientName": searchRegex },
            { "client.clientId": searchRegex },
          ],
        },
      });
    }
    pipeline.push(
      {
        $sort: { createdAt: -1 },
      },
      { $skip: skip },
      { $limit: limit },
    );
    const warranties = await Warranty.aggregate(pipeline);
    // if (warranties.length < 1) throw new NotFoundError("No warranties found");
    const countPipeline = [
      { $match: matchStage },
      ...(query && query.trim() !== ""
        ? [
            {
              $lookup: {
                from: "datas",
                let: { minerId: "$miner" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$minerId"] } } },
                  { $project: { model: 1, serialNumber: 1 } },
                ],
                as: "data",
              },
            },
            { $unwind: { path: "$data", preserveNullAndEmptyArrays: true } },

            {
              $lookup: {
                from: "clients",
                let: { userId: "$user" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
                  { $project: { clientName: 1, clientId: 1 } },
                ],
                as: "client",
              },
            },
            {
              $unwind: { path: "$client", preserveNullAndEmptyArrays: true },
            },
            {
              $match: {
                $or: [
                  { "data.model": searchRegex },
                  { "data.serialNumber": searchRegex },
                  { "client.clientName": searchRegex },
                  { "client.clientId": searchRegex },
                ],
              },
            },
          ]
        : []),
      { $count: "total" },
    ];
    const countResult = await Warranty.aggregate(countPipeline);
    const totalWarranties = countResult[0]?.total || 0;
    const totalPages = Math.ceil(totalWarranties / limit);
    res.status(200).json({ warranties, totalPages });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

//get single warranty
export const getSingleWarranty = async (req, res) => {
  try {
    const warranty = await Warranty.findById(req.params.id);
    if (!warranty) throw new NotFoundError("No warranty found");
    res.status(200).json(warranty);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

//Update Warranty
export const updateWarranty = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { type, startDate, endDate, warrantyId } = req.body;
    const warranty = await Warranty.findById(warrantyId).session(session);
    if (!warranty) throw new NotFoundError("No warranty found");
    const miner = await Data.findById(warranty.miner).session(session);
    if (!miner)
      throw new NotFoundError("No miner found related to this warranty");
    warranty.warrantyType = type;
    warranty.startDate = new Date(startDate);
    warranty.endDate = new Date(endDate);
    warranty.user = miner.client || "";
    miner.warrantyStartDate = new Date(startDate);
    miner.warrantyEndDate = new Date(endDate);

    await warranty.save({ session });
    await miner.save({ session });
    await session.commitTransaction();
    session.endSession();
    res
      .status(200)
      .json({ message: "Warranty successfully updated", warranty });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

//get All warranty stats
export const getWarrantyStats = async (req, res) => {
  try {
    const warranties = await Warranty.countDocuments();
    const today = new Date();
    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
    const active = await Warranty.countDocuments({ endDate: { $gte: today } });
    const expired = warranties - active;
    const expireSoon = await Warranty.countDocuments({
      endDate: { $gte: today, $lte: oneMonthLater },
    });
    res.status(200).json({ warranties, active, expired, expireSoon });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const addNewWarranty = async (req, res) => {
  try {
    const { minerId, type, start, end } = req.body;
    const miner = await Data.findById(minerId);
    if (!miner) throw new NotFoundError();
    if (miner.relatedWarranty)
      throw new NotFoundError("Warranty already exists");
    const startDate = new Date(start);
    const endDate = new Date(end);
    const newWarranty = await Warranty.create({
      warrantyType: type,
      startDate: startDate,
      endDate: endDate,
      miner: miner._id,
      user: miner.client,
      status: "active",
    });
    miner.relatedWarranty = newWarranty._id;
    miner.warrantyStartDate = startDate;
    miner.warrantyEndDate = endDate;
    await miner.save();
    res.status(200).json({ message: "New warranty successfully added" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const getAllMinersWithoutWarranty = async (req, res) => {
  try {
    const miners = await Data.find({ relatedWarranty: { $exists: false } })
      .select("model clientName hashRate power")
      .lean();
    res.status(200).json(miners);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};
