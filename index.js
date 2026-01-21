import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import morgan from "morgan";
import cron from "node-cron";
import helmet from "helmet";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";
// import xss from "xss-clean";
import rateLimit from "express-rate-limit";

import errorHandlerMiddleware from "./middleware/errorHandleMiddleware.js";
import { calculateAndDeductHostingFee } from "./cronJobs/walletDeductions.js";
import {
  authenticateUser,
  isAdmin,
  isIntermine,
  isSuperAdmin,
} from "./middleware/authMiddleware.js";
import { addS19Revenue } from "./cronJobs/S19KRevenueAutomation.js";
import { getBitcoinData } from "./cronJobs/GetBitcoinData.js";

import authRouter from "./routes/authRouter.js";
import adminProductRouter from "./routes/adminProductRouter.js";
import userProductRouter from "./routes/userProductRouter.js";
import adminBlogRouter from "./routes/adminBlogRouter.js";
import adminDashboardRouter from "./routes/adminDashboardRouter.js";
import userBlogRouter from "./routes/userBlogRouter.js";
import dataRouter from "./routes/adminDataRouter.js";
import repairRouter from "./routes/repairRouter.js";
import inventoryRouter from "./routes/inventoryRouter.js";
import alertRouter from "./routes/alertRouter.js";
import miningAuthRouter from "./routes/miningApp/miningAuthRouter.js";
import miningProductRouter from "./routes/miningApp/miningProductRouter.js";
import miningRevenueRouter from "./routes/miningApp/miningRevenueRouter.js";
import miningPayoutRouter from "./routes/miningApp/miningPayoutRouter.js";
import miningSatsRouter from "./routes/miningApp/miningSatsAndUptimeRouter.js";
import miningTermsRouter from "./routes/miningApp/miningTermsRouter.js";
import miningNotificationRouter from "./routes/miningApp/miningNotificationRouter.js";
import miningUserRouter from "./routes/miningApp/miningUserRouter.js";
import miningPaymentRouter from "./routes/miningApp/miningPaymentRouter.js";
import iosRouter from "./routes/miningApp/iosRouter.js";
import miningVoucherRouter from "./routes/miningApp/miningVoucherRouter.js";
import { addA1246AutomatedRevenue } from "./cronJobs/A124RevenueAutomation.js";
import intermineRouter from "./routes/intermine/intermineRouter.js";
import adminNotificationRouter from "./routes/adminNotificationRouter.js";
import adminMessageRouter from "./routes/adminMessageRouter.js";
import extraRouter from "./routes/extraRouter.js";
import eventRouter from "./routes/eventRouter.js";

//Version 2 Routes
import miningUserRouterV2 from "./routes/miningApp/v2/miningUserRouterV2.js";
import miningCartRouter from "./routes/miningApp/v2/miningCartRouter.js";
import leaderboardRouter from "./routes/miningApp/v2/leaderboardRouter.js";

// import { processBitGoPayouts } from "./cronJobs/BitgoCron.js";

const app = express();

app.use(hpp());
app.use(helmet());
app.use(mongoSanitize());
// app.use(xss());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300, // block after 300 requests/15 min
  message: "Too many requests, please try again later.",
});
app.use(limiter);
app.disable("x-powered-by");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  if (req.originalUrl === "/api/mining/payment/webhooks/ziina") {
    next(); // skip express.json for webhook
  } else {
    express.json()(req, res, next);
  }
});
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}
const allowedOrigins = [
  "http://dahabminers.com",
  "https://dahabminers.com",
  "https://mining.dahabminers.com",
  "https://admin.dahabminers.com",
  "http://localhost:5173",
  "http://localhost:3000",
  "https://api.intermine-solutions.de",
];
//Test
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Ensure all necessary methods are allowed
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);
app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Welcome to dahab server");
});

app.use("/api/admin/auth", authRouter);
app.use("/api/admin/product", authenticateUser, isAdmin, adminProductRouter);
app.use("/api/admin/blogs", authenticateUser, adminBlogRouter);
app.use("/api/admin/dashboard", authenticateUser, adminDashboardRouter);
app.use("/api/users/product", userProductRouter);
app.use("/api/users/blogs", userBlogRouter);
app.use("/api/admin/data", authenticateUser, isAdmin, dataRouter);
app.use("/api/admin/repair", authenticateUser, isAdmin, repairRouter);
app.use("/api/admin/inventory", authenticateUser, isAdmin, inventoryRouter);
app.use("/api/admin/alerts", authenticateUser, isAdmin, alertRouter);
app.use("/api/mining/auth", miningAuthRouter);
app.use("/api/mining/product", authenticateUser, miningProductRouter);
app.use("/api/mining/revenue", miningRevenueRouter);
app.use("/api/mining/payout", authenticateUser, miningPayoutRouter);
app.use("/api/mining/sats", authenticateUser, miningSatsRouter);
app.use("/api/mining/terms", miningTermsRouter);
app.use(
  "/api/mining/notifications",
  authenticateUser,
  miningNotificationRouter,
);
app.use("/api/mining/users", authenticateUser, isSuperAdmin, miningUserRouter);
app.use("/api/mining/payment", miningPaymentRouter);
app.use("/api/mining/ios", iosRouter);
app.use("/api/mining/voucher", authenticateUser, miningVoucherRouter);
app.use("/api/intermine", isIntermine, intermineRouter);
app.use(
  "/api/admin/notification",
  authenticateUser,
  isSuperAdmin,
  adminNotificationRouter,
);
app.use(
  "/api/admin/messages",
  authenticateUser,
  isSuperAdmin,
  adminMessageRouter,
);
app.use("/api/events", eventRouter);
app.use("/api/extra", extraRouter);

//version 2 routes
app.use("/api/v2/user", authenticateUser, miningUserRouterV2);
app.use("/api/v2/cart", authenticateUser, miningCartRouter);
app.use("/api/v2/leaderboard", authenticateUser, leaderboardRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not Found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
// const uri =
//   process.env.NODE_ENV === "production"
//     ? process.env.MONGODB_URI
//     : process.env.MONGODB_URI_DEV;
try {
  await mongoose.connect(process.env.MONGODB_URI);
  cron.schedule(
    "58 0 * * *",
    async () => {
      console.log("Running hosting fee deduction job...");
      await calculateAndDeductHostingFee();
    },
    {
      timezone: "Asia/Dubai", // UAE time zone
    },
  );
  cron.schedule(
    "15 0 * * *",
    async () => {
      console.log("Cron revenue started running");
      await addS19Revenue();
    },
    {
      timezone: "Asia/Dubai", // UAE time zone
    },
  );
  cron.schedule(
    "50 1 * * *",
    async () => {
      console.log("Cron for A1246 revenue and hosting started running");
      await addA1246AutomatedRevenue();
    },
    { timezone: "Asia/Dubai" },
  );
  cron.schedule(
    "10 0 * * *",
    async () => {
      console.log("Cron JOb for BTC Data started running");
      await getBitcoinData();
    },
    {
      timezone: "Asia/Dubai", // UAE time zone
    },
  );

  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
