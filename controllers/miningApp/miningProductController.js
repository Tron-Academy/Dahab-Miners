import { BadRequestError, NotFoundError } from "../../errors/customErrors.js";
import MiningProduct from "../../models/miningApp/MiningProduct.js";
import MiningUser from "../../models/miningApp/MiningUser.js";
import { v4 as uuid4 } from "uuid";

export const getAllMiners = async (req, res) => {
  const miners = await MiningProduct.find();
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
  const user = await MiningUser.findById(req.user.userId);
  if (!user) throw new NotFoundError("No user found");
  const purchasedOn = new Date();
  const validity = new Date();
  validity.setFullYear(validity.getFullYear() + 3);
  const newOwnedMiners = user.cartItems.map((item) => ({
    itemId: item.itemId,
    qty: item.qty,
    batchId: uuid4(),
    purchasedOn,
    validity,
    minedRevenue: 0,
    hostingFeePaid: 0,
    HostingFeeDue: 0,
  }));
  user.ownedMiners.push(...newOwnedMiners);
  user.cartItems = [];
  await user.save();
  res.status(200).json({ msg: "purchase completed" });
};

export const getOwnedMiners = async (req, res) => {
  const user = await MiningUser.findById(req.user.userId).populate(
    "ownedMiners.itemId"
  );
  if (!user) throw new NotFoundError("No user found");
  const items = user.ownedMiners;
  res.status(200).json(items);
};
