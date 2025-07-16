import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../../errors/customErrors.js";
import MiningProduct from "../../models/miningApp/MiningProduct.js";
import MiningUser from "../../models/miningApp/MiningUser.js";
import { comparePassword, hashPassword } from "../../utils/bcrypt.js";
import { createJWT } from "../../utils/jwtUtils.js";
import jwt from "jsonwebtoken";

export const miningRegister = async (req, res) => {
  const { email, password } = req.body;
  const username = email.split(".")[0];
  const hashed = await hashPassword(password);
  const newUser = new MiningUser({
    username,
    email,
    password: hashed,
  });
  await newUser.save();
  const token = createJWT({
    userId: newUser._id,
    username: newUser.username,
    role: "mining-user",
  });
  const tenDay = 1000 * 60 * 60 * 24 * 10;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + tenDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ msg: "successfully Registered", token });
};

export const miningLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await MiningUser.findOne({ email: email });
  if (!user) throw new NotFoundError("Invalid Credentials");
  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid credentials");
  const token = createJWT({
    userId: user._id,
    username: user.username,
    role: "mining-user",
  });
  const tenDay = 1000 * 60 * 60 * 24 * 10;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + tenDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ msg: "successfully Logged in", token });
};

export const miningLogout = async (req, res) => {
  // const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
  // if (!token) throw new UnauthenticatedError("unable to access");
  // const decoded = verifyJWT(token);
  // decoded.exp = Date.now();
  const token = jwt.sign({ userId: "logout" }, process.env.JWT_SECRET, {
    expiresIn: "1s",
  });
  const tenDay = 1000 * 60 * 60 * 24 * 10;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + tenDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logged out successfully ", token });
};

export const getMiningUserInfo = async (req, res) => {
  const { userId } = req.user;
  const user = await MiningUser.findById(userId)
    .select("-password")
    .populate(["cartItems.itemId", "ownedMiners.itemId"]);
  if (!user) throw new NotFoundError("No user found");
  res.status(200).json(user);
};

//temporary controllers
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
  user.ownedMiners = [...user.ownedMiners, ...user.cartItems];
  user.cartItems = [];
  await user.save();
  res.status(200).json({ msg: "purchase completed" });
};

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
