import { Router } from "express";
import {
  addNewRepairMiner,
  getAllRepairMiner,
  getRelatedMiner,
} from "../controllers/repairController.js";
import { validateRepairInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/add", validateRepairInput, addNewRepairMiner);
router.get("/", getAllRepairMiner);
router.get("/related", getRelatedMiner);

export default router;
