// models/AnonymousJob.ts
import mongoose from "mongoose";

const anonymousJobSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true,
  },
  jobDescriptionText: {
    type: String,
    default: "",
  },
  originalResumeText: {
    type: String,
    required: true,
  },
  tailoredResumeText: String,
  coverLetterText: String,
  atsScore: Number,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2592000, // 30 days (was 24 hours)
  },
  generationType: {
    type: String,
    enum: ["enhance", "tailor", null],
    default: null,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.AnonymousJob ||
  mongoose.model("AnonymousJob", anonymousJobSchema);
