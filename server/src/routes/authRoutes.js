import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
}

function normalizeUserPayload(body = {}) {
  const name = (body.name || body.fullName || "").trim();
  const email = (body.email || "").toLowerCase().trim();
  const password = body.password || "";
  const phone = (body.phone || "").trim();

  let address = (body.address || "").trim();
  const city = (body.city || "").trim();
  if (city) {
    if (!address) {
      address = city;
    } else if (!address.includes(city)) {
      address = `${address}, ${city}`;
    }
  }

  const stream = (body.stream || "").trim();
  const level = (body.level || "").trim();
  const educationLevel = (body.educationLevel || level || "").trim();
  const qualification = (body.qualification || level || educationLevel || "").trim();

  return {
    name,
    email,
    password,
    phone,
    address,
    stream,
    qualification,
    educationLevel: educationLevel || qualification
  };
}

function resolveRole(email, plainPassword) {
  return email === ADMIN_EMAIL && plainPassword === ADMIN_PASSWORD ? "admin" : "user";
}

router.post(["/signup", "/register"], async (req, res) => {
  try {
    const { name, email, password, phone, address, stream, qualification, educationLevel } =
      normalizeUserPayload(req.body);
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      stream,
      qualification,
      educationLevel,
      city: "",
      role: resolveRole(email, password)
    });

    return res.status(201).json({
      token: signToken(user._id),
      user: { id: user._id, name: user.name || user.fullName || "", email: user.email, role: user.role }
    });
  } catch (error) {
    return res.status(500).json({ message: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body?.email?.toLowerCase()?.trim();
    const password = req.body?.password || "";

    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    if (user.isBlocked) return res.status(403).json({ message: "Your account has been blocked. Contact admin." });

    // Always validate password against the stored hash first.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Admin credentials are an EXTRA condition for returning "admin" role.
    const isAdminLogin = email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
    const role = isAdminLogin ? "admin" : "user";

    // Keep DB in sync with the admin-credentials rule.
    // Use update query instead of document.save() to avoid legacy-document validation issues.
    if (user.role !== role) {
      await User.updateOne({ _id: user._id }, { $set: { role } });
    }

    return res.json({
      token: signToken(user._id),
      user: {
        id: user._id,
        name: user.name || user.fullName || "",
        email: user.email,
        role
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Login failed" });
  }
});

export default router;
