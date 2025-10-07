import { Router } from "express";
import { isAdmin, isSuperAdmin } from "../../middleware/authMiddleware.js";
import {
  createWithdrawalIntent,
  getAllPayouts,
  getUserPayouts,
  makeWithdrawal,
  updatePayoutStatus,
} from "../../controllers/miningApp/miningPayoutController.js";
import {
  validateMakeWithdrawal,
  validateUpdatePayoutStatus,
} from "../../middleware/validationMiddleware.js";

const router = Router();

router.get("/", isAdmin, isSuperAdmin, getAllPayouts);
router.post("/", validateMakeWithdrawal, makeWithdrawal);
router.get("/user", getUserPayouts);
router.patch(
  "/",
  isAdmin,
  isSuperAdmin,
  validateUpdatePayoutStatus,
  updatePayoutStatus
);
router.post("/withdraw-intent", createWithdrawalIntent);

export default router;
