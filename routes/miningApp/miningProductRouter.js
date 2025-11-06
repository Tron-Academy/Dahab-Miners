import { Router } from "express";
import {
  addNewMiner,
  addToCart,
  editSingleMiner,
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
  validateAddMiningMiner,
  validateAddRemoveCartInput,
  validateUpdateCartInput,
} from "../../middleware/validationMiddleware.js";
import upload from "../../middleware/multerMiddleware.js";

const router = Router();

router.get("/miners", getAllMiners);
router.post(
  "/miners",
  upload.single("image"),
  validateAddMiningMiner,
  addNewMiner
);
router.patch(
  "/miners/:id",
  upload.single("image"),
  validateAddMiningMiner,
  editSingleMiner
);
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
