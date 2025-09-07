import { Router } from "express";
import {
  getAllMiningUsers,
  updateWalletBalance,
} from "../../controllers/miningApp/miningUserController.js";

const router = Router();

router.get("/", getAllMiningUsers);
router.patch("/wallet", updateWalletBalance);

export default router;
