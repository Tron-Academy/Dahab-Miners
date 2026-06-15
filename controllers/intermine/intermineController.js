import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../../errors/customErrors.js";
import Data from "../../models/DataModel.js";
import Issue from "../../models/intermine/Issue.js";
import Message from "../../models/intermine/Message.js";
import Notification from "../../models/Notification.js";
import DahabIssue from "../../models/DahabIssues.js";
import Client from "../../models/Clients.js";
import MiningFarm from "../../models/MiningFarm.js";
import MinerModel from "../../models/MinerModel.js";
import Warranty from "../../models/Warranty.js";

export const AddMinerData = async (req, res) => {
  const session = await mongoose.startSession();
  await session.startTransaction();
  const {
    client,
    nowRunning,
    location,
    model,
    serialNumber,
    mac,
    worker,
    status,
    poolAddress,
    warrantyStart,
    warrantyEnd,
  } = req.body;
  try {
    if (!serialNumber)
      throw new BadRequestError(
        "Serial Number is required for adding data in Dahab",
      );
    const data = await Data.findOne({ serialNumber: serialNumber }).session(
      session,
    );
    const minerModel = await MinerModel.findOne({ modelCode: model }).session(
      session,
    );
    if (!minerModel)
      throw new BadRequestError(
        `No miner model with code ${model} found on dahab server`,
      );
    const clientUser = await Client.findOne({
      clientName: { $regex: "intermine", $options: "i" },
    }).session(session);
    if (!clientUser)
      throw new BadRequestError("Client 404 error in Dahab Server");
    let farm;
    if (location) {
      farm = await MiningFarm.findOne({ facilityCode: location }).session(
        session,
      );
      if (!farm)
        throw new BadRequestError(
          `Farm with facility code ${location} not found on dahab server`,
        );
    }
    if (!data) {
      const newData = new Data({
        client: clientUser._id,
        clientName: clientUser.clientName,
        workerId: worker?.trim() || undefined,
        serialNumber: serialNumber?.trim() || undefined,
        model: minerModel.name,
        modelId: minerModel._id,
        status: status,
        hashUnit: minerModel.hashUnit || "TH",
        actualLocation: farm?.farm || undefined,
        actualLocationId: farm?._id || undefined,
        pool: poolAddress || undefined,
        macAddress: mac?.trim() || undefined,
        hashRate: minerModel.hashRate,
        power: minerModel.power,
        coins: minerModel.coins,
        algorithm: minerModel.algorithm,
        coolingType: minerModel.coolingType,
        manufacturer: minerModel.manufacturer,
        version: "2",
      });
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
          user: clientUser._id,
          miner: newData._id,
          status: "active",
        });
        newData.relatedWarranty = newWarranty._id;
        await newWarranty.save({ session });
      }
      if (farm) {
        farm.current = farm.current + minerModel.power;
        farm.occupiedSlots = farm.occupiedSlots + 1;
        farm.miners.push(newData._id);
        await farm.save({ session });
      }
      const notification = new Notification({
        notification: `A new Miner data has been created by Intermine. Model-${model}, serial Number-${serialNumber}.`,
        isRead: false,
      });
      await newData.save({ session });
      await notification.save({ session });
      await session.commitTransaction();
      session.endSession();
      return res.status(201).json({ msg: "success" });
    } else {
      const oldFarm = data.actualLocationId
        ? await MiningFarm.findById(data.actualLocationId).session(session)
        : null;

      const newFarm = farm ? farm : null;

      if (oldFarm) {
        if (data.currentLocationId) {
          oldFarm.movedMiners = oldFarm.movedMiners.filter(
            (item) => item.miner?.toString() !== data._id.toString(),
          );
        } else {
          oldFarm.miners = oldFarm.miners.filter(
            (item) => item.toString() !== data._id.toString(),
          );
          oldFarm.current = Math.max(0, oldFarm.current - data.power);
          oldFarm.occupiedSlots = Math.max(0, oldFarm.occupiedSlots - 1);
        }
      }
      if (newFarm) {
        if (data.currentLocationId) {
          if (
            !newFarm.movedMiners.some(
              (item) => item.miner?.toString() === data._id.toString(),
            )
          ) {
            newFarm.movedMiners.push({
              miner: data._id,
              serialNumber: data.serialNumber,
            });
          }
        } else {
          if (
            !newFarm.miners.some(
              (item) => item.toString() === data._id.toString(),
            )
          ) {
            newFarm.miners.push(data._id);
            newFarm.current += minerModel.power;
            newFarm.occupiedSlots += 1;
          }
        }
      }
      // if (!farm && data.actualLocationId) {
      //   farm = await MiningFarm.findById(data.actualLocationId).session(
      //     session,
      //   );
      // }
      // if (data.actualLocationId && farm) {
      //   if (data.actualLocationId?.toString() !== farm._id?.toString()) {
      //     const oldFarm = await MiningFarm.findById(
      //       data.actualLocationId,
      //     ).session(session);
      //     if (!oldFarm)
      //       throw new BadRequestError("Old farm not found in dahab server");
      //     if (data.currentLocationId) {
      //       oldFarm.movedMiners = oldFarm.movedMiners.filter(
      //         (item) => item.miner?.toString() !== data._id.toString(),
      //       );
      //       farm.movedMiners.push({
      //         miner: data._id,
      //         serialNumber: serialNumber,
      //       });
      //       data.actualLocation = farm.farm;
      //       data.actualLocationId = farm._id;
      //     } else {
      //       if (data.modelId?.toString() === minerModel._id?.toString()) {
      //         oldFarm.miners = oldFarm.miners.filter(
      //           (item) => item.toString() !== data._id.toString(),
      //         );
      //         oldFarm.current = Math.max(0, oldFarm.current - minerModel.power);
      //         oldFarm.occupiedSlots = Math.max(0, oldFarm.occupiedSlots - 1);
      //         farm.current = farm.current + minerModel.power;
      //         farm.occupiedSlots = farm.occupiedSlots + 1;
      //         farm.miners.push(data._id);
      //         data.actualLocation = farm.farm;
      //         data.actualLocationId = farm._id;
      //       } else {
      //         oldFarm.miners = oldFarm.miners.filter(
      //           (item) => item.toString() !== data._id.toString(),
      //         );
      //         oldFarm.current = Math.max(0, oldFarm.current - data.power);
      //         oldFarm.occupiedSlots = Math.max(0, oldFarm.occupiedSlots - 1);
      //         farm.current = farm.current + minerModel.power;
      //         farm.occupiedSlots = farm.occupiedSlots + 1;
      //         farm.miners.push(data._id);
      //         data.actualLocation = farm.farm;
      //         data.actualLocationId = farm._id;
      //       }
      //     }
      //     await oldFarm.save({ session });
      //   } else {
      //     if (data.modelId?.toString() !== minerModel._id?.toString()) {
      //       if (data.currentLocationId) {
      //         const tempLocation = await MiningFarm.findById(
      //           data.currentLocationId,
      //         ).session(session);
      //         if (!tempLocation)
      //           throw new BadRequestError(
      //             "Temmporary location not found in dahab server",
      //           );
      //         tempLocation.current = Math.max(
      //           0,
      //           tempLocation.current - data.power,
      //         );
      //         tempLocation.current = tempLocation.current + minerModel.power;
      //         await tempLocation.save({ session });
      //       } else {
      //         farm.current = Math.max(0, farm.current - data.power);
      //         farm.current = farm.current + minerModel.power;
      //       }
      //     }
      //   }
      // }
      // if (!data.actualLocationId && farm) {
      //   farm.current = farm.current + minerModel.power;
      //   farm.miners.push(data._id);
      //   data.actualLocation = farm.farm;
      //   data.actualLocationId = farm._id;
      // }
      // if (farm) {
      //   await farm.save({ session });
      // }
      let newWarranty;
      if (warrantyStart && warrantyEnd) {
        const start = new Date(warrantyStart);
        const end = new Date(warrantyEnd);
        data.warrantyStartDate = start;
        data.warrantyEndDate = end;
        if (data.relatedWarranty) {
          newWarranty = await Warranty.findById(data.relatedWarranty).session(
            session,
          );
          if (!newWarranty)
            throw new BadRequestError(
              "No related warranty found in dahab servers",
            );
          newWarranty.startDate = start;
          newWarranty.endDate = end;
        } else {
          newWarranty = new Warranty({
            warrantyType: "Manufacturer",
            startDate: start,
            endDate: end,
            user: clientUser._id,
            miner: data._id,
            status: "active",
          });
          data.relatedWarranty = newWarranty._id;
        }
        await newWarranty.save({ session });
      }
      data.client = clientUser._id;
      data.clientName = clientUser.clientName;
      if (worker) data.workerId = worker?.trim();
      if (serialNumber) data.serialNumber = serialNumber?.trim();
      data.model = minerModel.name;
      data.modelId = minerModel._id;
      data.status = status;
      data.hashUnit = minerModel.hashUnit || "TH";
      if (poolAddress) data.pool = poolAddress;
      if (mac) data.macAddress = mac?.trim();
      data.hashRate = minerModel.hashRate;
      data.power = minerModel.power;
      data.coins = minerModel.coins;
      data.actualLocation = newFarm?.farm;
      data.actualLocationId = newFarm?._id;
      data.algorithm = minerModel.algorithm;
      data.manufacturer = minerModel.manufacturer;
      data.coolingType = minerModel.coolingType;

      const notification = new Notification({
        notification: `A Miner data has been edited by Intermine . Model-${model}, serial Number-${serialNumber}.`,
        isRead: false,
      });
      if (oldFarm) await oldFarm.save({ session });
      if (newFarm) await newFarm.save({ session });
      await data.save({ session });
      await notification.save({ session });
      await session.commitTransaction();
      session.endSession();
      return res.status(200).json({ msg: "success" });
    }
    throw new BadRequestError("Something went wrong in dahab server");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res
      .status(error.statusCode || 500)
      .json({ msg: error.msg || error.message });
  }
};

