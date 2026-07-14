// import { v4 as uuid4 } from "uuid";

// const batch = uuid4();
// const now = new Date().toISOString();

// console.log(batch);
// console.log(now);

import crypto from "crypto";

const apiKey = crypto.randomBytes(32).toString("hex");

console.log(apiKey);
