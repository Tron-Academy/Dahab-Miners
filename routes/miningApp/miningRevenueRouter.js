import { Router } from "express";
import {
  addRevenueByCategory,
  getAllMiningRewardsForUser,
  getAllRevenuesByCategory,
} from "../../controllers/miningApp/miningRevenueController.js";
import { validateAddRevenueInput } from "../../middleware/validationMiddleware.js";
import {
  authenticateUser,
  isAdmin,
  isSuperAdmin,
} from "../../middleware/authMiddleware.js";

const router = Router();
router.get(
  "/",
  authenticateUser,
  isAdmin,
  isSuperAdmin,
  getAllRevenuesByCategory
);
router.post(
  "/",
  authenticateUser,
  isAdmin,
  isSuperAdmin,
  validateAddRevenueInput,
  addRevenueByCategory
);
router.get("/user", authenticateUser, getAllMiningRewardsForUser);

export default router;
