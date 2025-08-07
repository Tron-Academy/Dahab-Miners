import { Router } from "express";
import {
  addRevenueByCategory,
  getAllRevenuesByCategory,
} from "../../controllers/miningApp/miningRevenueController.js";

const router = Router();
router.get("/", getAllRevenuesByCategory);
router.post("/", addRevenueByCategory);

export default router;
