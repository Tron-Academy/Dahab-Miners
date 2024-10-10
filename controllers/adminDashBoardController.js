import { NotFoundError } from "../errors/customErrors.js";
import Blog from "../models/BlogModel.js";
import Product from "../models/ProductModel.js";

export const getDashboardStats = async (req, res) => {
  const products = await Product.countDocuments();
  if (!products) throw new NotFoundError("No products");
  const blogs = await Blog.countDocuments();
  if (!blogs) throw new NotFoundError("No blogs");
  res.status(200).json({ msg: "success", products, blogs });
};
