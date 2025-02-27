import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
import Admin from "../models/AdminModel.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { createJWT } from "../utils/jwtUtils.js";
import { sendMail, transporter } from "../utils/nodemailer.js";

export const registerAdmin = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);

  const admin = new Admin({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
  });
  await admin.save();
  res.status(201).json({ msg: "successfully registered" });
};

export const loginAdmin = async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) throw new NotFoundError("No user found");
  const isPasswordCorrect = await comparePassword(
    req.body.password,
    admin.password
  );
  if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid credentials");
  const token = createJWT({
    userId: admin._id,
    username: admin.username,
    role: admin.role,
  });
  const tenDay = 1000 * 60 * 60 * 24 * 10;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + tenDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ msg: "successfully logged in" });
};

export const logoutUser = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: "successfully logged out" });
};

export const getUserInfo = async (req, res) => {
  const user = await Admin.findById(req.user.userId);
  const userInfo = {
    email: user.email,
    username: user.username,
    role: user.role,
  };
  if (!user) throw new NotFoundError("No user found");
  res.status(200).json({ msg: "success", userInfo });
};

export const forgotPassword = async (req, res) => {
  const user = await Admin.findOne({ email: req.body.email });
  if (!user) throw new NotFoundError("No user found");
  const code = Math.floor(100000 + Math.random() * 900000);
  user.verificationCode = code.toString();
  await user.save();
  const mailOptions = {
    from: {
      name: "DAHAB MINERS ADMIN",
      address: process.env.NODEMAILER_EMAIL,
    },
    to: user.email,
    subject: "PASSWORD RESET",
    text: `You have requested a password reset for your admin account on DAHAB MINERS. Your verification code is ${code}`,
  };
  await sendMail(transporter, mailOptions);
  res.status(200).json({ msg: "success" });
};

export const resetPassword = async (req, res) => {
  const user = await Admin.findOne({ email: req.body.email });
  if (!user) throw new NotFoundError("No user found");
  if (
    user.verificationCode.toString() !== req.body.verificationCode.toString()
  ) {
    throw new BadRequestError("Invalid Registration code");
  }
  const newPassword = await hashPassword(req.body.password);
  user.password = newPassword;
  await user.save();
  res.status(200).json({ msg: "success" });
};
