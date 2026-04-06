import { Router } from "express";
import {
  addNewData,
  addNewDataV2,
  bulkUpload,
  deleteData,
  deleteDataV2,
  DownloadCSV,
  editV2Data,
  getAllDatas,
  getDataDropdown,
  getSingleData,
  restrictedUpdate,
  updateSingleData,
} from "../controllers/adminDataController.js";
import {
  validateDataInput,
  validateDataV2Input,
} from "../middleware/validationMiddleware.js";
import { isEditor, isSuperAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/addData", validateDataInput, isSuperAdmin, addNewData);
router.post("/addDataV2", validateDataV2Input, isSuperAdmin, addNewDataV2);
router.post("/bulkData", isSuperAdmin, bulkUpload);
router.get("/getData", getAllDatas);
router.get("/download-csv", DownloadCSV);
router.get("/dropdown", getDataDropdown);
router.get("/getData/:id", getSingleData);
router.patch("/updateData/:id", validateDataInput, updateSingleData);
router.patch("/updateDataV2/:id", validateDataV2Input, editV2Data);
router.patch("/updateRestricted/:id", isEditor, restrictedUpdate);
router.delete("/deleteData/:id", isSuperAdmin, deleteData);
router.delete("/deleteDataV2/:id", isSuperAdmin, deleteDataV2);

export default router;
