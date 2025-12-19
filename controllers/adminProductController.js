import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { formatImage } from "../middleware/multerMiddleware.js";
import Product from "../models/ProductModel.js";
import { v2 as cloudinary } from "cloudinary";
import { cleanupCloudinaryImages } from "../utils/cloudinaryFunctions.js";

// export const addNewProduct = async (req, res) => {
//   const newProduct = new Product({
//     productName: req.body.productName,
//     hashRate: req.body.hashRate,
//     productImage: req.body.productImage,
//     productImagePublicId: req.body.productImagePublicId,
//     featuredImage: req.body.featuredImage,
//     featuredImagePublicId: req.body.featuredImagePublicId,
//     power: req.body.power,
//     algorithm: req.body.algorithm,
//     description: req.body.description,
//     price: req.body.price,
//     manufacturer: req.body.manufacturerItem,
//     cryptoCurrency: req.body.cryptoCurrencyItem,
//     slug: req.body.slug,
//     metaDescription: req.body.metaDescription,
//     metaKeywords: req.body.metaKeywords,
//     metaTitle: req.body.metaTitle,
//   });
//   await newProduct.save();
//   res.status(201).json({ msg: "success" });
// };

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
      productImage: mainImage.url || "",
      productImagePublicId: mainImage.publicId || "",
      featuredImage: featuredImage.url || "",
      featuredImagePublicId: featuredImage.publicId || "",
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
