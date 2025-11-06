import { body, param, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";
import Admin from "../models/AdminModel.js";
import mongoose from "mongoose";
import Repair from "../models/RepairModel.js";
import MiningUser from "../models/miningApp/MiningUser.js";
import MiningTerms from "../models/miningApp/MiningTerms.js";
import MiningPrivacy from "../models/miningApp/MiningPrivacy.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateRegisterInput = withValidationErrors([
  body("username").notEmpty().withMessage("username is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email format")
    .custom(async (email, { req }) => {
      const user = await Admin.findOne({ email: email });
      if (user) throw new BadRequestError("email already exists");
    }),
  body("password").notEmpty().withMessage("Password is required"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email format"),
  body("password").notEmpty().withMessage("Password is required"),
]);

export const validateForgotPasswordInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email format"),
]);

export const validateResetPasswordInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email format"),
  body("password").notEmpty().withMessage("Password is required"),
  body("verificationCode")
    .notEmpty()
    .withMessage("verification code is required"),
]);

export const validateAddProductInput = withValidationErrors([
  body("productName").notEmpty().withMessage("Product Name is required"),
  body("hashRate").notEmpty().withMessage("Hash rate is required"),
  body("power").notEmpty().withMessage("Power is required"),
  body("algorithm").notEmpty().withMessage("Algorithm is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("price").notEmpty().withMessage("Price is required"),
  body("manufacturerItem").notEmpty().withMessage("Manufacturer is required"),
  body("cryptoCurrencyItem")
    .notEmpty()
    .withMessage("Crypto currency is required"),
  body("productImage").notEmpty().withMessage("Product Image is required"),
  body("productImagePublicId")
    .notEmpty()
    .withMessage("Error in product image upload. upload again"),
  body("featuredImage").notEmpty().withMessage("Featured image is required"),
  body("featuredImagePublicId")
    .notEmpty()
    .withMessage("Error in featured image upload. upload again"),
  body("slug").notEmpty().withMessage("Slug is required"),
  body("metaTitle").notEmpty().withMessage("Meta title is required"),
  body("metaDescription")
    .notEmpty()
    .withMessage("Meta Description is required"),
]);

export const validateSingleAdminProductId = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError("Invalid id");
  }),
]);

export const validateBlogInput = withValidationErrors([
  body("title").notEmpty().withMessage("Title is required"),
  body("blogImage").notEmpty().withMessage("Blog Image is required"),
  body("blogImagePublicId")
    .notEmpty()
    .withMessage("Error in image upload. try again"),
  body("content").notEmpty().withMessage("Content is required"),
  body("slug").notEmpty().withMessage("Slug is required"),
  body("metaTitle").notEmpty().withMessage("Meta title is required"),
  body("metaDescription")
    .notEmpty()
    .withMessage("Meta Description is required"),
  // body("metaKeywords").notEmpty().withMessage("Meta keywords is required"),
]);

export const validateDataInput = withValidationErrors([
  body("actualLocation").notEmpty().withMessage("Actual location is required"),
  body("macAddress").notEmpty().withMessage("mac address is required"),
  body("serialNumber").notEmpty().withMessage("serial number is required"),
  body("modelName").notEmpty().withMessage("model name is required"),
  body("clientName").notEmpty().withMessage("client name is required"),
  body("currentLocation")
    .notEmpty()
    .withMessage("Current Location is required"),
  body("temporary").notEmpty().withMessage("Temporary is required"),
  body("workerId").notEmpty().withMessage("Worker ID is not required"),
]);

export const validateRepairInput = withValidationErrors([
  body("serialNumber").notEmpty().withMessage("Serial Number is required"),
  body("macAddress").notEmpty().withMessage("Mac Address is required"),
  body("workerId").notEmpty().withMessage("Worker Id is required"),
  body("owner").notEmpty().withMessage("Owner is required"),
  body("nowRunning").notEmpty().withMessage("now Running is required"),
]);

