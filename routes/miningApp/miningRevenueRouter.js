import { Router } from "express";
import {
  addRevenue,
  getAllRevenues,
} from "../../controllers/miningApp/miningRevenueController.js";

const router = Router();
router.get("/", getAllRevenues);
router.post("/", addRevenue);

export default router;
