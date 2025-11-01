import { model, Schema } from "mongoose";

const uptimeHistorySchema = new Schema({
  date: { type: Date, required: true },
  uptime: { type: Number, required: true },
});

const A1246UptimeSchema = new Schema(
  {
    A1246Uptime: {
      type: Number,
    },
    uptimeHistory: {
      type: [uptimeHistorySchema],
      default: [],
    },
  },
  { timestamps: true }
);

const A1246Uptime = model("A1246Uptime", A1246UptimeSchema);
export default A1246Uptime;