export const validateRepairIssueInput = withValidationErrors([
  body("issues").notEmpty().withMessage("issues is required"),
]);

export const validateUpdateRepairStatusInput = withValidationErrors([
  body("problemId")
    .notEmpty()
    .withMessage("Problem id is required")
    .isMongoId()
    .withMessage("Invalid ID"),
  body("repairStatus").notEmpty().withMessage("Repair status is required"),
  body("repairTechnician").notEmpty().withMessage("Technician is required"),
  body("extraComponent")
    .notEmpty()
    .withMessage("Extra component field is required"),
  body("extraQty")
    .notEmpty()
    .withMessage("Extra quantity component is required"),
]);

export const validateUpdateRepairProcessInput = withValidationErrors([
  body("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("Invalid ID"),
]);

export const validateTestPassInput = withValidationErrors([
  body("logImageUrl").notEmpty().withMessage("image url missing"),
  body("logImagePublicId").notEmpty().withMessage("image id is missing"),
  body("remarks").notEmpty().withMessage("remarks is required"),
  body("testTechnician").notEmpty().withMessage("Test technician is required"),
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("invalid Id"),
]);

export const validateAddInventoryInput = withValidationErrors([
  body("itemName").notEmpty().withMessage("Item Name is required"),
  body("category").notEmpty().withMessage("category is required"),
  body("quantity").notEmpty().withMessage("Quantity is required"),
  body("threshold").notEmpty().withMessage("threshold is required"),
  // body("location").notEmpty().withMessage("location is required"),
]);

export const validateSetPriorityInput = withValidationErrors([
  body("priority").notEmpty().withMessage("Priority is required"),
  // .custom(async (priority, { req }) => {
  //   const miner = await Repair.findOne({ priority: priority });
  //   if (miner)
  //     throw new BadRequestError("Other Miner with same priority exists");
  // }),
]);

// Mining App - Auth
export const validateMiningUserRegister = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email format")
    .custom(async (email, { req }) => {
      const user = await MiningUser.findOne({ email: email });
      if (user) throw new BadRequestError("email already exists");
    }),
  body("password").notEmpty().withMessage("Password is required"),
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .custom(async (username) => {
      const user = await MiningUser.findOne({ username: username });
      if (user) throw new BadRequestError("username already taken");
    }),
]);

export const validateMiningUserLogin = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email format"),
  body("password").notEmpty().withMessage("Password is required"),
]);

export const validateMiningUSerUpdateProfile = withValidationErrors([
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .custom(async (username, { req }) => {
      const user = await MiningUser.findOne({ username: username });
      if (user && user._id.toString() !== req.user.userId.toString())
        throw new BadRequestError("Username already taken");
    }),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email, { req }) => {
      const user = await MiningUser.findOne({ email: email });
      if (user && user._id.toString() !== req.user.userId.toString())
        throw new BadRequestError("Email already taken");
    }),
]);

export const validateMiningLoginVerify = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email cannot be Empty")
    .isEmail()
    .withMessage("Invalid Email format"),
  body("code").notEmpty().withMessage("Verification code is required"),
]);

export const validateMiningAccountVerify = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email cannot be Empty")
    .isEmail()
    .withMessage("Invalid Email format"),
]);

export const validateMiningVerifyCode = withValidationErrors([
  body("code").notEmpty().withMessage("Verification code is required"),
]);

//mining-app - notifications
export const validateAddNotificationInput = withValidationErrors([
  body("message").notEmpty().withMessage("Message field is required"),
]);

//mining-app - payment gateway
export const validateCreateIntentInput = withValidationErrors([
  body("amount").notEmpty().withMessage("Amount is required"),
  body("message").notEmpty().withMessage("Message is required"),
]);

export const validateCreateCryptoIntentInput = withValidationErrors([
  body("amount").notEmpty().withMessage("Amount is required"),
  body("message").notEmpty().withMessage("Message is required"),
  body("crypto").notEmpty().withMessage("Crypto Type has to be specified"),
]);

