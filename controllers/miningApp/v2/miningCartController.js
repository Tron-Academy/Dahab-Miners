import { NotFoundError } from "../../../errors/customErrors.js";
import MiningUser from "../../../models/miningApp/MiningUser.js";

//Cart Operations
export const getCartItems = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await MiningUser.findById(userId)
      .select("cartItems")
      .lean()
      .populate("cartItems.itemId", "name image price");
    if (!user) throw new NotFoundError("No user found");
    const cartItems = user.cartItems;
    res.status(200).json(cartItems);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || error.msg });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { cartId, qty } = req.body;
    const user = await MiningUser.findById(userId).select("cartItems");
    if (!user) throw new NotFoundError("No user found");
    const item = user.cartItems.find(
      (x) => x._id.toString() === cartId.toString()
    );
    item.qty = qty;
    await user.save();
    res.status(200).json({ msg: "success" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || error.msg });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId } = req.body;
    const user = await MiningUser.findById(userId).select("cartItems");
    if (!user) throw new NotFoundError("No user found");
    user.cartItems.push({ itemId: productId, qty: 1 });
    await user.save();
    res.status(200).json({ msg: "success" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || error.msg });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const user = await MiningUser.findById(userId).select("cartItems");
    if (!user) throw new NotFoundError("No user found");
    user.cartItems = user.cartItems.filter(
      (item) => item._id.toString() !== id.toString()
    );
    await user.save();
    res.status(200).json({ msg: "success" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || error.msg });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await MiningUser.findById(userId).select("cartItems");
    if (!user) throw new NotFoundError("No user found");
    user.cartItems = [];
    await user.save();
    res.status(200).json({ msg: "success" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || error.msg });
  }
};
