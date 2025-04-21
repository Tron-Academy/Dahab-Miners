import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { formatImage } from "../middleware/multerMiddleware.js";
import Product from "../models/ProductModel.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewProduct = async (req, res) => {
  const newProduct = new Product({
    productName: req.body.productName,
    hashRate: req.body.hashRate,
    productImage: req.body.productImage,
    productImagePublicId: req.body.productImagePublicId,
    featuredImage: req.body.featuredImage,
    featuredImagePublicId: req.body.featuredImagePublicId,
    power: req.body.power,
    algorithm: req.body.algorithm,
    description: req.body.description,
    price: req.body.price,
    manufacturer: req.body.manufacturerItem,
    cryptoCurrency: req.body.cryptoCurrencyItem,
    slug: req.body.slug,
    metaDescription: req.body.metaDescription,
    metaKeywords: req.body.metaKeywords,
    metaTitle: req.body.metaTitle,
  });
  await newProduct.save();
  res.status(201).json({ msg: "success" });
};

export const uploadProductImage = async (req, res) => {
  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.uploader.upload(file);
    res.status(200).json({
      msg: "success",
      url: response.secure_url,
      publicId: response.public_id,
    });
  } else {
    throw new BadRequestError("No files found");
  }
};

export const getAllProductsAdmin = async (req, res) => {
  const queryObject = {};
  if (req.query.keyWord && req.query.keyWord !== "") {
    queryObject.productName = { $regex: req.query.keyWord, $options: "i" };
  }
  const products = await Product.find(queryObject);
  if (!products) throw new NotFoundError("No products found");
  res.status(200).json({ msg: "success", products });
};

export const getSingleProductAdmin = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new NotFoundError("No product found");
  res.status(200).json({ msg: "success", product });
};

export const updateProductImage = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new NotFoundError("No product found");
  if (req.file) {
    const file = formatImage(req.file);
    if (product.productImagePublicId) {
      await cloudinary.uploader.destroy(product.productImagePublicId);
    }
    const response = await cloudinary.uploader.upload(file);
    product.productImage = response.url;
    product.productImagePublicId = response.public_id;
    await product.save();
    res.status(200).json({
      msg: "success",
      url: response.secure_url,
      publicId: response.public_id,
    });
  } else {
    throw new BadRequestError("No files found");
  }
};

export const updateFeaturedImage = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new NotFoundError("No product found");
  if (req.file) {
    const file = formatImage(req.file);
    if (product.featuredImagePublicId) {
      await cloudinary.uploader.destroy(product.featuredImagePublicId);
    }
    const response = await cloudinary.uploader.upload(file);
    product.featuredImage = response.url;
    product.featuredImagePublicId = response.public_id;
    await product.save();
    res.status(200).json({
      msg: "success",
      url: response.secure_url,
      publicId: response.public_id,
    });
  } else {
    throw new BadRequestError("No files found");
  }
};

export const editProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new NotFoundError("No product found");
  product.productName = req.body.productName;
  product.productImage = req.body.productImage;
  product.productImagePublicId = req.body.productImagePublicId;
  product.manufacturer = req.body.manufacturerItem;
  product.cryptoCurrency = req.body.cryptoCurrencyItem;
  product.hashRate = req.body.hashRate;
  product.power = req.body.power;
  product.algorithm = req.body.algorithm;
  product.price = req.body.price;
  product.featuredImage = req.body.featuredImage;
  product.featuredImagePublicId = req.body.featuredImagePublicId;
  product.description = req.body.description;
  product.slug = req.body.slug;
  product.metaDescription = req.body.metaDescription;
  product.metaKeywords = req.body.metaKeywords;
  product.metaTitle = req.body.metaTitle;
  await product.save();
  res.status(200).json({ msg: "success" });
};

export const makeFeatured = async (req, res) => {
  const product = await Product.findById(req.body.id);
  if (!product) throw new NotFoundError("No products found");
  product.isFeatured = true;
  await product.save();
  res.status(200).json({ msg: "success" });
};

export const removeFeatured = async (req, res) => {
  const product = await Product.findById(req.body.id);
  if (!product) throw new NotFoundError("No Products found");
  product.isFeatured = false;
  await product.save();
  res.status(200).json({ msg: "success" });
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new NotFoundError("No product found");
  if (product.productImagePublicId) {
    await cloudinary.uploader.destroy(product.productImagePublicId);
  }
  if (product.featuredImagePublicId) {
    await cloudinary.uploader.destroy(product.featuredImagePublicId);
  }
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "success" });
};
