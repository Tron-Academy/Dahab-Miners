import { Router } from "express";
import { isSuperAdmin } from "../../middleware/authMiddleware.js";
import {
  addNewSats,
  getSats,
} from "../../controllers/miningApp/miningSatsController.js";

const router = Router();

router.post("/", isSuperAdmin, addNewSats);
router.get("/", getSats);

export default router;
