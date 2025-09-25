import { Router } from "express";
import express from "express";
import {
  createCryptoPaymentIntent,
  createPaymentIntent,
  deleteWebHook,
  deusxWebhook,
  getCryptoPaymentIntent,
  getCryptoTransactions,
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
router.post(
  "/create-crypto-intent",
  authenticateUser,
  createCryptoPaymentIntent
);
router.get(
  "/create-crypto-intent/:id",
  authenticateUser,
  getCryptoPaymentIntent
);
router.post(
  "/webhooks/deusx",
  express.raw({ type: "application/json" }),
  deusxWebhook
);
router.get("/crypto-transactions", authenticateUser, getCryptoTransactions);

export default router;
