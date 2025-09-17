import { Router } from "express";
import {
  authenticateUser,
  isSuperAdmin,
} from "../../middleware/authMiddleware.js";
import {
  addNewPrivacyPolicy,
  addNewTerms,
  agreeTerms,
  getAllPrivacyPolicies,
  getAllTerms,
  getCurrentTermsAndPrivacy,
  getLatestPolicy,
  getLatestTerms,
} from "../../controllers/miningApp/miningTermsController.js";
import {
  validateaddPrivacyPolicy,
  validateaddTerms,
} from "../../middleware/validationMiddleware.js";

const router = Router();
router.post("/", authenticateUser, isSuperAdmin, validateaddTerms, addNewTerms);
router.get("/", authenticateUser, isSuperAdmin, getAllTerms);
router.get("/latest", getLatestTerms);
router.post(
  "/privacy",
  authenticateUser,
  isSuperAdmin,
  validateaddPrivacyPolicy,
  addNewPrivacyPolicy
);
router.get("/privacy", authenticateUser, isSuperAdmin, getAllPrivacyPolicies);
router.get("/privacy/latest", getLatestPolicy);
router.get("/terms&privacy", authenticateUser, getCurrentTermsAndPrivacy);
router.patch("/agree", authenticateUser, agreeTerms);

export default router;
