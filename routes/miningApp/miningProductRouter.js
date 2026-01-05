import { Router } from "express";
import {
  addNewMiner,
  assignProduct,
  editSingleMiner,
  getAllMiners,
  getOwnedMiners,
  getSingleMiner,
  selectPayoutMode,
} from "../../controllers/miningApp/miningProductController.js";
import {
  validateAddMiningMiner,
  validateAssignProduct,
} from "../../middleware/validationMiddleware.js";
import upload from "../../middleware/multerMiddleware.js";

const router = Router();

router.get("/miners", getAllMiners);
router.post(
  "/miners",
  upload.single("image"),
  validateAddMiningMiner,
  addNewMiner
);
router.patch(
  "/miners/:id",
  upload.single("image"),
  validateAddMiningMiner,
  editSingleMiner
);
router.get("/miners/:id", getSingleMiner);
router.get("/ownedMiners", getOwnedMiners);
router.post("/payoutMode", selectPayoutMode);
router.post("/assign", validateAssignProduct, assignProduct);
export default router;
