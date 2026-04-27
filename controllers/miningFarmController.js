import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import MiningFarm from "../models/MiningFarm.js";
import FarmAnnouncement from "../models/FarmAnnouncement.js";
import Data from "../models/DataModel.js";
import Notification2 from "../models/Notification2.js";
import NormalFarmAnnouncement from "../models/NormalFarmAnnouncement.js";

export const getAllMiningFarms = async (req, res) => {
  try {
    const farms = await MiningFarm.find().populate(
      "downTimeHistory.announcement",
      "message",
    );
    res.status(200).json(farms);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const getMiningFarmsDropdown = async (req, res) => {
  try {
    const farms = await MiningFarm.find().select("farm").lean();
    res.status(200).json(farms);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const addNewMiningFarm = async (req, res) => {
  try {
    const {
      farm,
      capacity,
      farmType,
      farmStatus,
      totalSlots,
      facilityCode,
      country,
      contract,
      commissioningDay,
      contractDuration,
      info,
    } = req.body;
    const newFarm = new MiningFarm({
      farm,
      capacity,
      farmType: farmType,
      farmStatus,
      country,
      totalSlots: Number(totalSlots),
      contractType: contract,
      dayOfCommissioning: new Date(commissioningDay),
      contractDuration: new Date(contractDuration),
      farmInfo: info || "",
    });
    if (facilityCode) {
      newFarm.facilityCode = facilityCode;
    }
    await newFarm.save();
    res.status(200).json({ message: "New Farm added successfully", newFarm });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const editMiningFarm = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const {
      farm,
      facilityCode,
      capacity,
      farmId,
      farmType,
      totalSlots,
      country,
      contract,
      commissioningDay,
      contractDuration,
      info,
    } = req.body;
    const miningFarm = await MiningFarm.findById(farmId).session(session);
    if (!miningFarm) throw new NotFoundError("No mining Farm found");
    if (farm !== miningFarm.farm) {
      await Data.updateMany(
        { actualLocationId: miningFarm._id },
        { actualLocation: farm },
        { session },
      );
      await Data.updateMany(
        { currentLocationId: miningFarm._id },
        { currentLocation: farm },
        { session },
      );
    }
    miningFarm.farm = farm;
    miningFarm.capacity = capacity;
    miningFarm.farmType = farmType;
    miningFarm.country = country;
    miningFarm.contractType = contract;
    miningFarm.totalSlots = Number(totalSlots);
    miningFarm.dayOfCommissioning = new Date(commissioningDay);
    miningFarm.contractDuration = new Date(contractDuration);
    miningFarm.farmInfo = info || "";
    if (facilityCode) {
      miningFarm.facilityCode = facilityCode;
    }
    await miningFarm.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "Successfully updated", miningFarm });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const deleteMiningFarm = async (req, res) => {
  try {
    const { id } = req.params;
    const miningFarm = await MiningFarm.findById(id);
    if (!miningFarm) throw new NotFoundError("No mining farm found");
    if (miningFarm.current !== 0)
      throw new BadRequestError("Unable to Delete Occupied Farm");
    await miningFarm.deleteOne();
    res.status(200).json({ message: "success" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const createFarmAnnouncement = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { farmId, message, isOffline, startAt, endAt } = req.body;
    const farm = await MiningFarm.findById(farmId).session(session);
    if (!farm) throw new NotFoundError("No farm found");
    if (isOffline) {
      const existing = await FarmAnnouncement.findOne({
        farm: farm._id,
        status: { $in: ["active", "scheduled"] },
      }).session(session);
      if (existing)
        throw new BadRequestError(
          "A maintenance is currently scheduled or is running at the moment",
        );
      const newAnnouncement = new FarmAnnouncement({
        farm: farm._id,
        message,
        startAt: new Date(),
        status: "scheduled",
      });
      if (startAt) {
        newAnnouncement.startAt = new Date(startAt);
        newAnnouncement.endAt = endAt ? new Date(endAt) : null;
        newAnnouncement.status = "scheduled";
      }
      await newAnnouncement.save({ session });
      const miners = await Data.find({ currentLocationId: farm._id }).session(
        session,
      );
      const clients = [
        ...new Set(miners.map((item) => item.client.toString())),
      ];
      const notifications = clients.map((clientId) => {
        return {
          client: clientId,
          status: "unread",
          isForAdmin: false,
          problem: `Planned maintenance at ${
            farm.farm
          }: ${message}. Scheduled at ${new Date(startAt).toLocaleString()}`,
        };
      });
      if (notifications.length > 0) {
        await Notification2.insertMany(notifications, { session });
      }

      await session.commitTransaction();
      return res.status(200).json({ message: "successfully announced" });
    } else {
      const newNormalAnnouncement = new NormalFarmAnnouncement({
        farm: farm._id,
        message: message,
      });
      await newNormalAnnouncement.save({ session });
      const miners = await Data.find({ currentLocationId: farm._id }).session(
        session,
      );
      const clients = [
        ...new Set(miners.map((item) => item.client.toString())),
      ];
      const notifications = clients.map((clientId) => {
        return {
          client: clientId,
          status: "unread",
          isForAdmin: false,
          problem: `Announcement From mining farm ${farm.farm}: ${message}`,
        };
      });
      if (notifications.length > 0) {
        await Notification2.insertMany(notifications, { session });
      }

      await session.commitTransaction();
      return res.status(200).json({ message: "Success" });
    }
  } catch (error) {
    await session.abortTransaction();
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  } finally {
    session.endSession();
  }
};

export const getAllMinersInFarm = async (req, res) => {
  try {
    const { id } = req.params;
    const miners = await MiningFarm.findById(id)
      .select("miners")
      .populate({
        path: "miners",
        select: "manufacturer model clientName workerId power status",
      })
      .lean();
    if (!miners) throw new NotFoundError("No miners found");
    res.status(200).json(miners);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const updateFarmStatus = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { status, farmId, inform, autoActive, activationTime } = req.body;
    const farm = await MiningFarm.findById(farmId).session(session);
    if (!farm) throw new NotFoundError("No farm found");
    if (status === "Planned" || status === "In-Building") {
      farm.farmStatus = status;
      await farm.save({ session });
      await session.commitTransaction();
      return res.status(200).json({ message: "success" });
    } else if (status === "Offline") {
      if (autoActive && !activationTime)
        throw new BadRequestError(
          "Need activation time if auto Activation is required",
        );
      const existing = await FarmAnnouncement.findOne({
        farm: farm._id,
        status: { $in: ["active", "scheduled"] },
      }).session(session);
      if (existing)
        throw new BadRequestError(
          "A maintenance is currently scheduled or is running at the moment",
        );
      const newAnnouncement = new FarmAnnouncement({
        farm: farmId,
        message: `The Farm ${farm.farm} is now offline due to a maintenance work. We are sorry for the inconvenience and will be Online as soon as possible`,
        startAt: new Date(),
        status: "active",
        activatedAt: new Date(),
      });
      if (autoActive && activationTime) {
        newAnnouncement.endAt = new Date(activationTime);
      }
      await newAnnouncement.save({ session });
      farm.farmStatus = "Offline";
      farm.downTimeHistory.push({
        announcement: newAnnouncement._id,
        startAt: newAnnouncement.startAt,
      });
      await farm.save({ session });
      await Data.updateMany(
        { currentLocationId: farm._id, offlineReason: "", status: "online" },
        { $set: { status: "offline", offlineReason: "farm maintenance" } },
        { session },
      );
      if (inform) {
        const miners = await Data.find({ currentLocationId: farm._id }).session(
          session,
        );
        const clients = [
          ...new Set(miners.map((item) => item.client.toString())),
        ];
        const notifications = clients.map((clientId) => {
          return {
            client: clientId,
            status: "unread",
            isForAdmin: false,
            problem: `Maintenance work at ${
              farm.farm
            }: The Farm is now offline due to a maintenance work. We are sorry for the inconvenience and will be Online as soon as possible.`,
          };
        });
        if (notifications.length > 0) {
          await Notification2.insertMany(notifications, { session });
        }
      }
      await session.commitTransaction();
      return res.status(200).json({ message: "success" });
    } else if (status === "Active") {
      const announcement = await FarmAnnouncement.findOne({
        farm: farm._id,
        status: "active",
      }).session(session);
      if (announcement) {
        announcement.status = "completed";
        announcement.completedAt = new Date();
        await announcement.save({ session });
      }
      farm.farmStatus = "Active";
      const downTime = farm.downTimeHistory.find(
        (item) =>
          item.announcement.toString() === announcement?._id?.toString(),
      );
      if (downTime) {
        downTime.endAt = new Date();
      }
      await farm.save({ session });
      await Data.updateMany(
        { currentLocationId: farm._id, offlineReason: "farm maintenance" },
        { $set: { status: "online", offlineReason: "" } },
        { session },
      );
      if (inform) {
        const miners = await Data.find({ currentLocationId: farm._id }).session(
          session,
        );
        const clients = [
          ...new Set(miners.map((item) => item.client.toString())),
        ];
        const notifications = clients.map((clientId) => {
          return {
            client: clientId,
            status: "unread",
            isForAdmin: false,
            problem: `Maintenance work Completed at ${
              farm.farm
            }: The Farm is now online `,
          };
        });
        if (notifications.length > 0) {
          await Notification2.insertMany(notifications, { session });
        }
      }
      await session.commitTransaction();
      return res.status(200).json({ message: "success" });
    } else {
      throw new BadRequestError(`Invalid status ${status}`);
    }
  } catch (error) {
    await session.abortTransaction();
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  } finally {
    session.endSession();
  }
};

export const updateMinerStatusBulk = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { miners, status, farmId } = req.body;
    const farm = await MiningFarm.findById(farmId).session(session);
    if (!farm) throw new NotFoundError("Mining Farm not found");
    const minerDocs = await Data.find({
      _id: { $in: miners },
      status: { $ne: status },
    }).session(session);
    await Data.updateMany(
      {
        _id: { $in: miners },
        status: { $ne: status },
      },
      { $set: { status: status } },
      { session },
    );
    const notifications = minerDocs.map((miner) => ({
      client: miner.client,
      status: "unread",
      isForAdmin: false,
      problem: `The miner ${miner.manufacturer} ${miner.model} located at farm ${farm.farm} has been turned ${status} by Admin`,
    }));
    if (notifications.length > 0) {
      await Notification2.insertMany(notifications, { session });
    }
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "successfully updated" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const bulkMoveFarm = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { miners, newFarmId, oldFarmId } = req.body;
    const oldFarm = await MiningFarm.findById(oldFarmId).session(session);
    if (!oldFarm) throw new NotFoundError("Old farm not found");
    const newFarm = await MiningFarm.findById(newFarmId).session(session);
    if (!newFarm) throw new NotFoundError("New farm not found");
    const allMiners = await Data.find({ _id: { $in: miners } }).session(
      session,
    );
    // Ensure miners belong to old farm
    const invalidMiners = allMiners.filter(
      (m) => String(m.currentLocationId) !== String(oldFarm._id),
    );
    if (invalidMiners.length > 0) {
      throw new BadRequestError("Some miners do not belong to the old farm");
    }
    const totalPower = allMiners.reduce((sum, item) => sum + item.power, 0);
    const newFarmNewTotal = totalPower + newFarm.current;
    if (newFarmNewTotal > newFarm.capacity)
      throw new BadRequestError(
        "Unable to move all miners. Capacity exceeded at the new Farm",
      );

    const minerSet = new Set(miners.map(String));
    oldFarm.miners = oldFarm.miners.filter((id) => !minerSet.has(String(id)));
    oldFarm.current -= totalPower;
    newFarm.current += totalPower;
    newFarm.miners = [...newFarm.miners, ...miners];
    await oldFarm.save({ session });
    await newFarm.save({ session });
    await Data.updateMany(
      { _id: { $in: miners } },
      {
        $set: { currentLocation: newFarm.farm, currentLocationId: newFarm._id },
      },
      { session },
    );
    const notifications = allMiners.map((miner) => ({
      client: miner.client,
      status: "unread",
      isForAdmin: false,
      problem: `The miner ${miner.manufacturer} ${miner.model} located at farm ${oldFarm.farm} has been moved to a new farm ${newFarm.farm} by Admin`,
    }));
    if (notifications.length > 0) {
      await Notification2.insertMany(notifications, { session });
    }
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
