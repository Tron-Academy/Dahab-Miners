import { Router } from "express";
import {
  AddMinerData,
  editMinerData,
  issueReport,
  recieveMessageStatus,
  sendReminder,
} from "../../controllers/intermine/intermineController.js";
import { validateRecieveStatus } from "../../middleware/validationMiddleware.js";

const router = Router();

router.post("/addMiner", AddMinerData);
router.patch("/editMiner", editMinerData);
router.patch("/report-issue", issueReport);
router.patch("/reminder", sendReminder);
router.patch("/update-status", validateRecieveStatus, recieveMessageStatus);

export default router;
