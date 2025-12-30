import { Router } from "express";
import {
  getBTCleaderboard,
  getHashrateLeaderboard,
  getMinerLeaderboard,
} from "../../../controllers/miningApp/v2/leaderboardController.js";

const router = Router();

router.get("/miners", getMinerLeaderboard);
router.get("/hashrate", getHashrateLeaderboard);
router.get("/btc", getBTCleaderboard);

export default router;
