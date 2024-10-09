import { body, param, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";
import Admin from "../models/AdminModel.js";
import mongoose from "mongoose";

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
]);
