import { Router } from "express";
import { isAdmin } from "../../middleware/authMiddleware.js";
import {
  addNewVoucher,
  deleteVoucher,
  editVoucher,
  getAllVouchers,
  getSingleVoucher,
  getUserVouchers,
} from "../../controllers/miningApp/miningVocherController.js";
import { validateAddMiningVoucher } from "../../middleware/validationMiddleware.js";

const router = Router();

router.post("/", isAdmin, validateAddMiningVoucher, addNewVoucher);
router.get("/", getAllVouchers);
router.get("/user", getUserVouchers);
router.get("/:id", isAdmin, getSingleVoucher);
router.patch("/:id", isAdmin, validateAddMiningVoucher, editVoucher);
router.delete("/:id", isAdmin, deleteVoucher);

export default router;
