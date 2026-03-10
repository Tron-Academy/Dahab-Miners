import { Router } from "express";
import {
  addNewWarranty,
  getAllMinersWithoutWarranty,
  getAllWarranties,
  getSingleWarranty,
  getWarrantyStats,
  updateWarranty,
} from "../controllers/adminWarrantyController.js";
import {
  validateAddWarranty,
  validateUpdateWarranty,
} from "../middleware/validationMiddleware.js";

const router = Router();

router.get("/", getAllWarranties);
router.get("/stats", getWarrantyStats);
router.get("/no-warranty", getAllMinersWithoutWarranty);
router.get("/:id", getSingleWarranty);
router.post("/", validateAddWarranty, addNewWarranty);
router.patch("/", validateUpdateWarranty, updateWarranty);

export default router;
