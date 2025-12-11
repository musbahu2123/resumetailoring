// models/user.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  image: String,
  credits: {
    type: Number,
    default: 3,
  },
  role: {
    type: String,
    enum: ["free", "pro", "admin"],
    default: "free",
  },
  lastCreditReset: {
    type: Date,
    default: Date.now,
  },
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
