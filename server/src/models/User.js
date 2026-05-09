import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isBlocked: { type: Boolean, default: false },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    stream: { type: String, default: "" },
    qualification: { type: String, default: "" },
    educationLevel: { type: String, default: "" },
    favorites: {
      colleges: [{ type: mongoose.Schema.Types.ObjectId, ref: "College" }],
      courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
