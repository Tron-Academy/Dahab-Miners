import {
  forgotPassword,
  getMiningUserInfo,
  miningLogin,
  miningLogout,
  miningRegister,
  verifyAccount,
  verifyCode,
} from "../../controllers/miningApp/miningAuthController.js";
import { authenticateUser } from "../../middleware/authMiddleware.js";
import { Router } from "express";
import {
  validateMiningUserLogin,
  validateMiningUserRegister,
} from "../../middleware/validationMiddleware.js";

const router = Router();

router.post("/register", validateMiningUserRegister, miningRegister);
router.post("/login", validateMiningUserLogin, miningLogin);
router.post("/logout", miningLogout);
router.get("/userInfo", authenticateUser, getMiningUserInfo);
router.post("/verify", verifyCode);
router.post("/verify-account", verifyAccount);
router.post("/forgot-password", forgotPassword);

export default router;
