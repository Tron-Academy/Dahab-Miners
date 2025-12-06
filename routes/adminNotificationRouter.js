import { Router } from "express";
import {
  getAllNotifications,
  getAllUnreadNotification,
  markNotificationRead,
} from "../controllers/adminNotifications.js";
import { validateMarkNotificationRead } from "../middleware/validationMiddleware.js";

const router = Router();

router.get("/unread", getAllUnreadNotification);
router.get("/all", getAllNotifications);
router.patch("/read", validateMarkNotificationRead, markNotificationRead);

export default router;
