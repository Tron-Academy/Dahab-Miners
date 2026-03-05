import { Router } from "express";
import {
  validateAddClient,
  validateAddInternalNote,
  validateEditClient,
} from "../middleware/validationMiddleware.js";
import {
  addClientNote,
  addNewClient,
  clearClientNotes,
  editClient,
  getAllClients,
  getSingleClient,
} from "../controllers/adminClientController.js";

const router = Router();

router.post("/", validateAddClient, addNewClient);
router.get("/", getAllClients);
router.get("/:id", getSingleClient);
router.patch("/", validateEditClient, editClient);
router.patch("/add-note", validateAddInternalNote, addClientNote);
router.patch("/clear-note", clearClientNotes);

export default router;
