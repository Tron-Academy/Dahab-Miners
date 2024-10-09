import { Router } from "express";
import {
  getAllUserBlogs,
  getRelatedBlogs,
  getSingleUserBlog,
} from "../controllers/userBlogController.js";

const router = Router();

router.get("/", getAllUserBlogs);
router.get("/related/:id", getRelatedBlogs);
router.get("/:id", getSingleUserBlog);

export default router;
