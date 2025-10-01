// models/user.ts - Update your existing model
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
    default: 10,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;