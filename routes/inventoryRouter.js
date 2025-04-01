import { Router } from "express";
import { isSuperAdmin } from "../middleware/authMiddleware.js";
import {
  addInventoryItem,
  getAllItems,
  getSingleItem,
  updateItem,
} from "../controllers/InventoryController.js";
import { validateAddInventoryInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/", validateAddInventoryInput, isSuperAdmin, addInventoryItem);
router.get("/", getAllItems);
router.get("/:id", getSingleItem);
router.patch("/:id", validateAddInventoryInput, isSuperAdmin, updateItem);

export default router;
