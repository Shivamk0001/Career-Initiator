import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    level: { type: String, enum: ["UG", "PG", "Diploma", "Certificate"], default: "UG" },
    duration: { type: String, default: "" },
    fees: { type: Number, default: 0 },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
