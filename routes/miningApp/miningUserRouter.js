import { Router } from "express";
import {
  getAllMiningUsers,
  getUsersMiners,
  updateWalletBalance,
} from "../../controllers/miningApp/miningUserController.js";
import { validateUpdateUserWallet } from "../../middleware/validationMiddleware.js";

const router = Router();

router.get("/", getAllMiningUsers);
router.patch("/wallet", validateUpdateUserWallet, updateWalletBalance);
router.get("/owned", getUsersMiners);

export default router;
