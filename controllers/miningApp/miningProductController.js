import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../../errors/customErrors.js";
import MiningProduct from "../../models/miningApp/MiningProduct.js";
import MiningUser from "../../models/miningApp/MiningUser.js";
import { v4 as uuid4 } from "uuid";

export const getAllMiners = async (req, res) => {
  const miners = await MiningProduct.find({ isTest: { $ne: true } }).sort({
    price: 1,
  });
  if (miners.length < 1) throw new NotFoundError("No Miners Found");
  res.status(200).json(miners);
};

export const getSingleMiner = async (req, res) => {
  const miner = await MiningProduct.findById(req.params.id);
  if (!miner) throw new NotFoundError("No miner found");
  res.status(200).json(miner);
};

export const getCartItems = async (req, res) => {
  const user = await MiningUser.findById(req.user.userId).populate(
    "cartItems.itemId"
  );
  if (!user) throw new NotFoundError("No user has been found");
  const items = user.cartItems;
  res.status(200).json(items);
};

export const addToCart = async (req, res) => {
  const { itemId } = req.body;
  const user = await MiningUser.findById(req.user.userId);
  if (!user) throw new NotFoundError("No user has been found");
  const alreadyExist = user.cartItems.find(
    (item) => item.itemId?.toString() === itemId.toString()
  );
  if (alreadyExist) throw new BadRequestError("Item Already on Cart");
  user.cartItems.push({ itemId: itemId, qty: 1 });
  await user.save();
  res.status(200).json({ msg: "Added to cart successfully" });
};

export const removeFromCart = async (req, res) => {
  const { itemId } = req.body;
  const user = await MiningUser.findById(req.user.userId);
  if (!user) throw new NotFoundError("No user has been found");
  const filtered = user.cartItems.filter(
    (item) => item._id?.toString() !== itemId.toString()
  );
  user.cartItems = filtered;
  await user.save();
  res.status(200).json({ msg: "successfully removed from cart" });
};

export const updateCartItem = async (req, res) => {
  const { itemId, qty } = req.body;
  const user = await MiningUser.findById(req.user.userId);
  if (!user) throw new NotFoundError("No user has been found");
  const alreadyExist = user.cartItems.find(
    (item) => item._id?.toString() === itemId.toString()
  );
  if (!alreadyExist) throw new BadRequestError("Item Not found on Cart");
  user.cartItems = user.cartItems.map((item) => {
    if (item._id?.toString() === itemId.toString()) {
      return {
        ...item.toObject(),
        qty: qty,
      };
    } else {
      return item;
    }
  });
  await user.save();
  res.status(200).json({ msg: "updated successfully" });
};

export const purchaseMiner = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await MiningUser.findById(req.user.userId).session(session);
    if (!user) throw new NotFoundError("No user found");
    const purchasedOn = new Date();
    const validity = new Date();
    validity.setFullYear(validity.getFullYear() + 3);
    const newOwnedMiners = [];
    for (const item of user.cartItems) {
      const product = await MiningProduct.findById(item.itemId).session(
        session
      );
      if (!product) throw new BadRequestError("No Product found");
      if (product.stock < item.qty)
        throw new BadRequestError("Product Qty Not in Stock");
      product.stock -= item.qty;
      await product.save({ session });
      newOwnedMiners.push({
        itemId: item.itemId,
        qty: item.qty,
        batchId: uuid4(),
        purchasedOn,
        validity,
        minedRevenue: 0,
        hostingFeePaid: 0,
        HostingFeeDue: 0,
      });
    }

    user.ownedMiners.push(...newOwnedMiners);
    user.cartItems = [];
    user.isFirst = false;
    await user.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ msg: "purchase completed" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new BadRequestError("Cannot proceed with purchase");
  }
};

export const getOwnedMiners = async (req, res) => {
  const user = await MiningUser.findById(req.user.userId).populate(
    "ownedMiners.itemId"
  );
  if (!user) throw new NotFoundError("No user found");
  const items = user.ownedMiners;
  res.status(200).json(items);
};

export const selectPayoutMode = async (req, res) => {
  const user = await MiningUser.findById(req.user.userId);
  if (!user) throw new NotFoundError("No user found");
  if (user.lastPayoutSelected) {
    const now = new Date();
    const diffInDays =
      (now - new Date(user.lastPayoutSelected)) / (1000 * 60 * 60 * 24);

    if (diffInDays < 60)
      throw new BadRequestError(
        "You can only change the payout once every 60 days"
      );
  }
  user.isFirst = false;
  user.payoutMode = req.body.mode;
  user.lastPayoutSelected = new Date();
  await user.save();
  res.status(200).json({ msg: "payout selected successfully", user });
};
