// models/Waitlist.ts
import mongoose from "mongoose";

const waitlistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  interest: {
    type: String,
    enum: ["lifetime", "monthly", "yearly", "general"],
    default: "general",
  },
  source: {
    type: String,
    default: "pricing_page",
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  notifiedAt: Date,
  // Optional: Track if user converted to paid
  convertedAt: Date,
  convertedTo: String, // "lifetime", "monthly", "yearly"
});

export default mongoose.models.Waitlist ||
  mongoose.model("Waitlist", waitlistSchema);
