import { Router } from "express";
import {
  addNewData,
  deleteData,
  getAllDatas,
  getSingleData,
  restrictedUpdate,
  updateSingleData,
} from "../controllers/adminDataController.js";
import { validateDataInput } from "../middleware/validationMiddleware.js";
import { isEditor, isSuperAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/addData", validateDataInput, isSuperAdmin, addNewData);
router.get("/getData", getAllDatas);
router.get("/getData/:id", getSingleData);
router.patch("/updateData/:id", validateDataInput, updateSingleData);
router.patch("/updateRestricted/:id", isEditor, restrictedUpdate);
router.delete("/deleteData/:id", isSuperAdmin, deleteData);

export default router;
