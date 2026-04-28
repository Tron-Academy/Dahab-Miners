import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../../errors/customErrors.js";
import Data from "../../models/DataModel.js";
import Issue from "../../models/intermine/Issue.js";
import Message from "../../models/intermine/Message.js";
import Notification from "../../models/Notification.js";
import DahabIssue from "../../models/DahabIssues.js";

export const AddMinerData = async (req, res) => {
  const { client, nowRunning, location, model, serialNumber, mac, worker } =
    req.body;
  const data = await Data.findOne({ serialNumber: serialNumber });
  if (!data) {
    // const newData = new Data({
    //   currentLocation: location,
    //   actualLocation: location,
    //   modelName: model,
    //   serialNumber: serialNumber,
    //   macAddress: mac,
    //   clientName: client,
    //   temporaryOwner: nowRunning,
    //   workerId: worker,
    // });
    // const notification = await Notification.create({
    //   notification: `A new Miner data has been created by Intermine. Model-${model}, serial Number-${serialNumber}`,
    //   isRead: false,
    // });
    // await newData.save();
    // return res.status(201).json({ msg: "success" });
    throw new BadRequestError("Data not found on dahab database");
  }
  res.status(200).json({ msg: "OK" });
};

export const editMinerData = async (req, res) => {
  const { client, nowRunning, location, model, serialNumber, mac, worker } =
    req.body;
  const data = await Data.findOne({ serialNumber: serialNumber });
  if (!data) throw new NotFoundError("No data found on dahab datacenter");
  // data.actualLocation = location;
  // data.currentLocation = location;
  // data.macAddress = mac;
  // data.modelName = model;
  // data.serialNumber = serialNumber;
  // data.clientName = client;
  // data.temporaryOwner = nowRunning;
  // data.workerId = worker;
  // const notification = await Notification.create({
  //   notification: `A mining data has been updated by Intermine. Miner-${model} Serial Number-${serialNumber}`,
  //   isRead: false,
  // });
  // await data.save();
  res.status(200).json({ msg: "success" });
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
    const { issueId, status, serialNumber } = req.body;
    const issue = await DahabIssue.findOne({ intermineId: issueId })
      .populate("miner", "serialNumber")
      .session(session);
    if (!issue) throw new NotFoundError("Issue not found on Dahab database");
    if (serialNumber !== issue.miner.serialNumber) {
      throw new BadRequestError("Invalid serial number in Dahab Database");
    }
    if (status !== "Resolved") {
      issue.status = status;
      issue.statusHistory.push({
        status: status,
        changedBy: "Intermine",
        changedOn: new Date(),
      });
    } else if (status === "Resolved") {
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
      miner.currentIssue = null;
      miner.status = "online";
      miner.offlineReason = "";
      const minerOfflineObj = miner.offlineHistory.find(
        (item) => item.issue.toString() === issue._id.toString(),
      );
      if (minerOfflineObj && minerOfflineObj.isOpen) {
        minerOfflineObj.isOpen = false;
      }
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
