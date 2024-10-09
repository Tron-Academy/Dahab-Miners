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
  removeFeatured,
  updateFeaturedImage,
  updateProductImage,
  uploadProductImage,
} from "../controllers/adminProductController.js";
import upload from "../middleware/multerMiddleware.js";

const router = Router();

router.get("/", getAllProductsAdmin);
router.post("/", validateAddProductInput, addNewProduct);
router.post(
  "/product-image",
  upload.single("productImage"),
  uploadProductImage
);
router.post(
  "/featured-image",
  upload.single("featuredImage"),
  uploadProductImage
);
router.patch(
  "/product-image/:id",
  validateSingleAdminProductId,
  upload.single("productImage"),
  updateProductImage
);
router.patch(
  "/featured-image/:id",
  validateSingleAdminProductId,
  upload.single("featuredImage"),
  updateFeaturedImage
);
router.patch("/make-featured", makeFeatured);
router.patch("/remove-featured", removeFeatured);
router.get("/:id", validateSingleAdminProductId, getSingleProductAdmin);
router.patch("/:id", validateAddProductInput, editProduct);
router.delete("/:id", deleteProduct);

export default router;
