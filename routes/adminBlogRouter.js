import { Router } from "express";
import upload from "../middleware/multerMiddleware.js";
import {
  addNewBlog,
  deleteBlog,
  editBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlogImage,
  uploadBlogImage,
} from "../controllers/adminBlogController.js";
import { validateBlogInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.get("/", getAllBlogs);
router.get("/:id", getSingleBlog);
router.post("/", validateBlogInput, addNewBlog);
router.delete("/:id", deleteBlog);
router.post("/blog-image", upload.single("blogImage"), uploadBlogImage);
router.patch("/blog-image/:id", upload.single("blogImage"), updateBlogImage);
router.patch("/edit/:id", validateBlogInput, editBlog);

export default router;
