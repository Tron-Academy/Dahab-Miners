import { Router } from "express";
import {
  addToCart,
  clearCart,
  getCartItems,
  removeCartItem,
  updateCart,
} from "../../../controllers/miningApp/v2/miningCartController.js";
import {
  validateAddToCart,
  validateUpdateCart,
} from "../../../middleware/validationMiddleware.js";

const router = Router();

router.get("/", getCartItems);
router.patch("/", validateUpdateCart, updateCart);
router.post("/", validateAddToCart, addToCart);
router.delete("/", clearCart);
router.delete("/:id", removeCartItem);

export default router;
