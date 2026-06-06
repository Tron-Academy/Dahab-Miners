import { Router } from "express";
import {
  AddMinerData,
  editMinerData,
  issueReport,
  poolChange,
  recieveMessageStatus,
  sendReminder,
  updateIssueStatusFromIntermine,
} from "../../controllers/intermine/intermineController.js";
import { validateRecieveStatus } from "../../middleware/validationMiddleware.js";

const router = Router();

router.post("/addMiner", AddMinerData);
router.patch("/editMiner", editMinerData);
router.patch("/report-issue", issueReport);
router.patch("/pool-change", poolChange);
router.patch("/reminder", sendReminder);
router.patch("/update-status", updateIssueStatusFromIntermine);

export default router;
