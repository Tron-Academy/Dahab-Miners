import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../../errors/customErrors.js";
import MiningProduct from "../../models/miningApp/MiningProduct.js";
import MiningUser from "../../models/miningApp/MiningUser.js";
import { v4 as uuid4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import { formatImage } from "../../middleware/multerMiddleware.js";

export const getAllMiners = async (req, res) => {
  const miners = await MiningProduct.find({ isTest: { $ne: true } }).sort({
    price: 1,
  });
  if (miners.length < 1) throw new NotFoundError("No Miners Found");
  res.status(200).json(miners);
};

export const addNewMiner = async (req, res) => {
  const {
    name,
    hashRate,
    power,
    price,
    stock,
    hostingFeePerKw,
    breakEvenHash,
    coin,
    algorithm,
    category,
    description,
    subtitle,
    investmentFactor,
    riskFactor,
    hostingFactor,
    revenueFactor,
    efficiencyFactor,
    features,
    idealFor,
    bulkHosting,
  } = req.body;
  let image;
  let imageId;
  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.uploader.upload(file);

    image = response.secure_url;
    imageId = response.public_id;
  }
  if (!req.file) throw new BadRequestError("No Image file found");

  const newMiner = new MiningProduct({
    name,
    hashRate: Number(hashRate),
    power: Number(power),
    price: Number(price),
    stock: Number(stock),
    hostingFeePerKw: Number(hostingFeePerKw),
    breakEvenHash: Number(breakEvenHash),
    coin,
    algorithm,
    category,
    description,
    subtitle,
    investmentFactor: Number(investmentFactor),
    riskFactor: Number(riskFactor),
    hostingFactor: Number(hostingFactor),
    revenueFactor: Number(revenueFactor),
    efficiencyFactor: Number(efficiencyFactor),
    features: features.split(","),
    idealFor: idealFor.split(","),
    image,
    imageId,
    isBulkHosting: bulkHosting === "Yes" ? true : false,
  });
  await newMiner.save();
  res.status(201).json({ msg: "success" });
};

export const getSingleMiner = async (req, res) => {
  const miner = await MiningProduct.findById(req.params.id);
  if (!miner) throw new NotFoundError("No miner found");
  res.status(200).json(miner);
};

export const editSingleMiner = async (req, res) => {
  const {
    name,
    hashRate,
    power,
    price,
    stock,
    hostingFeePerKw,
    breakEvenHash,
    coin,
    algorithm,
    category,
    description,
    subtitle,
    investmentFactor,
    riskFactor,
    hostingFactor,
    revenueFactor,
    efficiencyFactor,
    features,
    idealFor,
    bulkHosting,
  } = req.body;

  const miner = await MiningProduct.findById(req.params.id);
  if (!miner) throw new NotFoundError("No miner found");
  if (req.file) {
    const file = formatImage(req.file);
    if (miner.imageId) {
      await cloudinary.uploader.destroy(miner.imageId);
    }
    const response = await cloudinary.uploader.upload(file);
    miner.image = response.secure_url;
    miner.imageId = response.public_id;
  }
  miner.name = name;
  miner.hashRate = Number(hashRate);
  miner.power = Number(power);
  miner.price = Number(price);
  miner.stock = Number(stock);
  miner.hostingFeePerKw = Number(hostingFeePerKw);
  miner.breakEvenHash = Number(breakEvenHash);
  miner.coin = coin;
  miner.algorithm = algorithm;
  miner.category = category;
  miner.description = description;
  miner.subtitle = subtitle;
  miner.investmentFactor = Number(investmentFactor);
  miner.riskFactor = Number(riskFactor);
  miner.hostingFactor = Number(hostingFactor);
  miner.revenueFactor = Number(revenueFactor);
  miner.efficiencyFactor = Number(efficiencyFactor);
  miner.features = features.split(",");
  miner.idealFor = idealFor.split(",");
  miner.isBulkHosting = bulkHosting === "Yes" ? true : false;
  await miner.save();
  res.status(200).json({ msg: "success" });
};

// export const deleteMiningMiner = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     const minerId = req.params.id;
//     const deletedMiner = await MiningProduct.findByIdAndDelete(minerId, {
//       session,
//     });
//     if (!deletedMiner) throw new NotFoundError("No miner found");
//   } catch (error) {}
// };

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

export const emptyCart = async (req, res) => {
  const user = await MiningUser.findById(req.user.userId);
  if (!user) throw new NotFoundError("No user found");
  user.cartItems = [];
  await user.save();
  res.status(200).json({ msg: "success" });
};