export const editMinerData = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      client,
      nowRunning,
      location,
      model,
      serialNumber,
      mac,
      worker,
      status,
      poolAddress,
    } = req.body;
    if (!serialNumber)
      throw new BadRequestError(
        "Serial Number is required by the dahab server",
      );
    const data = await Data.findOne({ serialNumber: serialNumber }).session(
      session,
    );
    if (!data) throw new NotFoundError("No data found on dahab server");
    const minerModel = await MinerModel.findOne({ modelCode: model }).session(
      session,
    );
    if (!minerModel)
      throw new BadRequestError(
        `No miner model found for code ${model} in dahab servers`,
      );
    const clientUser = await Client.findOne({
      clientName: { $regex: "intermine", $options: "i" },
    }).session(session);
    if (!clientUser)
      throw new BadRequestError("Client 404 error in Dahab Server");
    let farm;
    if (location) {
      farm = await MiningFarm.findOne({ facilityCode: location }).session(
        session,
      );
      if (!farm)
        throw new BadRequestError(
          `Farm with facility code ${location} not found on dahab server`,
        );
    }
    if (!farm && data.actualLocationId) {
      farm = await MiningFarm.findById(data.actualLocationId).session(session);
    }
    if (data.actualLocationId && farm) {
      if (data.actualLocationId?.toString() !== farm._id?.toString()) {
        const oldFarm = await MiningFarm.findById(
          data.actualLocationId,
        ).session(session);
        if (!oldFarm)
          throw new BadRequestError("Old farm not found in dahab server");
        if (data.currentLocationId) {
          oldFarm.movedMiners = oldFarm.movedMiners.filter(
            (item) => item.miner?.toString() !== data._id.toString(),
          );
          farm.movedMiners.push({
            miner: data._id,
            serialNumber: serialNumber,
          });
          data.actualLocation = farm.farm;
          data.actualLocationId = farm._id;
        } else {
          if (data.modelId?.toString() === minerModel._id?.toString()) {
            oldFarm.miners = oldFarm.miners.filter(
              (item) => item.toString() !== data._id.toString(),
            );
            oldFarm.current = Math.max(0, oldFarm.current - minerModel.power);
            oldFarm.occupiedSlots = Math.max(0, oldFarm.occupiedSlots - 1);
            farm.current = farm.current + minerModel.power;
            farm.occupiedSlots = farm.occupiedSlots + 1;
            farm.miners.push(data._id);
            data.actualLocation = farm.farm;
            data.actualLocationId = farm._id;
          } else {
            oldFarm.miners = oldFarm.miners.filter(
              (item) => item.toString() !== data._id.toString(),
            );
            oldFarm.current = Math.max(0, oldFarm.current - data.power);
            oldFarm.occupiedSlots = Math.max(0, oldFarm.occupiedSlots - 1);
            farm.current = farm.current + minerModel.power;
            farm.occupiedSlots = farm.occupiedSlots + 1;
            farm.miners.push(data._id);
            data.actualLocation = farm.farm;
            data.actualLocationId = farm._id;
          }
        }
        await oldFarm.save({ session });
      } else {
        if (data.modelId?.toString() !== minerModel._id?.toString()) {
          if (data.currentLocationId) {
            const tempLocation = await MiningFarm.findById(
              data.currentLocationId,
            ).session(session);
            if (!tempLocation)
              throw new BadRequestError(
                "Temmporary location not found in dahab server",
              );
            tempLocation.current = Math.max(
              0,
              tempLocation.current - data.power,
            );
            tempLocation.current = tempLocation.current + minerModel.power;
            await tempLocation.save({ session });
          } else {
            farm.current = Math.max(0, farm.current - data.power);
            farm.current = farm.current + minerModel.power;
          }
        }
      }
    }
    if (!data.actualLocationId && farm) {
      farm.current = farm.current + minerModel.power;
      farm.miners.push(data._id);
      data.actualLocation = farm.farm;
      data.actualLocationId = farm._id;
    }
    if (farm) {
      await farm.save({ session });
    }
    data.client = clientUser._id;
    data.clientName = clientUser.clientName;
    data.workerId = worker || data.workerId || undefined;
    data.serialNumber = serialNumber || data.serialNumber || undefined;
    data.model = minerModel.name;
    data.modelId = minerModel._id;
    data.status = status;
    data.hashUnit = minerModel.hashUnit || "TH";
    data.pool = poolAddress || data.pool || undefined;
    data.macAddress = mac || data.macAddress || undefined;
    data.hashRate = minerModel.hashRate;
    data.power = minerModel.power;
    data.coins = minerModel.coins;
    data.algorithm = minerModel.algorithm;
    data.manufacturer = minerModel.manufacturer;
    data.coolingType = minerModel.coolingType;

    const notification = new Notification({
      notification: `A Miner data has been edited by Intermine . Model-${model}, serial Number-${serialNumber}.`,
      isRead: false,
    });
    await data.save({ session });
    await notification.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ msg: "success" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res
      .status(error.statusCode || 500)
      .json({ msg: error.msg || error.message });
  }
};

