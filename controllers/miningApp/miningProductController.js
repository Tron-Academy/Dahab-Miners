import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../../errors/customErrors.js";
import MiningProduct from "../../models/miningApp/MiningProduct.js";
import MiningUser from "../../models/miningApp/MiningUser.js";
import { v4 as uuid4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import { formatImage } from "../../middleware/multerMiddleware.js";
import OwnedMiner from "../../models/miningApp/v2/OwnedMiners.js";

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

export const getOwnedMiners = async (req, res) => {
  const miners = await OwnedMiner.find({ user: req.user.userId }).populate(
    "itemId",
    "name image power hashRate hostingFeePerKw coin algorithm"
  );
  res.status(200).json(miners);
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

export const assignProduct = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { userId, productId, qty } = req.body;
    const user = await MiningUser.findById(userId).session(session);
    if (!user) throw new NotFoundError("No user found");
    const product = await MiningProduct.findById(productId).session(session);
    if (!product) throw new NotFoundError("No product found");
    if (product.stock < Number(qty))
      throw new BadRequestError("Product Qty Not in Stock");
    const purchasedOn = new Date();
    const validity = new Date();
    validity.setFullYear(validity.getFullYear() + 3);
    product.stock -= Number(qty);
    product.sold = (product.sold || 0) + Number(qty);
    await product.save({ session });
    const newOwned = new OwnedMiner({
      user: user._id,
      itemId: product._id,
      batchId: uuid4(),
      purchasedOn,
      validity,
      minedRevenue: 0,
      hostingFeePaid: 0,
      HostingFeeDue: 0,
      qty: Number(qty),
    });
    await newOwned.save({ session });
    user.ownedMiners.push(newOwned._id);
    await user.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ msg: "success" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res
      .status(error.statusCode || 500)
      .json({ msg: error.message || error.msg });
  }
};
