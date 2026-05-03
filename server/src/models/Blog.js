import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: "" },
    content: { type: String, required: true },
    category: { type: String, default: "Latest Updates" },
    coverImage: { type: String, default: "" },
    authorName: { type: String, default: "Career Initiator Team" }
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
