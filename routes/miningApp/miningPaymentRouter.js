import { Router } from "express";
import express from "express";
import {
  createPaymentIntent,
  deleteWebHook,
  getPaymentIntent,
  processWebHook,
  registerWebhook,
} from "../../controllers/miningApp/miningPaymentController.js";
import bodyParser from "body-parser";
import { authenticateUser } from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/create-intent", authenticateUser, createPaymentIntent);
router.get("/create-intent/:ziinaId", authenticateUser, getPaymentIntent);
router.post("/webhooks/register", registerWebhook);
router.delete("/webhooks/delete", deleteWebHook);
router.post(
  "/webhooks/ziina",
  express.raw({ type: "application/json" }),
  processWebHook
);

export default router;
