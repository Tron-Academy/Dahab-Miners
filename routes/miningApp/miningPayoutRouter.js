import { Router } from "express";
import { isAdmin, isSuperAdmin } from "../../middleware/authMiddleware.js";
import {
  getAllPayouts,
  getUserPayouts,
  makeWithdrawal,
  updatePayoutStatus,
} from "../../controllers/miningApp/miningPayoutController.js";

const router = Router();

router.get("/", isAdmin, isSuperAdmin, getAllPayouts);
router.post("/", makeWithdrawal);
router.get("/user", getUserPayouts);
router.patch("/", isAdmin, isSuperAdmin, updatePayoutStatus);

export default router;
