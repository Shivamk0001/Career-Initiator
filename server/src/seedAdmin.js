import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";

async function seedAdmin() {
  await connectDB();

  const email = process.argv[2] || "carrerinitiatoradmin@gmail.com";
  const password = process.argv[3] || "hSU6yFD2bcr1tcaz";
  const name = "Platform Admin";

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    existing.role = "admin";
    existing.name = existing.name || name;
    if (password) existing.password = await bcrypt.hash(password, 10);
    await existing.save();
    console.log("Existing user promoted to admin");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email: email.toLowerCase(), password: hashedPassword, role: "admin" });
    console.log("Admin user created");
  }

  process.exit(0);
}

seedAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
