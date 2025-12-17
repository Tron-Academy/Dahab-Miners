import { Router } from "express";
import { authenticateUser, isAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
import { addNewEvent, getAllEvents } from "../controllers/eventController.js";
import { validateAddEvent } from "../middleware/validationMiddleware.js";

const router = Router();

router.post(
  "/",
  authenticateUser,
  isAdmin,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "smallImage", maxCount: 1 },
    { name: "extraImage", maxCount: 1 },
    { name: "carouselImages", maxCount: 7 },
  ]),
  validateAddEvent,
  addNewEvent
);
router.get("/", getAllEvents);

export default router;
