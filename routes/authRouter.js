import { Router } from "express";
import {
  validateForgotPasswordInput,
  validateLoginInput,
  validateRegisterInput,
  validateResetPasswordInput,
} from "../middleware/validationMiddleware.js";
import {
  forgotPassword,
  getUserInfo,
  loginAdmin,
  logoutUser,
  registerAdmin,
  resetPassword,
} from "../controllers/authController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", validateRegisterInput, registerAdmin);
router.post("/login", validateLoginInput, loginAdmin);
router.post("/logout", logoutUser);
router.get("/user", authenticateUser, getUserInfo);
router.post("/forgot-password", validateForgotPasswordInput, forgotPassword);
router.post("/reset-password", validateResetPasswordInput, resetPassword);

export default router;
