import { Router } from "express";
import { getBtcData } from "../controllers/extraController.js";

const router = Router();

router.get("/btc", getBtcData);

export default router;
