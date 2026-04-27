import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import Client from "../models/Clients.js";
import Data from "../models/DataModel.js";
import IssueType from "../models/IssueType.js";
import DahabIssue from "../models/DahabIssues.js";
import Message from "../models/intermine/Message.js";
import axios from "axios";
import { intermineURL } from "../utils/dropdowns.js";

export const addIssueType = async (req, res) => {
  try {
    const { issueType } = req.body;
    const newType = await IssueType.create({
      issueType: issueType,
    });
    res.status(201).json(newType);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const getAllIssueTypes = async (req, res) => {
  try {
    const issueTypes = await IssueType.find();
    // if (issueTypes.length < 1) throw new NotFoundError("No issue Types found");
    res.status(200).json(issueTypes);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

//edit an issue type
export const editIssueType = async (req, res) => {
  try {
    const { id, issueType } = req.body;
    const issue = await IssueType.findByIdAndUpdate(
      id,
      { issueType },
      { new: true },
    );
    if (!issue) throw new NotFoundError("No issue Type found");
    res.status(200).json({ message: "updated", issue });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const reportIssue = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { issue, workerId, miner, client, status, description } = req.body;
    const targetMiner = await Data.findById(miner).session(session);
    if (!targetMiner) throw new NotFoundError("No miner found");
    const targetIssue = await IssueType.findById(issue).session(session);
    if (!targetIssue) throw new NotFoundError("No Issue found");
    const targetClient = await Client.findById(client).session(session);
    if (!targetClient) throw new NotFoundError("No Client found");
    if (client.toString() !== targetMiner.client.toString())
      throw new BadRequestError("The miner is not owned by this client");
    if (workerId !== targetMiner.workerId)
      throw new BadRequestError("Invalid worker id");
    if (targetMiner.currentIssue)
      throw new BadRequestError(
        "An issue is already reported for the current miner",
      );
    const newIssue = new DahabIssue({
      issue: issue,
      issueName: targetIssue.issueType,
      workerAddress: workerId,
      miner: targetMiner._id,
      minerModel: targetMiner.model,
      user: targetClient._id,
      username: targetClient.clientName,
      status: "Pending",
      description: description || "",
      type: "repair",
      statusHistory: {
        status: "Pending",
        changedBy: "Admin",
        changedOn: new Date(),
      },
    });
    targetMiner.issueHistory.push(newIssue._id);
    targetMiner.currentIssue = newIssue._id;
    targetMiner.status = status;

    if (status === "offline") {
      targetMiner.offlineReason = "issue";
      targetMiner.offlineHistory.push({
        issue: newIssue._id,
        date: new Date(),
        isOpen: true,
        reason: "issue",
      });
    }
    await targetMiner.save({ session });
    await newIssue.save({ session });
    await session.commitTransaction();
    res.status(200).json({ message: "Issue Added" });
  } catch (error) {
    await session.abortTransaction();
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  } finally {
    session.endSession();
  }
};

export const getAllIssues = async (req, res) => {
  try {
    const { status, currentPage, search } = req.query;
    const page = Number(currentPage);
    const limit = 15;
    const skip = (page - 1) * limit;
    const queryObject = {};
    if (status && status !== "ALL") {
      queryObject.status = status;
    }
    if (search && search !== "") {
      const searchRegex = new RegExp(search, "i");
      queryObject.$or = [
        { issueName: searchRegex },
        { username: searchRegex },
        { minerModel: searchRegex },
        { workerAddress: searchRegex },
      ];
    }
    const issues = await DahabIssue.find(queryObject)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("miner", "serialNumber")
      .populate("user", "clientId");
    const totalIssues = await DahabIssue.countDocuments(queryObject);
    const totalPages = Math.ceil(totalIssues / limit);
    res.status(200).json({ issues, totalIssues, totalPages });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const updateIssueStatus = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { status } = req.body;
    const issue = await DahabIssue.findById(req.params.id)
      .populate("issue")
      .session(session);
    if (!issue) throw new NotFoundError("No issue found");
    if (issue.status === "Resolved")
      throw new BadRequestError("Issue Already Resolved");
    if (status === "Warranty") {
      issue.status = "Warranty";
      issue.statusHistory.push({
        status: "Warranty",
        changedBy: "Admin",
        changedOn: new Date(),
      });
      await issue.save({ session });
      await session.commitTransaction();
      return res.status(200).json({ message: "Status changed", issue });
    }
    if (status === "Pending") {
      issue.status = "Pending";
      issue.statusHistory.push({
        status: "Pending",
        changedBy: "Admin",
        changedOn: new Date(),
      });
      await issue.save({ session });
      await session.commitTransaction();
      return res.status(200).json({ message: "Status changed", issue });
    }
    if (status === "Repair Center") {
      issue.status = "Repair Center";
      issue.statusHistory.push({
        status: "Repair Center",
        changedBy: "Admin",
        changedOn: new Date(),
      });
      await issue.save({ session });
      await session.commitTransaction();
      return res.status(200).json({ message: "Status changed", issue });
    }
    if (status === "Resolved") {
      issue.status = "Resolved";
      issue.statusHistory.push({
        status: "Resolved",
        changedBy: "Admin",
        changedOn: new Date(),
      });
      issue.resolvedOn = new Date();
      const miner = await Data.findById(issue.miner).session(session);
      if (!miner) throw new NotFoundError("Unable to find Miner");
      miner.status = "online";
      miner.offlineReason = "";
      const minerOfflineObj = miner.offlineHistory.find(
        (item) => item.issue.toString() === issue._id.toString(),
      );
      if (minerOfflineObj && minerOfflineObj.isOpen) {
        minerOfflineObj.isOpen = false;
      }
      if (issue.type === "repair") {
        miner.currentIssue = null;
        // notification = new Notification({
        //   problem: `An issue ${issue.issue.issueType} has been successfully resolved for your miner ${miner.model} (${miner.workerId})`,
        //   client: miner.client,
        //   miner: miner._id,
        //   isIssue: true,
        //   issue: issue._id,
        //   status: "unread",
        // });
      }
      // if (issue.type === "change") {
      //   notification = new Notification({
      //     problem: `The Pool Change request for your miner ${miner.model} (${miner.workerId}) has been approved`,
      //     client: miner.client,
      //     issue: issue._id,
      //     isIssue: true,
      //     miner: miner._id,
      //     status: "unread",
      //   });
      // }
      // await notification.save({ session });
      await miner.save({ session });
      await issue.save({ session });
      await session.commitTransaction();
      return res.status(200).json({ message: "success", notification, issue });
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

export const getIssueMessages = async (req, res) => {
  try {
    const messages = await Message.find({ issue: req.params.id });
    res.status(200).json(messages);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const sendResponseToIssue = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { message, issue } = req.body;
    if (!message || !issue)
      throw new NotFoundError("Message or issue cannot be empty");
    const targetIssue = await DahabIssue.findById(issue).session(session);
    if (!targetIssue) throw new NotFoundError("No target issue found");
    const newMessage = new Message({
      message: message,
      sendBy: "Dahab",
      issue: issue,
    });
    targetIssue.messages.push(newMessage._id);
    try {
      await axios.post(
        `${intermineURL}/receive-message`,
        {
          issueId: targetIssue.intermineId,
          message,
          serviceProvider: "Dahab",
          serviceProviderId: newMessage._id,
        },
        {
          headers: {
            "x-api-key": process.env.INTERMINE_API_KEY,
          },
        },
      );
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      return res.status(500).json({
        error:
          error.response.data.error ||
          error.response.data.message ||
          "something went wrong with intermine server",
      });
    }
    await newMessage.save({ session });
    await targetIssue.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "response send successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};