export const issueReport = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const {
      model,
      serialNumber,
      issue,
      description,
      issueId,
      clientName,
      type,
      status,
    } = req.body;
    const miner = await Data.findOne({ serialNumber: serialNumber }).session(
      session,
    );
    if (!miner)
      throw new NotFoundError("The reported miner not found on Dahab Database");
    if (miner.currentIssue)
      throw new BadRequestError(
        "Issue already reported for this miner on Dahab Database",
      );
    const notification = new Notification({
      notification: `An issue - ${issue} has been reported for the intermine Miner-${model} serial No - ${serialNumber}. ${description}`,
      isRead: false,
    });
    const newIssue = new DahabIssue({
      issueName: issue,
      description: description ? description : undefined,
      workerAddress: miner.workerId,
      miner: miner._id,
      minerModel: miner.model,
      user: miner.client,
      username: miner.clientName,
      status: "Pending",
      type: "repair",
      owner: "Intermine",
      intermineId: issueId,
      statusHistory: [
        { status: "Pending", changedBy: "Intermine", changedOn: new Date() },
      ],
    });
    const newMessage = new Message({
      message: notification.notification,
      issue: newIssue._id,
      sendBy: type,
    });
    newIssue.messages.push(newMessage._id);
    if (status === "offline") {
      miner.status = "offline";
      miner.offlineReason = "issue";
      miner.offlineHistory.push({
        issue: newIssue._id,
        date: new Date(),
        isOpen: true,
        reason: "issue",
      });
    }
    miner.currentIssue = newIssue._id;
    miner.issueHistory.push(newIssue._id);
    await miner.save({ session });
    await newMessage.save({ session });
    await notification.save({ session });
    await newIssue.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ msg: "success" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res
      .status(error.statusCode || 500)
      .json({ msg: error.msg || error.message });
  }
};

