import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    location: { type: String, default: "" },
    collegeType: { type: String, enum: ["Government", "Private", "Deemed"], default: "Private" },
    fees: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    description: { type: String, default: "" },
    logoUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("College", collegeSchema);
