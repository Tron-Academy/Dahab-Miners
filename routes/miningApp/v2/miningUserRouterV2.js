import { Router } from "express";
import {
  getProfitModeTransactions,
  getUserInfoV2,
  walletTransactions,
} from "../../../controllers/miningApp/v2/miningUserControllerV2.js";

const router = Router();

router.get("/info", getUserInfoV2);
router.get("/profit-transactions", getProfitModeTransactions);
router.get("/wallet-transactions", walletTransactions);

export default router;
