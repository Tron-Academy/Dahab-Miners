import { Router } from "express";
import {
  addNewData,
  bulkUpload,
  deleteData,
  DownloadCSV,
  getAllDatas,
  getSingleData,
  restrictedUpdate,
  updateSingleData,
} from "../controllers/adminDataController.js";
import { validateDataInput } from "../middleware/validationMiddleware.js";
import { isEditor, isSuperAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/addData", validateDataInput, isSuperAdmin, addNewData);
router.post("/bulkData", isSuperAdmin, bulkUpload);
router.get("/getData", getAllDatas);
router.get("/download-csv", DownloadCSV);
router.get("/getData/:id", getSingleData);
router.patch("/updateData/:id", validateDataInput, updateSingleData);
router.patch("/updateRestricted/:id", isEditor, restrictedUpdate);
router.delete("/deleteData/:id", isSuperAdmin, deleteData);

export default router;
