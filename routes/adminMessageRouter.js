import { Router } from "express";
import {
  GetMessageGroups,
  sendMessage,
} from "../controllers/adminMessageController.js";
import { validateSendMessage } from "../middleware/validationMiddleware.js";

const router = Router();

router.get("/message-groups", GetMessageGroups);
router.post("/send", validateSendMessage, sendMessage);

export default router;
