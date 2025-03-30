import { Router } from "express";
import {
  addIssues,
  addNewRepairMiner,
  getAllRepairMiner,
  getRelatedMiner,
  getSingleMiner,
  passTesting,
  testingImageUpload,
  updateRepairProcess,
  updateRepairStatus,
} from "../controllers/repairController.js";
import {
  validateRepairInput,
  validateRepairIssueInput,
  validateTestPassInput,
  validateUpdateRepairProcessInput,
  validateUpdateRepairStatusInput,
} from "../middleware/validationMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const router = Router();

router.post("/add", validateRepairInput, addNewRepairMiner);
router.get("/", getAllRepairMiner);
router.get("/related", getRelatedMiner);
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

export default router;
