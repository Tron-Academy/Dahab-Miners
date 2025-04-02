import { Router } from "express";
import { isSuperAdmin } from "../middleware/authMiddleware.js";
import { getAllAlerts, totalAlerts } from "../controllers/alertController.js";

const router = Router();

router.get("/", isSuperAdmin, getAllAlerts);
router.get("/count", isSuperAdmin, totalAlerts);

export default router;
