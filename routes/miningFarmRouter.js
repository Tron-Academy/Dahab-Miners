import { Router } from "express";
import {
  addNewMiningFarm,
  bulkMoveFarm,
  createFarmAnnouncement,
  deleteMiningFarm,
  editMiningFarm,
  getAllMinersInFarm,
  getAllMiningFarms,
  updateFarmStatus,
  updateMinerStatusBulk,
} from "../controllers/miningFarmController.js";
import {
  validateAddMiningFarm,
  validateBulkMoveFarm,
  validateBulkUpdateMinerStatus,
  validateCreateAnnouncement,
  validateUpdateFarmStatus,
  validateUpdateMiningFarm,
} from "../middleware/validationMiddleware.js";

const router = Router();

router.get("/", getAllMiningFarms);
router.get("/miners/:id", getAllMinersInFarm);
router.post("/", validateAddMiningFarm, addNewMiningFarm);
router.post(
  "/announcement",
  validateCreateAnnouncement,
  createFarmAnnouncement,
);
router.patch("/", validateUpdateMiningFarm, editMiningFarm);
router.patch("/status", validateUpdateFarmStatus, updateFarmStatus);
router.patch(
  "/bulk-status",
  validateBulkUpdateMinerStatus,
  updateMinerStatusBulk,
);
router.patch("/bulk-move", validateBulkMoveFarm, bulkMoveFarm);
router.delete("/:id", deleteMiningFarm);

export default router;
