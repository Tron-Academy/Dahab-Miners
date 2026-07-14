import { Router } from "express";
import {
  DownloadCSV,
  getAllDatas,
  getDataDropdown,
  getSingleData,
} from "../controllers/adminDataController.js";
import {
  getAllMinersWithoutWarranty,
  getAllWarranties,
  getSingleWarranty,
} from "../controllers/adminWarrantyController.js";
import {
  getAllMinerModels,
  getAllMinerModelsForDropdown,
  getSingleMinerModel,
} from "../controllers/minerModelController.js";
import {
  getAllMinersInFarm,
  getAllMiningFarms,
  getMiningFarmsDropdown,
} from "../controllers/miningFarmController.js";
import {
  validateAddIssueType,
  validateEditIssueType,
  validateReportIssue,
  validateUpdateIssueStatus,
} from "../middleware/validationMiddleware.js";
import {
  addIssueType,
  editIssueType,
  getAllIssues,
  getAllIssueTypes,
  getIssueMessages,
  reportIssue,
  sendResponseToIssue,
  updateIssueStatus,
} from "../controllers/AdminIssueController.js";

const router = Router();

router.get("/data/getData", getAllDatas);
router.get("/data/download-csv", DownloadCSV);
router.get("/data/dropdown", getDataDropdown);
router.get("/data/getData/:id", getSingleData);

router.get("/warranty/", getAllWarranties);
router.get("/warranty/no-warranty", getAllMinersWithoutWarranty);
router.get("/warranty/:id", getSingleWarranty);

router.get("/miner-models/", getAllMinerModels);
router.get("/miner-models/dropdown", getAllMinerModelsForDropdown);
router.get("/miner-models/:id", getSingleMinerModel);

router.get("/mining-farms/", getAllMiningFarms);
router.get("/mining-farms/dropdown", getMiningFarmsDropdown);
router.get("/mining-farms/miners/:id", getAllMinersInFarm);

router.post("/issues/type", validateAddIssueType, addIssueType);
router.get("/issues/type", getAllIssueTypes);
router.patch("/issues/type", validateEditIssueType, editIssueType);
router.post("/issues/", validateReportIssue, reportIssue);
router.get("/issues/", getAllIssues);
router.get("/issues/messages/:id", getIssueMessages);
router.post("/issues/send-response", sendResponseToIssue);
router.patch(
  "/issues/update-status/:id",
  validateUpdateIssueStatus,
  updateIssueStatus,
);

export default router;
