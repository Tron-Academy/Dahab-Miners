import { NotFoundError } from "../../errors/customErrors.js";
import Data from "../../models/DataModel.js";
import Issue from "../../models/intermine/Issue.js";
import Message from "../../models/intermine/Message.js";
import Notification from "../../models/Notification.js";

export const AddMinerData = async (req, res) => {
  const { client, nowRunning, location, model, serialNumber, mac, worker } =
    req.body;
  const data = await Data.findOne({ serialNumber: serialNumber });
  if (!data) {
    const newData = new Data({
      currentLocation: location,
      actualLocation: location,
      modelName: model,
      serialNumber: serialNumber,
      macAddress: mac,
      clientName: client,
      temporaryOwner: nowRunning,
      workerId: worker,
    });
    const notification = await Notification.create({
      notification: `A new Miner data has been created by Intermine. Model-${model}, serial Number-${serialNumber}`,
      isRead: false,
    });
    await newData.save();
    return res.status(201).json({ msg: "success" });
  }
  res.status(200).json({ msg: "Data Already exists" });
};

export const editMinerData = async (req, res) => {
  const { client, nowRunning, location, model, serialNumber, mac, worker } =
    req.body;
  const data = await Data.findOne({ serialNumber: serialNumber });
  if (!data) throw new NotFoundError("No data found");
  data.actualLocation = location;
  data.currentLocation = location;
  data.macAddress = mac;
  data.modelName = model;
  data.serialNumber = serialNumber;
  data.clientName = client;
  data.temporaryOwner = nowRunning;
  data.workerId = worker;
  const notification = await Notification.create({
    notification: `A mining data has been updated by Intermine. Miner-${model} Serial Number-${serialNumber}`,
    isRead: false,
  });
  await data.save();
  res.status(200).json({ msg: "success" });
};

export const issueReport = async (req, res) => {
  const { model, serialNumber, issue, description, issueId, clientName, type } =
    req.body;
  const notification = await Notification.create({
    notification: `An issue - ${issue} has been reported for the intermine Miner-${model} serial No - ${serialNumber}. ${description}`,
    isRead: false,
  });
  const newIssue = await Issue.create({
    issueId: issueId,
    issue: issue,
    description: description || "",
    serialNumber: serialNumber,
    clientName: clientName,
    miner: model,
  });
  const newMessage = await Message.create({
    message: notification.notification,
    issue: newIssue._id,
    sendBy: type,
  });
  newIssue.messages.push(newMessage._id);
  await newIssue.save();
  res.status(200).json({ msg: "success" });
};

export const sendReminder = async (req, res) => {
  const { model, serialNumber, issue, issueId } = req.body;
  const notification = await Notification.create({
    notification: `REMINDER ! The issue -${issue} reported for the intermine miner ${model} with serial No ${serialNumber} has not been solved yet.`,
    isRead: false,
  });
  const existing = await Issue.findOne({ issueId: issueId });
  if (!issue) throw new NotFoundError("No issue found");
  const newMessage = await Message.create({
    message: notification.notification,
    issue: existing._id,
    sendBy: "INTERMINE",
  });
  existing.messages.push(newMessage._id);
  await existing.save();
  res.status(200).json({ msg: "success" });
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
