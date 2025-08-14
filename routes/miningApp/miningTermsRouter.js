import { Router } from "express";
import { isSuperAdmin } from "../../middleware/authMiddleware.js";
import {
  addNewTerms,
  getAllTerms,
  getLatestTerms,
} from "../../controllers/miningApp/miningTermsController.js";

const router = Router();
router.post("/", isSuperAdmin, addNewTerms);
router.get("/", isSuperAdmin, getAllTerms);
router.get("/latest", getLatestTerms);

export default router;
