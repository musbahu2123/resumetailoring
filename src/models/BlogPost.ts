// models/BlogPost.ts - OPTIMIZED FIELD ORDER
import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
  // Core content fields
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "/images/blog/default.jpg",
  },

  // SEO fields
  metaTitle: String,
  metaDescription: String,
  focusKeyword: String,

  // Categorization
  category: {
    type: String,
    required: true,
    enum: [
      "AI Tools",
      "Resume Tips",
      "Cover Letters",
      "Templates",
      "Career Advice",
      "ATS Optimization",
    ],
  },
  author: {
    type: String,
    default: "Resume Expert",
  },

  // Publishing info
  readTime: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  publishedAt: {
    type: Date,
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-update updatedAt on save
blogPostSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const BlogPost =
  mongoose.models.BlogPost || mongoose.model("BlogPost", blogPostSchema);

export default BlogPost;
