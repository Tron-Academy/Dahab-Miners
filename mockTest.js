import { v4 as uuid4 } from "uuid";

const batch = uuid4();
const now = new Date().toISOString();

console.log(batch);
console.log(now);
