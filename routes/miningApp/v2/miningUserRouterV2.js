import { Router } from "express";
import {
  getProfitModeTransactions,
  getUserInfoV2,
  updateProfilePic,
  walletTransactions,
} from "../../../controllers/miningApp/v2/miningUserControllerV2.js";
import upload from "../../../middleware/multerMiddleware.js";

const router = Router();

router.get("/info", getUserInfoV2);
router.get("/profit-transactions", getProfitModeTransactions);
router.get("/wallet-transactions", walletTransactions);
router.patch(
  "/update-profile-pic",
  upload.single("profilePic"),
  updateProfilePic
);

export default router;
