import { Router } from "express";
import { authenticateUser, isAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
import {
  addNewEvent,
  deleteEvent,
  deleteImage,
  editEvent,
  getAllEvents,
  getSingleEvent,
} from "../controllers/eventController.js";
import {
  validateAddEvent,
  validateDeleteImage,
} from "../middleware/validationMiddleware.js";

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
router.get("/:id", getSingleEvent);

router.patch(
  "/delete-image",
  authenticateUser,
  isAdmin,
  validateDeleteImage,
  deleteImage
);
router.patch(
  "/:id",
  authenticateUser,
  isAdmin,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "smallImage", maxCount: 1 },
    { name: "extraImage", maxCount: 1 },
    { name: "carouselImages", maxCount: 7 },
  ]),
  validateAddEvent,
  editEvent
);
router.delete("/:id", authenticateUser, isAdmin, deleteEvent);

export default router;