export const poolChange = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { issue, serialNumber, newWorker, newPool, issueId } = req.body;
    if (!serialNumber || !issue || !newWorker || !newPool || !issueId) {
      throw new BadRequestError(
        "Serial Number, issue, newWorker, newPool, issueId is required in DH",
      );
    }
    const miner = await Data.findOne({ serialNumber: serialNumber }).session(
      session,
    );
    if (!miner) throw new NotFoundError("The reported miner not found on DH");
    const existingPendingRequest = await DahabIssue.findOne({
      miner: miner._id,
      type: "change",
      status: "Pending",
    }).session(session);

    if (existingPendingRequest) {
      throw new BadRequestError(
        "A Pool change request is already pending on DH server for this miner",
      );
    }

    const existingIssueId = await DahabIssue.findOne({
      intermineId: issueId,
    }).session(session);

    if (existingIssueId) {
      throw new BadRequestError(
        "This Intermine issue has already been processed",
      );
    }
    const notification = new Notification({
      notification: issue,
      isRead: false,
    });
    const newIssue = new DahabIssue({
      issueName: "Pool Change Request",
      workerAddress: miner.workerId,
      miner: miner._id,
      minerModel: miner.model,
      user: miner.client,
      username: miner.clientName,
      status: "Pending",
      type: "change",
      changeRequest: {
        pool: newPool,
        worker: newWorker,
      },
      owner: "Intermine",
      intermineId: issueId,
      statusHistory: [
        {
          status: "Pending",
          changedBy: "Intermine-Client",
          changedOn: new Date(),
        },
      ],
    });
    const newMessage = new Message({
      message: issue,
      issue: newIssue._id,
      sendBy: "Intermine-Client",
    });
    newIssue.messages.push(newMessage._id);
    miner.changeHistory.push(newIssue._id);
    await miner.save({ session });
    await newIssue.save({ session });
    await newMessage.save({ session });
    await notification.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "success" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res
      .status(error.statusCode || 500)
      .json({ msg: error.msg || error.message });
  }
};

