import { Router } from "express";
import rateLimit from "express-rate-limit";
import { validateBlogSeoApiKey } from "../middleware/blogSeoAuthMiddleware.js";
import { publishBlog } from "../controllers/publishBlogController.js";

const router = Router();

const publishBlogLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { msg: "Rate limit reached. Max 10 requests per hour." },
});

router.post("/", publishBlogLimiter, validateBlogSeoApiKey, publishBlog);

export default router;
