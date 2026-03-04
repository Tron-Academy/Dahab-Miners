import { Router } from "express";
import {
  addNewMinerModel,
  deleteMinerModel,
  editMinerModel,
  getAllMinerModels,
  getAllMinerModelsForDropdown,
  getSingleMinerModel,
} from "../controllers/minerModelController.js";
import { validateAddMinerModel } from "../middleware/validationMiddleware.js";

const router = Router();

router.get("/", getAllMinerModels);
router.get("/dropdown", getAllMinerModelsForDropdown);
router.get("/:id", getSingleMinerModel);
router.post("/", validateAddMinerModel, addNewMinerModel);
router.patch("/:id", validateAddMinerModel, editMinerModel);
router.delete("/:id", deleteMinerModel);

export default router;
