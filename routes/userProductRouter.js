import { Router } from "express";
import {
  getAllUserProducts,
  getFeaturedProducts,
  getSingleProduct,
} from "../controllers/userProductController.js";

const router = Router();

router.get("/", getAllUserProducts);
router.get("/featured", getFeaturedProducts);
router.get("/:id", getSingleProduct);

export default router;
