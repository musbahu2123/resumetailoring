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
    required: true,
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
    expires: 86400, // Auto-delete after 24 hours
  },
  usedFreeCredit: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.models.AnonymousJob ||
  mongoose.model("AnonymousJob", anonymousJobSchema);
