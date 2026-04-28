import { Router } from "express";
import { isSuperAdmin } from "../middleware/authMiddleware.js";
import {
  addIssueType,
  editIssueType,
  getAllIssues,
  getAllIssueTypes,
  getIssueMessages,
  reportIssue,
  sendResponseToIssue,
  updateIssueStatus,
} from "../controllers/AdminIssueController.js";
import {
  validateAddIssueType,
  validateEditIssueType,
  validateReportIssue,
  validateUpdateIssueStatus,
} from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/type", isSuperAdmin, validateAddIssueType, addIssueType);
router.get("/type", getAllIssueTypes);
router.patch("/type", isSuperAdmin, validateEditIssueType, editIssueType);
router.post("/", validateReportIssue, reportIssue);
router.get("/", isSuperAdmin, getAllIssues);
router.get("/messages/:id", isSuperAdmin, getIssueMessages);
router.post("/send-response", isSuperAdmin, sendResponseToIssue);
router.patch(
  "/update-status/:id",
  isSuperAdmin,
  validateUpdateIssueStatus,
  updateIssueStatus,
);

export default router;
