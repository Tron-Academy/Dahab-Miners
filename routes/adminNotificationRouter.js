import { Router } from "express";
import {
  getAllNotifications,
  getAllUnreadNotification,
} from "../controllers/adminNotifications.js";

const router = Router();

router.get("/unread", getAllUnreadNotification);
router.get("/all", getAllNotifications);

export default router;
