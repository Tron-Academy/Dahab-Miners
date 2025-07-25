import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { formatImage } from "../middleware/multerMiddleware.js";
import { v2 as cloudinary } from "cloudinary";
import Blog from "../models/BlogModel.js";

export const uploadBlogImage = async (req, res) => {
  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.uploader.upload(file);
    res.status(200).json({
      msg: "success",
      url: response.secure_url,
      publicId: response.public_id,
    });
  } else {
    throw new BadRequestError("No file found");
  }
};

export const addNewBlog = async (req, res) => {
  const blog = await Blog.find({ slug: req.body.slug });
  if (blog.length > 0) throw new BadRequestError("Slug already exists");
  const newBlog = new Blog({
    title: req.body.title,
    blogImage: req.body.blogImage,
    blogImagePublicId: req.body.blogImagePublicId,
    content: req.body.content,
    slug: req.body.slug,
    metaTitle: req.body.metaTitle,
    metaDescription: req.body.metaDescription,
    metaKeywords: req.body.metaKeywords || "",
  });
  await newBlog.save();
  res.status(201).json({ msg: "success" });
};

export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  if (!blogs) throw new NotFoundError("No blogs found");
  res.status(200).json({ msg: "success", blogs });
};

export const getSingleBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new NotFoundError("No blog found");
  res.status(200).json({ msg: "success", blog });
};

export const updateBlogImage = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new NotFoundError("No blog found");
  if (req.file) {
    const file = formatImage(req.file);
    if (blog.blogImagePublicId) {
      await cloudinary.uploader.destroy(blog.blogImagePublicId);
    }
    const response = await cloudinary.uploader.upload(file);
    blog.blogImage = response.url;
    blog.blogImagePublicId = response.public_id;
    await blog.save();
    res.status(200).json({
      msg: "success",
      url: response.secure_url,
      publicId: response.public_id,
    });
  } else {
    throw new BadRequestError("No file found");
  }
};

export const editBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new NotFoundError("No blog found");
  const existingBlog = await Blog.findOne({ slug: req.body.slug });
  if (existingBlog && existingBlog._id.toString() !== blog._id.toString()) {
    throw new BadRequestError("slug already exists");
  }
  blog.title = req.body.title;
  blog.blogImage = req.body.blogImage;
  blog.blogImagePublicId = req.body.blogImagePublicId;
  blog.content = req.body.content;
  blog.slug = req.body.slug;
  blog.metaTitle = req.body.metaTitle;
  blog.metaDescription = req.body.metaDescription;
  blog.metaKeywords = req.body.metaKeywords;
  await blog.save();
  res.status(200).json({ msg: "success" });
};

export const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new NotFoundError("No blog found");
  if (blog.blogImagePublicId) {
    await cloudinary.uploader.destroy(blog.blogImagePublicId);
  }
  await Blog.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "success" });
};
//this is a comment