export const sendReminder = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { model, serialNumber, issue, issueId } = req.body;
    const notification = new Notification({
      notification: `REMINDER ! The issue -${issue} reported for the intermine miner ${model} with serial No ${serialNumber} has not been solved yet.`,
      isRead: false,
    });
    const existing = await DahabIssue.findOne({ intermineId: issueId })
      .populate("miner", "serialNumber")
      .session(session);
    if (!existing) throw new NotFoundError("No issue found on Dahab Database");
    if (serialNumber !== existing.miner?.serialNumber)
      throw new BadRequestError("Incorrect serial number");
    const newMessage = new Message({
      message: notification.notification,
      issue: existing._id,
      sendBy: "INTERMINE",
    });
    existing.messages.push(newMessage._id);
    await existing.save({ session });
    await newMessage.save({ session });
    await notification.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ msg: "success" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res
      .status(error.statusCode || 500)
      .json({ msg: error.msg || error.message });
  }
};

//update status of repair
export const updateIssueStatusFromIntermine = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { issueId, status, serialNumber, type } = req.body;
    if (!issueId || !status || !serialNumber || !type)
      throw BadRequestError(
        "Issue Id , status, serial Number and type is required for Dahab server",
      );
    const issue = await DahabIssue.findOne({ intermineId: issueId })
      .populate("miner", "serialNumber")
      .session(session);
    if (!issue) throw new NotFoundError("Issue not found on Dahab database");
    if (serialNumber !== issue.miner.serialNumber) {
      throw new BadRequestError("Invalid serial number in Dahab Database");
    }
    if (status !== "Resolved" && type === "repair") {
      issue.status = status;
      issue.statusHistory.push({
        status: status,
        changedBy: "Intermine",
        changedOn: new Date(),
      });
    } else if (status === "Resolved" && type === "repair") {
      issue.status = status;
      issue.statusHistory.push({
        status: status,
        changedBy: "Intermine",
        changedOn: new Date(),
      });
      issue.resolvedOn = new Date();
      const miner = await Data.findById(issue.miner._id).session(session);
      if (!miner)
        throw new BadRequestError(
          "The target miner is missing on Dahab Database",
        );
      if (issue.type === "repair") {
        miner.currentIssue = null;
      }
      miner.status = "online";
      miner.offlineReason = "";
      const minerOfflineObj = miner.offlineHistory.find(
        (item) => item.issue.toString() === issue._id.toString(),
      );
      if (minerOfflineObj && minerOfflineObj.isOpen) {
        minerOfflineObj.isOpen = false;
      }
      await miner.save({ session });
    } else if (status === "Resolved" && type === "change") {
      issue.status = "Resolved";
      issue.statusHistory.push({
        status: status,
        changedBy: "Intermine",
        changedOn: new Date(),
      });
      issue.resolvedOn = new Date();
      const miner = await Data.findById(issue.miner._id).session(session);
      if (!miner)
        throw new BadRequestError(
          "The target miner is missing on Dahab Database",
        );
      miner.workerId = issue.changeRequest?.worker;
      miner.pool = issue.changeRequest?.pool;
      await miner.save({ session });
    }
    await issue.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res
      .status(error.statusCode || 500)
      .json({ msg: error.msg || error.message });
  }
};

//update Message Status
export const recieveMessageStatus = async (req, res) => {
  try {
    const { messageId, message, status } = req.body;
    const msg = await Message.findByIdAndUpdate(messageId, {
      message: message,
      status: status,
    });
    if (!msg) throw new NotFoundError("No Message found");
    res.status(200).json({ message: "success" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ msg: error.msg || error.message });
  }
};
