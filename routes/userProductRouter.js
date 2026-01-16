import { Router } from "express";
import {
  getAllUserProducts,
  getFeaturedProducts,
  getSingleProduct,
  getTopRatedProducts,
} from "../controllers/userProductController.js";

const router = Router();

router.get("/", getAllUserProducts);
router.get("/featured", getFeaturedProducts);
router.get("/toprated", getTopRatedProducts);
router.get("/:slug", getSingleProduct);

export default router;
