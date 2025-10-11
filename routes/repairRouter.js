import { Router } from "express";
import {
  addIssues,
  addNewRepairMiner,
  deleteRepairMiner,
  failTesting,
  generateReport,
  getAllRepairMiner,
  getAvailableParts,
  getAvailableQuantity,
  getReadyToConnectMiners,
  getRelatedMiner,
  getSingleMiner,
  passTesting,
  removeMiner,
  setPriority,
  testingImageUpload,
  updateRepairProcess,
  updateRepairStatus,
} from "../controllers/repairController.js";
import {
  validateRepairInput,
  validateRepairIssueInput,
  validateSetPriorityInput,
  validateTestPassInput,
  validateUpdateRepairProcessInput,
  validateUpdateRepairStatusInput,
} from "../middleware/validationMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
import { isSuperAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/add", validateRepairInput, addNewRepairMiner);
router.get("/", getAllRepairMiner);
router.get("/ready", getReadyToConnectMiners);
router.get("/related", getRelatedMiner);
router.get("/parts", getAvailableParts);
router.get("/qty", getAvailableQuantity);
router.get("/:id", getSingleMiner);
router.patch("/issues/:id", validateRepairIssueInput, addIssues);
router.patch(
  "/updateStatus",
  validateUpdateRepairProcessInput,
  updateRepairProcess
);
router.patch(
  "/updateStatus/:id",
  validateUpdateRepairStatusInput,
  updateRepairStatus
);
router.post("/image-upload", upload.single("log"), testingImageUpload);
router.patch("/test-pass/:id", validateTestPassInput, passTesting);
router.patch("/test-fail/:id", validateTestPassInput, failTesting);
router.patch("/generateReport/:id", generateReport);
router.patch("/set-priority/:id", validateSetPriorityInput, setPriority);
router.delete("/:id", removeMiner);
router.delete("/delete/:id", isSuperAdmin, deleteRepairMiner);

export default router;
