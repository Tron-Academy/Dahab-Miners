import { Router } from "express";
import { getIsIosTrue } from "../../controllers/miningApp/iosController.js";

const router = Router();

router.get("/", getIsIosTrue);

export default router;
