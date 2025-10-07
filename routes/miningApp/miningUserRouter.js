import { Router } from "express";
import {
  getAllMiningUsers,
  updateWalletBalance,
} from "../../controllers/miningApp/miningUserController.js";
import { validateUpdateUserWallet } from "../../middleware/validationMiddleware.js";

const router = Router();

router.get("/", getAllMiningUsers);
router.patch("/wallet", validateUpdateUserWallet, updateWalletBalance);

export default router;
