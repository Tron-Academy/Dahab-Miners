import { Router } from "express";
import { isSuperAdmin } from "../../middleware/authMiddleware.js";
import {
  addNotification,
  clearUserNotifications,
  getAllNotifications,
  getUserNotifications,
} from "../../controllers/miningApp/miningNotifications.js";

const router = Router();

router.get("/", isSuperAdmin, getAllNotifications);
router.get("/user", getUserNotifications);
router.post("/", isSuperAdmin, addNotification);
router.delete("/", clearUserNotifications);

export default router;
