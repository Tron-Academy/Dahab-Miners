import {
  deleteAccount,
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
  validateMiningAccountVerify,
  validateMiningLoginVerify,
  validateMiningUserLogin,
  validateMiningUserRegister,
  validateMiningUSerUpdateProfile,
  validateMiningVerifyCode,
} from "../../middleware/validationMiddleware.js";
import { versionGuard } from "../../middleware/versionCheckMiddleware.js";

const router = Router();

router.post("/register", validateMiningUserRegister, miningRegister);
router.post("/login", validateMiningUserLogin, miningLogin);
router.post("/logout", miningLogout);
router.get("/userInfo", authenticateUser, versionGuard, getMiningUserInfo);
router.post("/verify", validateMiningLoginVerify, verifyCode);
router.post("/verify-account", validateMiningAccountVerify, verifyAccount);
router.post("/forgot-password", validateMiningAccountVerify, forgotPassword);
router.post(
  "/verify-passwordReset",
  validateMiningLoginVerify,
  verifyPasswordResetCode
);
router.post("/reset-password", validateMiningUserLogin, resetPassword);
router.get("/send2FAQR", authenticateUser, send2FaCodeQR);
router.post(
  "/verify2FA",
  authenticateUser,
  validateMiningVerifyCode,
  verify2FA
);
router.post("/disable2FA", authenticateUser, disable2FA);
router.post("/login2FA", validateMiningLoginVerify, loginVerification);
router.post(
  "/withdrawVerify",
  authenticateUser,
  validateMiningVerifyCode,
  withdrawalVerification
);
router.patch(
  "/update-profile",
  authenticateUser,
  validateMiningUSerUpdateProfile,
  updateProfile
);
router.delete("/delete-account", authenticateUser, deleteAccount);

export default router;
