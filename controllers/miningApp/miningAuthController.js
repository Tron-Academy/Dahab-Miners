import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../../errors/customErrors.js";
import MiningUser from "../../models/miningApp/MiningUser.js";
import { comparePassword, hashPassword } from "../../utils/bcrypt.js";
import { createJWT } from "../../utils/jwtUtils.js";
import jwt from "jsonwebtoken";
import { sendMail, transporter } from "../../utils/nodemailer.js";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import MiningTerms from "../../models/miningApp/MiningTerms.js";
import MiningPrivacy from "../../models/miningApp/MiningPrivacy.js";
import axios from "axios";
import mongoose from "mongoose";
import MiningAccountClosure from "../../models/miningApp/MiningAccountClosure.js";

export const miningRegister = async (req, res) => {
  const { email, password, username, referral } = req.body;
  const terms = await MiningTerms.findOne().sort({ createdAt: -1 });
  const policy = await MiningPrivacy.findOne().sort({ createdAt: -1 });
  let referredUser = null;
  if (referral) {
    referredUser = await MiningUser.findOne({ username: referral });
    if (!referredUser) throw new NotFoundError("Referral Code not exist");
  }
  const hashed = await hashPassword(password);
  const newUser = new MiningUser({
    username,
    email: email.toLowerCase(),
    password: hashed,
    latestTermVersion: terms.version,
    latestPrivacyVersion: policy.version,
  });
  newUser.termsAgreementHistory.push({
    date: new Date(),
    version: terms.version,
  });
  newUser.privacyAgreementHistory.push({
    date: new Date(),
    version: policy.version,
  });
  if (referral) {
    newUser.referredBy = referredUser.username;
    const today = new Date();
    const validTill = new Date(today);
    validTill.setMonth(today.getMonth() + 3);
    newUser.referralVouchers.push({
      name: "REFFERAL",
      code: `REF-${referredUser.username.toUpperCase()}`,
      discount: 10,
      description: `Grab instant 10% discount on all wallet topup and Miner purchase`,
      applicableFor: "Both",
      minimumSpent: 2000,
      validity: validTill,
      isApplied: false,
    });
    referredUser.referralVouchers.push({
      name: "REFFERAL",
      code: `REF-${newUser.username.toUpperCase()}`,
      discount: 30,
      description: `Grab instant 10% discount on all wallet topup and Miner purchase`,
      applicableFor: "Both",
      minimumSpent: 2000,
      validity: validTill,
      isApplied: false,
    });
  }
  const code = Math.floor(1000 + Math.random() * 9000);
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
  await referredUser.save();
  await newUser.save();

  res.status(200).json({ msg: "successfully Registered" });
};

export const miningLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await MiningUser.findOne({
    email: { $regex: `^${email}$`, $options: "i" },
  });
  if (!user) throw new NotFoundError("No User Found");
  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid credentials");
  if (!user.isVerified) throw new BadRequestError("account not verified");
  if (user.is2FAEnabled) {
    res.status(200).json({ msg: "successfully logged in. Enter 2FA" });
  } else {
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
  }
};

export const loginVerification = async (req, res) => {
  const user = await MiningUser.findOne({
    email: { $regex: `^${req.body.email}$`, $options: "i" },
  });
  if (!user) throw new NotFoundError("No user found");
  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token: req.body.code,
    window: 1,
  });
  if (!verified) throw new BadRequestError("Invalid OTP");
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
  res.status(200).json({ msg: "successfully verified", token });
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
  const user = await MiningUser.findOne({
    email: { $regex: `^${email}$`, $options: "i" },
  });
  if (!user) throw new NotFoundError("No user found");
  if (user.verificationCode.toString() !== code.toString())
    throw new BadRequestError("Invalid Verification Code");
  user.isVerified = true;
  await user.save();
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
  res.status(200).json({ message: "Successfully verified", token });
};

