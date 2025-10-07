import { Router } from "express";
import {
  addToCart,
  emptyCart,
  getAllMiners,
  getCartItems,
  getOwnedMiners,
  getSingleMiner,
  purchaseMiner,
  removeFromCart,
  selectPayoutMode,
  updateCartItem,
} from "../../controllers/miningApp/miningProductController.js";
import {
  validateAddRemoveCartInput,
  validateUpdateCartInput,
} from "../../middleware/validationMiddleware.js";

const router = Router();

router.get("/miners", getAllMiners);
router.get("/miners/:id", getSingleMiner);
router.get("/cartItems", getCartItems);
router.post("/addToCart", validateAddRemoveCartInput, addToCart);
router.post("/removeItem", validateAddRemoveCartInput, removeFromCart);
router.post("/updateCart", validateUpdateCartInput, updateCartItem);
// router.post("/purchase", purchaseMiner);
router.get("/ownedMiners", getOwnedMiners);
router.post("/payoutMode", selectPayoutMode);
router.patch("/empty-cart", emptyCart);

export default router;
