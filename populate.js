import * as dotenv from "dotenv";
dotenv.config();
import { readFile } from "fs/promises";
import mongoose from "mongoose";
import Data from "./models/DataModel.js";

try {
  await mongoose.connect(process.env.MONGODB_URI);
  const newData = JSON.parse(
    await readFile(new URL("./utils/sampleData.json", import.meta.url))
  );
  const datas = newData.map((data) => data);
  await Data.deleteMany();
  await Data.create(datas);
  console.log("success..");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
