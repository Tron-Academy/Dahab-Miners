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
  walletInfo,
} from "../../controllers/miningApp/miningPaymentController.js";
import { authenticateUser } from "../../middleware/authMiddleware.js";
import {
  validateCreateCryptoIntentInput,
  validateCreateIntentInput,
} from "../../middleware/validationMiddleware.js";

const router = Router();

router.post(
  "/create-intent",
  authenticateUser,
  validateCreateIntentInput,
  createPaymentIntent
);
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
  validateCreateCryptoIntentInput,
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
router.get("/wallet-info", walletInfo);
router.get("/crypto-transactions", authenticateUser, getCryptoTransactions);

export default router;
