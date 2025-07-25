import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

import errorHandlerMiddleware from "./middleware/errorHandleMiddleware.js";

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
import { authenticateUser, isAdmin } from "./middleware/authMiddleware.js";

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://dahabminers.com",
  "https://dahabminers.com",
  "https://mining.dahabminers.com",
  "http://localhost:5173",
];

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
  })
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

app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not Found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
try {
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
