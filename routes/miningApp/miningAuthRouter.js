import {
  addToCart,
  getAllMiners,
  getCartItems,
  getMiningUserInfo,
  getSingleMiner,
  miningLogin,
  miningLogout,
  miningRegister,
  purchaseMiner,
  removeFromCart,
  updateCartItem,
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

export default router;
