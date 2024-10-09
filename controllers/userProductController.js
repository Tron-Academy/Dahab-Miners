import { NotFoundError } from "../errors/customErrors.js";
import Product from "../models/ProductModel.js";

export const getAllUserProducts = async (req, res) => {
  const {
    keyWord,
    cryptoCurrencyOption,
    manufacturerOptions,
    sortby,
    currentPage,
  } = req.query;
  const queryObject = {};
  if (keyWord && keyWord !== "") {
    queryObject.productName = { $regex: keyWord, $options: "i" };
  }
  if (cryptoCurrencyOption && cryptoCurrencyOption !== "ALL") {
    queryObject.cryptoCurrency = cryptoCurrencyOption;
  }
  if (manufacturerOptions && manufacturerOptions !== "ALL") {
    queryObject.manufacturer = manufacturerOptions;
  }
  const sortOptions = {
    Newest: "-createdAt",
    Oldest: "createdAt",
  };
  const page = currentPage || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const sortKey = sortOptions[sortby] || sortOptions.Newest;
  const products = await Product.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);
  if (!products) throw new NotFoundError("No product found");
  const totalProducts = await Product.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalProducts / limit);
  res
    .status(200)
    .json({ msg: "success", products, totalProducts, page, numOfPages });
};

export const getFeaturedProducts = async (req, res) => {
  const products = await Product.find({ isFeatured: true });
  if (!products) throw new NotFoundError("No products found");
  res.status(200).json({ msg: "success", products });
};
