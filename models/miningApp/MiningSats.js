import { model, Schema } from "mongoose";

const satHistorySchema = new Schema({
  date: { type: Date, required: true },
  sats: { type: Number, required: true },
});

const MiningSatSchema = new Schema(
  {
    satPerDay: {
      type: Number,
    },
    satHistory: {
      type: [satHistorySchema],
    },
  },
  { timestamps: true }
);

const MiningSats = model("MiningSats", MiningSatSchema);
export default MiningSats;
