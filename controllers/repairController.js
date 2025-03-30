import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { formatImage } from "../middleware/multerMiddleware.js";
import Data from "../models/DataModel.js";
import Repair from "../models/RepairModel.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewRepairMiner = async (req, res) => {
  const { serialNumber, macAddress, workerId, owner, nowRunning } = req.body;
  const newMiner = new Repair({
    serialNumber,
    macAddress,
    workerId,
    owner,
    nowRunning,
    status: "Need to Identify Issue",
  });
  await newMiner.save();
  res.status(201).json({ msg: "success" });
};

export const getAllRepairMiner = async (req, res) => {
  const miners = await Repair.find();
  if (!miners) throw new NotFoundError("No miners has been found");
  res.status(200).json(miners);
};

export const getRelatedMiner = async (req, res) => {
  const { serialNumber } = req.query;
  const relatedMiner = await Data.findOne({ serialNumber: serialNumber });
  if (!relatedMiner) throw new NotFoundError("No related miner found");
  res.status(200).json(relatedMiner);
};

export const getSingleMiner = async (req, res) => {
  const { id } = req.params;
  const miner = await Repair.findById(id);
  if (!miner) throw new NotFoundError("No miner found");
  res.status(200).json(miner);
};

export const addIssues = async (req, res) => {
  const { id } = req.params;
  const { issues } = req.body;
  const miner = await Repair.findById(id);
  if (!miner) throw new NotFoundError("No miner found");
  miner.problems = issues;
  miner.status = "Need Repair";
  await miner.save();
  res.status(200).json({ msg: "success" });
};

export const updateRepairStatus = async (req, res) => {
  const { id } = req.params;
  const { problemId, repairStatus } = req.body;
  const miner = await Repair.findById(id);
  if (!miner) throw new NotFoundError("No miner found");
  const problemsArray = miner.problems;
  const selectedProblem = problemsArray.find(
    (item) => item._id.toString() === problemId.toString()
  );
  if (!selectedProblem)
    throw new NotFoundError("Unable to find the selected problem");
  selectedProblem.issueStatus = repairStatus;
  const selectedIndex = problemsArray.findIndex(
    (item) => item._id.toString() === problemId.toString()
  );
  problemsArray[selectedIndex] = selectedProblem;
  miner.problems = problemsArray;
  await miner.save();
  res.status(200).json({ msg: "success" });
};

export const updateRepairProcess = async (req, res) => {
  const miner = await Repair.findById(req.body.id);
  if (!miner) throw new NotFoundError("No miner found");
  const problemsArray = miner.problems.filter(
    (item) => item.issueStatus === "Repair Done"
  );
  if (problemsArray.length === miner.problems.length) {
    miner.status = "Need Testing";
    await miner.save();
    res.status(200).json({ msg: "success" });
  } else {
    throw new BadRequestError("Can't Update untill all problems are solved");
  }
};

export const passTesting = async (req, res) => {
  const { id } = req.params;
  const miner = await Repair.findById(id);
  if (!miner) throw new NotFoundError("No miner found");
  miner.successImgUrl = req.body.logImageUrl;
  miner.successImgPublicId = req.body.logImagePublicId;
  miner.remarks.push(req.body.remarks);
  miner.testStatus = "Test Passed";
  miner.status = "Ready To Connect";
  await miner.save();
  res.status(200).json({ msg: "success" });
};

export const testingImageUpload = async (req, res) => {
  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.uploader.upload(file);
    res.status(200).json({
      msg: "success",
      url: response.secure_url,
      publicId: response.public_id,
    });
  } else {
    throw new BadRequestError("No files found");
  }
};
