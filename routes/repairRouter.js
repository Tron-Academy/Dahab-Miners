import { Router } from "express";
import {
  addIssues,
  addNewRepairMiner,
  getAllRepairMiner,
  getRelatedMiner,
  getSingleMiner,
} from "../controllers/repairController.js";
import {
  validateRepairInput,
  validateRepairIssueInput,
} from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/add", validateRepairInput, addNewRepairMiner);
router.get("/", getAllRepairMiner);
router.get("/related", getRelatedMiner);
router.get("/:id", getSingleMiner);
router.patch("/issues/:id", validateRepairIssueInput, addIssues);

export default router;
