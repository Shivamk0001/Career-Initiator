import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    phone: { type: String, default: "" },
    city: { type: String, default: "" },
    favorites: {
      colleges: [{ type: mongoose.Schema.Types.ObjectId, ref: "College" }],
      courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
