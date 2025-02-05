import { Router } from "express";
import {
  addNewData,
  deleteData,
  getAllDatas,
  getSingleData,
  updateSingleData,
} from "../controllers/adminDataController.js";
import { validateDataInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/addData", validateDataInput, addNewData);
router.get("/getData", getAllDatas);
router.get("/getData/:id", getSingleData);
router.patch("/updateData/:id", validateDataInput, updateSingleData);
router.delete("/deleteData/:id", deleteData);

export default router;
