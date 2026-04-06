import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import Client from "../models/Clients.js";
import Data from "../models/DataModel.js";
import IssueType from "../models/IssueType.js";
import DahabIssue from "../models/DahabIssues.js";

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
      workerAddress: workerId,
      miner: targetMiner._id,
      user: targetClient._id,
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
