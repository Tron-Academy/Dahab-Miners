import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { formatImage } from "../middleware/multerMiddleware.js";
import Product from "../models/ProductModel.js";
import { v2 as cloudinary } from "cloudinary";
import { cleanupCloudinaryImages } from "../utils/cloudinaryFunctions.js";

export const addNewProduct = async (req, res) => {
  let uploadedPublicIds = [];
  try {
    const {
      productName,
      productCategory,
      hashRate,
      power,
      algorithm,
      description,
      overview,
      price,
      manufacturerItem,
      cryptoCurrencyItem,
      slug,
      metaDescription,
      metaKeywords,
      metaTitle,
      specs,
      faq,
      schema,
    } = req.body;
    const uploadSingle = async (file) => {
      const formatted = formatImage(file);
      const res = await cloudinary.uploader.upload(formatted);
      uploadedPublicIds.push(res.public_id);
      return {
        url: res.secure_url,
        publicId: res.public_id,
      };
    };

    let mainImage = null;
    let featuredImage = null;
    if (req.files?.mainImage?.[0]) {
      mainImage = await uploadSingle(req.files.mainImage[0]);
    }
    if (req.files?.featuredImage?.[0]) {
      featuredImage = await uploadSingle(req.files.featuredImage[0]);
    }
    const newProduct = new Product({
      productName: productName,
      price: price,
      hashRate: hashRate,
      power: power,
      algorithm: algorithm,
      overview: overview,
      description: description,
      manufacturer: manufacturerItem,
      cryptoCurrency: JSON.parse(cryptoCurrencyItem),
      slug: slug,
      metaKeywords: metaKeywords,
      metaDescription: metaDescription,
      metaTitle: metaTitle,
      productCategory: productCategory,
      productSpecifications: specs ? JSON.parse(specs) : [],
      productFaq: faq ? JSON.parse(faq) : [],
      productSchema: schema,
      productImage: mainImage?.url || "",
      productImagePublicId: mainImage?.publicId || "",
      featuredImage: featuredImage?.url || "",
      featuredImagePublicId: featuredImage?.publicId || "",
    });
    await newProduct.save();
    res.status(201).json({ msg: "Product created successfully" });
  } catch (error) {
    await cleanupCloudinaryImages(uploadedPublicIds);
    res
      .status(error.statusCode || 500)
      .json({ msg: error.message || error.msg });
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

export const editProduct = async (req, res) => {
  let uploadedPublicIds = [];
  try {
    const {
      productName,
      productCategory,
      hashRate,
      power,
      algorithm,
      description,
      overview,
      price,
      manufacturerItem,
      cryptoCurrencyItem,
      slug,
      metaDescription,
      metaKeywords,
      metaTitle,
      specs,
      faq,
      schema,
    } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) throw new NotFoundError("No Product found");
    const uploadSingle = async (file) => {
      const formatted = formatImage(file);
      const res = await cloudinary.uploader.upload(formatted);
      uploadedPublicIds.push(res.public_id);
      return {
        url: res.secure_url,
        publicId: res.public_id,
      };
    };
    if (req.files?.mainImage?.[0]) {
      if (product.productImagePublicId) {
        await cloudinary.uploader.destroy(product.productImagePublicId);
      }
      const newMainImg = await uploadSingle(req.files.mainImage[0]);
      product.productImage = newMainImg.url;
      product.productImagePublicId = newMainImg.publicId;
    }
    if (req.files?.featuredImage?.[0]) {
      if (product.featuredImagePublicId) {
        await cloudinary.uploader.destroy(product.featuredImagePublicId);
      }
      const newFeatured = await uploadSingle(req.files.featuredImage[0]);
      product.featuredImage = newFeatured.url;
      product.featuredImagePublicId = newFeatured.publicId;
    }
    product.productName = productName;
    product.productCategory = productCategory;
    product.hashRate = hashRate;
    product.power = power;
    product.algorithm = algorithm;
    product.description = description;
    product.overview = overview;
    product.price = price;
    product.manufacturer = manufacturerItem;
    product.cryptoCurrency = JSON.parse(cryptoCurrencyItem);
    product.slug = slug;
    product.metaDescription = metaDescription;
    product.metaKeywords = metaKeywords;
    product.metaTitle = metaTitle;
    product.productSpecifications = specs ? JSON.parse(specs) : [];
    product.productFaq = faq ? JSON.parse(faq) : [];
    product.productSchema = schema;
    await product.save();
    res.status(200).json({ msg: "successfully updated" });
  } catch (error) {
    await cleanupCloudinaryImages(uploadedPublicIds);
    res
      .status(error.statusCode || 500)
      .json({ msg: error.message || error.msg });
  }
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
