import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";

const DEFAULT_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "carrerinitiatoradmin@gmail.com").toLowerCase().trim();
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "hSU6yFD2bcr1tcaz";
const DEFAULT_ADMIN_NAME = "Platform Admin";

/** Legacy accounts that should be merged into the current admin email + password. */
const LEGACY_ADMIN_EMAILS = ["admin@gmail.com"];

/**
 * If an old admin row exists under a legacy email, move it to the target email
 * (or merge into an existing target user) and set the new password hash.
 */
async function migrateLegacyAdmin(targetEmail, plainPassword) {
  const hashed = await bcrypt.hash(plainPassword, 10);

  for (const legacy of LEGACY_ADMIN_EMAILS) {
    const legacyEmail = legacy.toLowerCase();
    if (legacyEmail === targetEmail) continue;

    const legacyUser = await User.findOne({ email: legacyEmail });
    if (!legacyUser) continue;

    const targetUser = await User.findOne({ email: targetEmail });

    if (targetUser && !targetUser._id.equals(legacyUser._id)) {
      targetUser.password = hashed;
      targetUser.role = "admin";
      targetUser.name = targetUser.name || legacyUser.name || DEFAULT_ADMIN_NAME;
      await targetUser.save();
      await User.deleteOne({ _id: legacyUser._id });
      console.log(`Removed legacy admin (${legacyEmail}); updated existing ${targetEmail}.`);
      return true;
    }

    legacyUser.email = targetEmail;
    legacyUser.password = hashed;
    legacyUser.role = "admin";
    legacyUser.name = legacyUser.name || DEFAULT_ADMIN_NAME;
    await legacyUser.save();
    console.log(`Migrated legacy admin ${legacyEmail} -> ${targetEmail}.`);
    return true;
  }

  return false;
}

async function upsertPlatformAdmin(email, password, name) {
  const targetEmail = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await User.findOne({ email: targetEmail });
  if (existing) {
    existing.role = "admin";
    existing.name = existing.name || name;
    existing.password = hashedPassword;
    await existing.save();
    console.log(`Admin updated: ${targetEmail} (password re-hashed, role admin).`);
  } else {
    await User.create({
      name,
      email: targetEmail,
      password: hashedPassword,
      role: "admin"
    });
    console.log(`Admin created: ${targetEmail}`);
  }
}

async function seedAdmin() {
  await connectDB();

  const email = (process.argv[2] || DEFAULT_ADMIN_EMAIL).toLowerCase().trim();
  const password = process.argv[3] || DEFAULT_ADMIN_PASSWORD;
  const name = DEFAULT_ADMIN_NAME;

  if (!email || !password) {
    console.error("Email and password are required.");
    process.exit(1);
  }

  await migrateLegacyAdmin(email, password);
  await upsertPlatformAdmin(email, password, name);

  console.log("Done. Ensure server .env ADMIN_EMAIL / ADMIN_PASSWORD match if you set them.");
  process.exit(0);
}

seedAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
