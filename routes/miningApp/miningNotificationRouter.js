import { Router } from "express";
import { isSuperAdmin } from "../../middleware/authMiddleware.js";
import {
  addNotification,
  clearUserNotifications,
  getAllNotifications,
} from "../../controllers/miningApp/miningNotifications.js";

const router = Router();

router.get("/", isSuperAdmin, getAllNotifications);
router.post("/", isSuperAdmin, addNotification);
router.delete("/", clearUserNotifications);

export default router;
