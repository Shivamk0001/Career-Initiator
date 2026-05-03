import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    stream: { type: String, default: "" },
    avgSalary: { type: Number, default: 0 },
    skills: [{ type: String }],
    roadmap: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Career", careerSchema);
