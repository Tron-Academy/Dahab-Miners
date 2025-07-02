import * as dotenv from "dotenv";
dotenv.config();
import { readFile } from "fs/promises";
import mongoose from "mongoose";
import Data from "./models/DataModel.js";
import MiningProduct from "./models/miningApp/MiningProduct.js";

try {
  await mongoose.connect(process.env.MONGODB_URI);
  const newData = JSON.parse(
    await readFile(new URL("./utils/sampleData.json", import.meta.url))
  );
  const datas = newData.map((data) => data);
  // await Data.deleteMany();
  await MiningProduct.create(datas);
  console.log("success..");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
