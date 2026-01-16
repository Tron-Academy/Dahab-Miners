import { Router } from "express";
import {
  getAllMinersForDropdown,
  getAllMiningUsers,
  getUsersMiners,
  settleNegativeWallet,
  updateWalletBalance,
} from "../../controllers/miningApp/miningUserController.js";
import { validateUpdateUserWallet } from "../../middleware/validationMiddleware.js";

const router = Router();

router.get("/", getAllMiningUsers);
router.patch("/wallet", validateUpdateUserWallet, updateWalletBalance);
router.get("/owned", getUsersMiners);
router.get("/miner-dropdown", getAllMinersForDropdown);
router.patch("/deduct", settleNegativeWallet);

export default router;
