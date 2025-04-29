import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { formatImage } from "../middleware/multerMiddleware.js";
import Data from "../models/DataModel.js";
import Repair from "../models/RepairModel.js";
import { v2 as cloudinary } from "cloudinary";
import PDFDocument from "pdfkit";
import Inventory from "../models/InventoryModel.js";
import Alert from "../models/AlertModel.js";

export const addNewRepairMiner = async (req, res) => {
  const { serialNumber, owner, macAddress, workerId, nowRunning } = req.body;
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
  const { search } = req.query;
  let queryObject = {};
  let conditions = [];
  if (search && search !== "") {
    conditions.push({
      $or: [
        // { macAddress: { $regex: search, $options: "i" } },
        { serialNumber: { $regex: search, $options: "i" } },
        { owner: { $regex: search, $options: "i" } },
        // { nowRunning: { $regex: search, $options: "i" } },
        // { workerId: { $regex: search, $options: "i" } },
      ],
    });
  }
  if (conditions.length > 0) {
    queryObject = { $and: conditions };
  }
  const miners = await Repair.find(queryObject).sort("priority");
  if (!miners) throw new NotFoundError("No miners has been found");
  res.status(200).json(miners);
};

export const getReadyToConnectMiners = async (req, res) => {
  const miners = await Repair.find({ status: "Ready To Connect" });
  if (!miners) throw new NotFoundError("No miners found");
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
  const updatedIssues = issues.map((issue) => ({
    ...issue,
    issueUpdatedOn: new Date(),
  }));

  const miner = await Repair.findById(id);
  if (!miner) throw new NotFoundError("No miner found");
  miner.problems = updatedIssues;
  miner.status = "Need Repair";
  await miner.save();
  for (const issue of updatedIssues) {
    if (issue.component !== "No Components needed") {
      const issueName = issue.component; // Extract actual item name
      const item = await Inventory.findOne({ itemName: issueName });

      if (item) {
        item.quantity = Math.max(0, item.quantity - issue.qty); // Prevent negative quantity
        await item.save();
      }
      if (item.quantity === 0) {
        const alert = new Alert({
          alertItem: issue.component,
          currentStock: "0",
          message: "Stock level critical. Need urgent Restock",
          status: "Pending",
        });
        await alert.save();
      }
    }
  }
  res.status(200).json({ msg: "success" });
};

export const updateRepairStatus = async (req, res) => {
  const { id } = req.params;
  const {
    problemId,
    repairStatus,
    extraComponent,
    extraQty,
    repairTechnician,
    repairRemark,
  } = req.body;
  const miner = await Repair.findById(id);
  if (!miner) throw new NotFoundError("No miner found");
  const problemsArray = miner.problems;
  const selectedProblem = problemsArray.find(
    (item) => item._id.toString() === problemId.toString()
  );
  if (!selectedProblem)
    throw new NotFoundError("Unable to find the selected problem");
  selectedProblem.issueStatus = repairStatus;
  selectedProblem.additionalComponent = extraComponent;
  selectedProblem.additionalQty = extraQty;
  selectedProblem.repairTechnician = repairTechnician;
  selectedProblem.repairRemark = repairRemark;
  selectedProblem.repairUpdatedOn = new Date();
  const selectedIndex = problemsArray.findIndex(
    (item) => item._id.toString() === problemId.toString()
  );
  problemsArray[selectedIndex] = selectedProblem;
  miner.problems = problemsArray;
  await miner.save();
  if (extraComponent !== "No Components needed") {
    const item = await Inventory.findOne({ itemName: extraComponent });
    if (item) {
      item.quantity = Math.max(0, item.quantity - extraQty); // Prevent negative quantity
      await item.save();
    }
    if (item.quantity === 0) {
      const alert = new Alert({
        alertItem: extraComponent,
        currentStock: "0",
        message: "Stock level critical. Need urgent Restock",
        status: "Pending",
      });
      await alert.save();
    }
  }
  if (repairStatus === "Component Needed") {
    const item = await Inventory.findOne({
      itemName: selectedProblem.component,
    });
    const alert = new Alert({
      alertItem: item.itemName || selectedProblem.component,
      currentStock: item.quantity,
      message: "Need for repair process. Repair Pending",
      status: "Pending",
    });
    await alert.save();
  }
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
  miner.remarks = req.body.remarks;
  miner.testStatus = "Test Passed";
  miner.status = "Ready To Connect";
  miner.testTechnician = req.body.testTechnician;
  miner.testUpdatedOn = new Date();
  const report = {
    problemList: miner.problems,
    successImage: miner.successImgUrl,
    failureImage: miner.failImgUrl,
    remarks: miner.remarks,
    testTechnician: miner.testTechnician,
    testUpdatedOn: miner.testUpdatedOn,
  };
  miner.report.push(report);
  await miner.save();
  res.status(200).json({ msg: "success" });
};

