import { Router } from "express";
import { isSuperAdmin } from "../middleware/authMiddleware.js";
import {
  addIssueType,
  editIssueType,
  getAllIssueTypes,
} from "../controllers/AdminIssueController.js";
import {
  validateAddIssueType,
  validateEditIssueType,
} from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/type", isSuperAdmin, validateAddIssueType, addIssueType);
router.get("/type", getAllIssueTypes);
router.patch("/type", isSuperAdmin, validateEditIssueType, editIssueType);

export default router;
