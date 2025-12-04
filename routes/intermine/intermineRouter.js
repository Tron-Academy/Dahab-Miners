import { Router } from "express";
import {
  AddMinerData,
  editMinerData,
  issueReport,
  sendReminder,
} from "../../controllers/intermine/intermineController.js";

const router = Router();

router.post("/addMiner", AddMinerData);
router.patch("/editMiner", editMinerData);
router.patch("/report-issue", issueReport);
router.patch("/reminder", sendReminder);

export default router;