export const failTesting = async (req, res) => {
  const { id } = req.params;
  const miner = await Repair.findById(id);
  if (!miner) throw new NotFoundError("No miner found");
  miner.failImgUrl = req.body.logImageUrl;
  miner.failImgPublicId = req.body.logImagePublicId;
  miner.remarks = req.body.remarks;
  miner.testTechnician = req.body.testTechnician;
  miner.testUpdatedOn = new Date();
  miner.testStatus = "Test Failed";
  miner.status = "Restart Repair";
  const report = {
    problemList: miner.problems,
    successImage: miner.successImgUrl,
    failureImage: miner.failImgUrl,
    remarks: miner.remarks,
    testTechnician: miner.testTechnician,
    testUpdatedOn: miner.testUpdatedOn,
  };
  miner.report.push(report);
  miner.problems = [];
  miner.successImgUrl = "";
  miner.failImgUrl = "";
  miner.remarks = "";
  miner.failHistory = true;
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

export const generateReport = async (req, res) => {
  const { id } = req.params;
  const miner = await Repair.findById(id);
  if (!miner) throw new NotFoundError("No miner found");
  miner.reportDownloaded = true;
  await miner.save();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=repair-${id}.pdf`);
  const doc = new PDFDocument();
  doc.pipe(res);
  doc.fontSize(20).text("Repair Report", { align: "center" }).moveDown();
  doc.fontSize(12).text(`Serial Number: ${miner.serialNumber}`);
  doc.text(`MAC Address: ${miner.macAddress}`);
  doc.text(`Worker ID: ${miner.workerId}`);
  doc.text(`Owner: ${miner.owner}`);
  doc.text(`Status: ${miner.status}`);
  doc.text(`Test Status: ${miner.testStatus}`);
  doc.text(`Now Running for: ${miner.nowRunning}`);
  doc.text(`Repair Started on: ${miner.createdAt.toString()}`).moveDown();
  doc.fontSize(14).text("Problems:").moveDown();
  miner.report.forEach((item, index) => {
    item.problemList.forEach((problem, i) => {
      doc
        .fontSize(13)
        .text(`ProblemList ${index + 1}`)
        .moveDown();
      doc.fontSize(12).text(`Problem: ${problem.problem}`);
      doc.fontSize(12).text(`Component: ${problem.component}`);
      doc.fontSize(12).text(`Qty: ${problem.qty}`);
      doc
        .fontSize(12)
        .text(`Additional Component: ${problem.additionalComponent}`);

      doc.fontSize(12).text(`Additional Qty: ${problem.additionalQty}`);

      doc
        .fontSize(12)
        .text(`Issue Identified by: ${problem.identifyTechnician}`);

      doc
        .fontSize(12)
        .text(`Issue Identified On: ${problem.issueUpdatedOn.toString()}`);

      doc.fontSize(12).text(`Repair Updated by: ${problem.repairTechnician}`);
      doc
        .fontSize(12)
        .text(`Repair Updated on: ${problem.repairUpdatedOn.toString()}`);
      doc
        .fontSize(12)
        .text(`Remarks during Identification: ${problem.issueRemark}`);
      doc.fontSize(12).text(`Remarks during Repair: ${problem.repairRemark}`);
      doc
        .fontSize(12)
        .text(
          `Status: ${problem.issueStatus} on ${problem.updatedAt.toString()}`
        )
        .moveDown();
    });
    doc.fontSize(12).text(`failureLog : ${item.failureImage}`).moveDown();
    doc.fontSize(12).text(`SuccessLog : ${item.successImage}`).moveDown();
    doc
      .fontSize(12)
      .text(`Test Performed by : ${item.testTechnician}`)
      .moveDown();
    doc
      .fontSize(12)
      .text(`Test Performed On : ${item.testUpdatedOn.toString()}`)
      .moveDown();
    doc.fontSize(12).text(`Remarks : ${item.remarks}`).moveDown();
  });
  doc.end();
};

export const removeMiner = async (req, res) => {
  const miner = await Repair.findById(req.params.id);
  if (!miner) throw new NotFoundError("No miner found");
  if (miner.reportDownloaded) {
    await Repair.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "success" });
  } else {
    throw new BadRequestError("Please Download Report first");
  }
};

export const getAvailableParts = async (req, res) => {
  const parts = await Inventory.find({ category: "Repair Components" });
  if (!parts) throw new NotFoundError("No parts found");
  res.status(200).json(parts);
};

export const getAvailableQuantity = async (req, res) => {
  const qty = await Inventory.findOne({ itemName: req.query.component });
  if (!qty) throw new NotFoundError("No Item found");
  res.status(200).json(qty.quantity);
};

export const setPriority = async (req, res) => {
  const item = await Repair.findById(req.params.id);
  if (!item) throw new NotFoundError("No Miner found");
  item.priority = req.body.priority;
  await item.save();
  res.status(200).json({ msg: "success" });
};