export const verifyAccount = async (req, res) => {
  const { email } = req.body;
  const user = await MiningUser.findOne({
    email: { $regex: `^${email}$`, $options: "i" },
  });
  if (!user) throw new NotFoundError("No user found");
  const code = Math.floor(1000 + Math.random() * 9000);
  user.verificationCode = code.toString();
  const mailOptions = {
    from: {
      name: "DAHAB MINING",
      address: process.env.NODEMAILER_EMAIL,
    },
    to: user.email,
    subject: "Account Verification",
    text: `Welcome to Dahab Mining. Your verification code is ${code}`,
  };
  await sendMail(transporter, mailOptions);
  user.verificationCode = code;
  await user.save();
  res.status(200).json({ message: "Otp send successfully" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await MiningUser.findOne({
    email: { $regex: `^${email}$`, $options: "i" },
  });
  if (!user) throw new NotFoundError("No user found");
  const code = Math.floor(1000 + Math.random() * 9000);
  user.verificationCode = code.toString();
  const mailOptions = {
    from: {
      name: "DAHAB MINING",
      address: process.env.NODEMAILER_EMAIL,
    },
    to: user.email,
    subject: "Password Reset",
    text: `Welcome to Dahab Mining. We have received a request for password reset. Your verification code is ${code}`,
  };
  await sendMail(transporter, mailOptions);
  user.verificationCode = code;
  await user.save();
  res.status(200).json({ message: "Otp send successfully" });
};

export const verifyPasswordResetCode = async (req, res) => {
  const { email, code } = req.body;
  const user = await MiningUser.findOne({
    email: { $regex: `^${email}$`, $options: "i" },
  });
  if (!user) throw new NotFoundError("No user found");
  if (user.verificationCode.toString() !== code.toString())
    throw new BadRequestError("Code does not Match");
  res.status(200).json({ message: "Code Success" });
};

export const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  const user = await MiningUser.findOne({
    email: { $regex: `^${email}$`, $options: "i" },
  });
  if (!user) throw new NotFoundError("No user found");
  const hashedPassword = await hashPassword(password);
  user.password = hashedPassword;
  await user.save();
  res.status(200).json({ message: "Password successfully reset" });
};

export const send2FaCodeQR = async (req, res) => {
  const user = await MiningUser.findById(req.user.userId);
  if (!user) throw new NotFoundError("No user found");
  const secret = speakeasy.generateSecret({ name: "Dahab Mining" });
  user.twoFactorSecret = secret.base32;
  await user.save();
  const qrCode = await qrcode.toDataURL(secret.otpauth_url);
  res.status(200).json(qrCode);
};

export const verify2FA = async (req, res) => {
  const user = await MiningUser.findById(req.user.userId)
    .select("-password")
    .populate(["cartItems.itemId", "ownedMiners.itemId"]);
  if (!user) throw new NotFoundError("No user found");
  const { code } = req.body;
  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token: code,
    window: 1,
  });
  if (!verified) throw new BadRequestError("Invalid OTP");
  user.is2FAEnabled = true;
  await user.save();
  res.status(200).json({ msg: "successfully verified", user });
};

export const disable2FA = async (req, res) => {
  const user = await MiningUser.findById(req.user.userId)
    .select("-password")
    .populate(["cartItems.itemId", "ownedMiners.itemId"]);
  if (!user) throw new NotFoundError("No user found");
  user.is2FAEnabled = false;
  user.twoFactorSecret = "";
  await user.save();
  res.status(200).json({ msg: "successfully disabled 2FA", user });
};

export const withdrawalVerification = async (req, res) => {
  const user = await MiningUser.findById(req.user.userId);
  if (!user) throw new NotFoundError("No users found");
  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token: req.body.code,
    window: 1,
  });
  if (!verified) throw new BadRequestError("Invalid Code");
  res.status(200).json({ msg: "successfully verified" });
};

