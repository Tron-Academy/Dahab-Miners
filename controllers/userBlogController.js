import { NotFoundError } from "../errors/customErrors.js";
import Blog from "../models/BlogModel.js";

export const getAllUserBlogs = async (req, res) => {
  const blogs = (await Blog.find()).reverse();
  if (!blogs) throw new NotFoundError("No blogs found");
  res.status(200).json({ msg: "success", blogs });
};

export const getSingleUserBlog = async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.id });
  if (!blog) throw new NotFoundError("No blog found");
  res.status(200).json({ msg: "success", blog });
};

export const getRelatedBlogs = async (req, res) => {
  const blogs = await Blog.find({ slug: { $ne: req.params.id } });
  if (!blogs) throw new NotFoundError("No blogs found");
  res.status(200).json({ msg: "success", blogs });
};
