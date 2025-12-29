import { Router } from "express";
import {
  addRevenueByCategory,
  getAllMiningRewardsForUser,
  getAllRevenuesByCategory,
} from "../../controllers/miningApp/miningRevenueController.js";
import { validateAddRevenueInput } from "../../middleware/validationMiddleware.js";

const router = Router();
router.get("/", getAllRevenuesByCategory);
router.post("/", validateAddRevenueInput, addRevenueByCategory);
router.get("/user", getAllMiningRewardsForUser);

export default router;
