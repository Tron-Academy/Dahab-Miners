import sanitizeHtml from "sanitize-html";
import Blog from "../models/BlogModel.js";
import { BadRequestError } from "../errors/customErrors.js";

const logRequest = (req, status, message) => {
  console.log(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      source: "BlogSEO",
      ip: req.ip,
      status,
      message,
      slug: req.body?.article?.slug || null,
      title: req.body?.article?.title || null,
    })
  );
};

export const publishBlog = async (req, res) => {
  const { article, main_image } = req.body;

  const title = article?.title;
  const slug = article?.slug;
  const content = article?.content;
  const featured_image_url = article?.main_image_url || main_image?.url || "";
  const meta_title = article?.title || "";
  const meta_description = article?.keyword || "";

  if (!title || !slug || !content) {
    logRequest(req, 400, "Missing required fields");
    throw new BadRequestError("title, slug, and content are required");
  }

  const existingBlog = await Blog.findOne({ slug });
  if (existingBlog) {
    logRequest(req, 400, "Duplicate slug rejected");
    throw new BadRequestError("A post with this slug already exists");
  }

  const sanitizedContent = sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img", "h1", "h2", "figure", "figcaption",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title", "width", "height"],
      "*": ["class", "id"],
    },
  });

  const newBlog = new Blog({
    title,
    slug,
    content: sanitizedContent,
    metaTitle: meta_title,
    metaDescription: meta_description,
    blogImage: featured_image_url,
    blogImagePublicId: "",
    metaKeywords: meta_description,
  });

  await newBlog.save();

  logRequest(req, 201, "Blog post saved successfully");

  res.status(201).json({
    msg: "success",
    post_id: newBlog._id,
    url: `https://dahabminers.com/blogs/${newBlog.slug}`,
  });
};
