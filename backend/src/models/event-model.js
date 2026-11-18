import mongoose from "mongoose";

export const CATEGORIES = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

// Kurallar schema'da, işlemler modelde
const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String, required: true,
      trim: true, minlength: 3, maxlength: 100,
    },
    category: {
      type: String, required: true,
      enum: CATEGORIES,
    },
    capacity: { type: Number, min: 0, default: 0 },
    date: { type: String, required: true },
    time: { type: String, default: "" },
    location: { type: String, trim: true, default: "" },
    description: {
      type: String, trim: true,
      maxlength: 500, default: "",
    },
  },
  { timestamps: true }, // createdAt ve updatedAt
);

// Model adı "Event" → collection adı "events"
export const Event = mongoose.model("Event", eventSchema);
