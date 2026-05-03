import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    examDate: { type: Date },
    mode: { type: String, enum: ["Online", "Offline", "Hybrid"], default: "Offline" },
    eligibility: { type: String, default: "" },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Exam", examSchema);
