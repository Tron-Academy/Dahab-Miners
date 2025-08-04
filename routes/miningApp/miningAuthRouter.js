import {
  disable2FA,
  forgotPassword,
  getMiningUserInfo,
  loginVerification,
  miningLogin,
  miningLogout,
  miningRegister,
  resetPassword,
  send2FaCodeQR,
  updateProfile,
  verify2FA,
  verifyAccount,
  verifyCode,
  verifyPasswordResetCode,
  withdrawalVerification,
} from "../../controllers/miningApp/miningAuthController.js";
import { authenticateUser } from "../../middleware/authMiddleware.js";
import { Router } from "express";
import {
  validateMiningUserLogin,
  validateMiningUserRegister,
  validateMiningUSerUpdateProfile,
} from "../../middleware/validationMiddleware.js";

const router = Router();

router.post("/register", validateMiningUserRegister, miningRegister);
router.post("/login", validateMiningUserLogin, miningLogin);
router.post("/logout", miningLogout);
router.get("/userInfo", authenticateUser, getMiningUserInfo);
router.post("/verify", verifyCode);
router.post("/verify-account", verifyAccount);
router.post("/forgot-password", forgotPassword);
router.post("/verify-passwordReset", verifyPasswordResetCode);
router.post("/reset-password", resetPassword);
router.get("/send2FAQR", authenticateUser, send2FaCodeQR);
router.post("/verify2FA", authenticateUser, verify2FA);
router.post("/disable2FA", authenticateUser, disable2FA);
router.post("/login2FA", loginVerification);
router.post("/withdrawVerify", authenticateUser, withdrawalVerification);
router.patch(
  "/update-profile",
  authenticateUser,
  validateMiningUSerUpdateProfile,
  updateProfile
);

export default router;
