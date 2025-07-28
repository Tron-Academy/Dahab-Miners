import { Router } from "express";
import {
  addToCart,
  getAllMiners,
  getCartItems,
  getOwnedMiners,
  getSingleMiner,
  purchaseMiner,
  removeFromCart,
  selectPayoutMode,
  updateCartItem,
} from "../../controllers/miningApp/miningProductController.js";

const router = Router();

router.get("/miners", getAllMiners);
router.get("/miners/:id", getSingleMiner);
router.get("/cartItems", getCartItems);
router.post("/addToCart", addToCart);
router.post("/removeItem", removeFromCart);
router.post("/updateCart", updateCartItem);
router.post("/purchase", purchaseMiner);
router.get("/ownedMiners", getOwnedMiners);
router.post("/payoutMode", selectPayoutMode);

export default router;
