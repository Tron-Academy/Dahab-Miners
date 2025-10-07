import { Router } from "express";
import {
  addRevenueByCategory,
  getAllRevenuesByCategory,
} from "../../controllers/miningApp/miningRevenueController.js";
import { validateAddRevenueInput } from "../../middleware/validationMiddleware.js";

const router = Router();
router.get("/", getAllRevenuesByCategory);
router.post("/", validateAddRevenueInput, addRevenueByCategory);

export default router;
