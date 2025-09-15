import { Router } from "express";
import { isSuperAdmin } from "../../middleware/authMiddleware.js";
import {
  addA1246Uptime,
  addNewSats,
  getA1246Uptime,
  getSats,
} from "../../controllers/miningApp/miningSatsAndUptimeController.js";

const router = Router();

router.post("/", isSuperAdmin, addNewSats);
router.get("/", getSats);
router.post("/uptime", isSuperAdmin, addA1246Uptime);
router.get("/uptime", getA1246Uptime);

export default router;
