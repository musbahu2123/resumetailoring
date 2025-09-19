// models/job.ts
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobDescriptionText: {
    type: String,
    required: true,
  },
  originalResumeText: {
    type: String,
    required: true,
  },
  tailoredResumeText: {
    type: String,
  },
  coverLetterText: {
    type: String,
  },
  atsScore: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export default Job;