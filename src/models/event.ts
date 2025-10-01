// models/event.ts
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    required: true,
    enum: [
      "user_signup",
      "resume_generated", 
      "testimonial_submitted",
      "testimonial_approved",
      "credit_used",
      "support_request",
      "page_view"
    ]
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;