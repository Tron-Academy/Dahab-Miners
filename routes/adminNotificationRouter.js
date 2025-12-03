import { Router } from "express";
import { getAllUnreadNotification } from "../controllers/adminNotifications.js";

const router = Router();

router.get("/unread", getAllUnreadNotification);

export default router;
