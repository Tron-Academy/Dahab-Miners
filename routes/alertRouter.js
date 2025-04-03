import { Router } from "express";
import { isSuperAdmin } from "../middleware/authMiddleware.js";
import {
  clearAlert,
  getAllAlerts,
  totalAlerts,
  updateRestock,
} from "../controllers/alertController.js";

const router = Router();

router.get("/", isSuperAdmin, getAllAlerts);
router.get("/count", isSuperAdmin, totalAlerts);
router.patch("/", isSuperAdmin, updateRestock);
router.delete("/:id", isSuperAdmin, clearAlert);

export default router;
