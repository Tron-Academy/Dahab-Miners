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
import { sendMail, transporter } from "../../utils/nodemailer.js";

export const miningRegister = async (req, res) => {
  const { email, password } = req.body;
  const username = email.split(".")[0];
  const hashed = await hashPassword(password);
  const newUser = new MiningUser({
    username,
    email,
    password: hashed,
  });

  const code = Math.floor(100000 + Math.random() * 900000);
  newUser.verificationCode = code.toString();
  const mailOptions = {
    from: {
      name: "DAHAB MINING",
      address: process.env.NODEMAILER_EMAIL,
    },
    to: newUser.email,
    subject: "Account Verification",
    text: `Welcome to Dahab Mining. Your verification code is ${code}`,
  };
  await sendMail(transporter, mailOptions);
  newUser.verificationCode = code;
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

export const verifyCode = async (req, res) => {
  const { email, code } = req.body;
  const user = await MiningUser.findOne({ email: email });
  if (!user) throw new NotFoundError("No user found");
  if (user.verificationCode.toString() !== code.toString()) {
    throw new BadRequestError("Invalid Verification Code");
  } else {
    res.status(200).json({ message: "Successfully verified" });
  }
};