export const updateProfile = async (req, res) => {
  const { username, email } = req.body;
  const user = await MiningUser.findById(req.user.userId);
  if (!user) throw new NotFoundError("No user has been found");
  user.username = username;
  user.email = email;
  await user.save();
  res.status(200).json({ msg: "successfully updated" });
};

export const deleteAccount = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await MiningUser.findByIdAndDelete(req.user.userId, {
      session,
    });
    if (!user) throw new NotFoundError("No user found");
    const { data } = await axios.get(
      "https://api.minerstat.com/v2/coins?list=BTC"
    );
    const btcPriceUSD = data[0]?.price;
    const btcPriceAED = btcPriceUSD * 3.67;
    if (!btcPriceAED || btcPriceAED <= 0)
      throw new BadRequestError("Not able to get BTC price");
    const totalBTCinAED = user.currentBalance * btcPriceAED;
    const totalFinal = user.walletBalance + totalBTCinAED;
    const newAccountClosure = new MiningAccountClosure({
      username: user.username,
      email: user.email,
      lastBTCBalance: user.currentBalance,
      lastWalletBalance: user.walletBalance,
      lastBTCinAED: totalBTCinAED,
      BTCPriceInAED: btcPriceAED,
      totalBalance: totalFinal,
      type: totalFinal > 0 ? "refund" : totalFinal < 0 ? "due" : "neutral",
      rawData: JSON.stringify(user),
    });
    await newAccountClosure.save({ session });
    if (totalFinal > 0) {
      const mailOptions = {
        from: {
          name: "DAHAB MINING",
          address: process.env.NODEMAILER_EMAIL,
        },
        to: user.email,
        subject: "Account Deletion - Payment Refund",
        text: `Hello ${
          user.username
        },\n\n This is to confirm that your account has been permanently deleted as per your request. All associated data, including miners, transactions, and wallet balances, have been securely removed.\n\n We truly appreciate the trust you placed in us and regret seeing you leave. After account closure, you still have a remaining balance of AED ${totalFinal.toFixed(
          2
        )}. Please reply to this email with your bank or wallet details so we can process your refund promptly.\n\n Thank you once again for being part of Dahab Mining.\n\n Regards, \n Dahab Mining`,
      };
      await sendMail(transporter, mailOptions);
    } else if (totalFinal < 0) {
      const mailOptions = {
        from: {
          name: "DAHAB MINING",
          address: process.env.NODEMAILER_EMAIL,
        },
        to: user.email,
        subject: "Account Deletion - Payment Due",
        text: `Hello ${
          user.username
        },\n\n This is to confirm that your account has been permanently deleted as per your request. All associated data, including miners, transactions, and wallet balances, have been securely removed.\n\n We sincerely appreciate the time you spent with us. After account closure, your account shows a pending due of AED ${totalFinal.toFixed(
          2
        )}. Please reply to this email with your preferred payment method so we can settle this amount and close your record.\n\n We kindly ask you to clear this balance at the earliest to avoid further escalation.\n\n Regards,\n Dahab Mining`,
      };
      await sendMail(transporter, mailOptions);
    } else {
      const mailOptions = {
        from: {
          name: "DAHAB MINING",
          address: process.env.NODEMAILER_EMAIL,
        },
        to: user.email,
        subject: "Account Deletion- No Due",
        text: `Hello ${user.username},\n\n This is to confirm that your account has been permanently deleted as per your request. All associated data, including miners, transactions, and wallet balances, have been securely removed.\n\n We’re thankful for the time you spent with us and regret seeing you leave. Please note that you have no dues or refunds pending on your account. \n Thank you for being a valued part of Dahab Mining.\n\n Regards, \n Dahab Mining`,
      };
      await sendMail(transporter, mailOptions);
    }
    await session.commitTransaction();
    res.status(200).json({ msg: "successfull" });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ msg: "something went wrong", error });
  } finally {
    session.endSession();
  }
};
