import { Router } from "express";
import {
  addRevenueA1246,
  addRevenueS19KPro,
  getAllA1246Revenues,
  getAllS19KRevenues,
} from "../../controllers/miningApp/miningRevenueController.js";

const router = Router();
router.get("/", getAllA1246Revenues);
router.get("/S19KPro", getAllS19KRevenues);
router.post("/", addRevenueA1246);
router.post("/S19KPro", addRevenueS19KPro);

export default router;