//mining-app - Payout

export const validateMakeWithdrawal = withValidationErrors([
  body("amount").notEmpty().withMessage("Amount is required"),
  body("address").notEmpty().withMessage("Wallet Address is required"),
]);

export const validateUpdatePayoutStatus = withValidationErrors([
  body("id").notEmpty().withMessage("Payout Id is required"),
  body("userId").notEmpty().withMessage("User ID is required"),
  body("status").notEmpty().withMessage("Status is required"),
  body("amount").notEmpty().withMessage("Amount is required"),
]);

// mining-app - Cart

export const validateAddRemoveCartInput = withValidationErrors([
  body("itemId")
    .notEmpty()
    .withMessage("Item Id cannot be Empty")
    .isMongoId()
    .withMessage("Invalid Product Id"),
]);

export const validateUpdateCartInput = withValidationErrors([
  body("itemId")
    .notEmpty()
    .withMessage("Item Id cannot be Empty")
    .isMongoId()
    .withMessage("Invalid Product Id"),
  body("qty").notEmpty().withMessage("Qty is required"),
]);

//mining-app - Product

export const validateAddMiningMiner = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required"),
  body("hashRate").notEmpty().withMessage("HashRate is required"),
  body("power").notEmpty().withMessage("power is required"),
  body("stock").notEmpty().withMessage("stock is required"),
  body("hostingFeePerKw")
    .notEmpty()
    .withMessage("Hosting Fee Per KW is required"),
  body("breakEvenHash").notEmpty().withMessage("Break Even Hash is required"),
  body("coin").notEmpty().withMessage("Coin is required"),
  body("algorithm").notEmpty().withMessage("Algorithm is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("subtitle").notEmpty().withMessage("Subtitle is required"),
  body("investmentFactor")
    .notEmpty()
    .withMessage("Investment Factor is required"),
  body("riskFactor").notEmpty().withMessage("Risk Factor is required"),
  body("hostingFactor").notEmpty().withMessage("Hosting Factor is required"),
  body("revenueFactor").notEmpty().withMessage("Revenue Factor is required"),
  body("efficiencyFactor")
    .notEmpty()
    .withMessage("Efficiency Factor is required"),
  body("features").notEmpty().withMessage("Features is required"),
  body("idealFor").notEmpty().withMessage("Ideal for is required"),
]);

//mining-app - Revenue
export const validateAddRevenueInput = withValidationErrors([
  body("amount").notEmpty().withMessage("Amount is required"),
  body("hashRate").notEmpty().withMessage("Hash Rate is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("uptime").notEmpty().withMessage("Uptime is required"),
]);

//mining-app - sats
export const validateAddSatsInput = withValidationErrors([
  body("sats").notEmpty().withMessage("sats value is required"),
]);

//mining-app - terms and conditions
export const validateaddTerms = withValidationErrors([
  body("version")
    .notEmpty()
    .withMessage("Version is required")
    .custom(async (version, { req }) => {
      const terms = await MiningTerms.findOne({ version: version });
      if (terms) throw new BadRequestError("term version already exists");
    }),
  body("content").notEmpty().withMessage("content is required"),
]);

export const validateaddPrivacyPolicy = withValidationErrors([
  body("version")
    .notEmpty()
    .withMessage("Version is required")
    .custom(async (version, { req }) => {
      const terms = await MiningPrivacy.findOne({ version: version });
      if (terms) throw new BadRequestError("term version already exists");
    }),
  body("content").notEmpty().withMessage("content is required"),
]);

//mining-app - wallet

export const validateUpdateUserWallet = withValidationErrors([
  body("amount").notEmpty().withMessage("Amount is required"),
  body("id")
    .notEmpty()
    .withMessage("User Id is required")
    .isMongoId()
    .withMessage("Invalid User ID"),
]);
