import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";

async function seedAdmin() {
  await connectDB();

  const email = process.argv[2] || "admin@careerinitiator.com";
  const password = process.argv[3] || "Admin@123";
  const fullName = "Platform Admin";

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    existing.role = "admin";
    if (password) existing.password = await bcrypt.hash(password, 10);
    await existing.save();
    console.log("Existing user promoted to admin");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ fullName, email: email.toLowerCase(), password: hashedPassword, role: "admin" });
    console.log("Admin user created");
  }

  process.exit(0);
}

seedAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
