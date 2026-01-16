import { Router } from "express";
import {
  validateAddProductInput,
  validateSingleAdminProductId,
} from "../middleware/validationMiddleware.js";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  getAllProductsAdmin,
  getSingleProductAdmin,
  makeFeatured,
  makeProductTopRated,
  removeFeatured,
  removeTopRated,
} from "../controllers/adminProductController.js";
import upload from "../middleware/multerMiddleware.js";

const router = Router();

router.get("/", getAllProductsAdmin);
router.post(
  "/",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "featuredImage", maxCount: 1 },
  ]),
  validateAddProductInput,
  addNewProduct
);
router.patch("/make-featured", makeFeatured);
router.patch("/remove-featured", removeFeatured);
router.patch("/make-toprated", makeProductTopRated);
router.patch("/remove-toprated", removeTopRated);
router.get("/:id", validateSingleAdminProductId, getSingleProductAdmin);
router.patch(
  "/:id",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "featuredImage", maxCount: 1 },
  ]),
  validateAddProductInput,
  editProduct
);
router.delete("/:id", deleteProduct);

export default router;
