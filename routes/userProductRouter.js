import { Router } from "express";
import {
  getAllUserProducts,
  getFeaturedProducts,
} from "../controllers/userProductController.js";

const router = Router();

router.get("/", getAllUserProducts);
router.get("/featured", getFeaturedProducts);

export default router;
