import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

router.put("/me", protect, async (req, res) => {
  const allowedFields = ["name", "phone", "address", "city", "stream", "qualification", "educationLevel"];
  const update = {};
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) update[field] = req.body[field];
  });

  const user = await User.findByIdAndUpdate(req.user._id, update, { new: true }).select("-password");
  res.json(user);
});

router.post("/favorites/:type/:id", protect, async (req, res) => {
  const { type, id } = req.params;
  if (!["colleges", "courses"].includes(type)) {
    return res.status(400).json({ message: "Invalid favorite type" });
  }

  const user = await User.findById(req.user._id);
  if (!user.favorites[type].some((itemId) => itemId.toString() === id)) {
    user.favorites[type].push(id);
  }
  await user.save();

  res.json(user.favorites);
});

router.get("/", protect, authorize("admin"), async (req, res) => {
  const { search = "", role = "all", status = "all", page = 1, limit = 10 } = req.query;
  const pageNumber = Math.max(1, Number(page) || 1);
  const limitNumber = Math.max(1, Math.min(100, Number(limit) || 10));

  const query = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } }
    ];
  }
  if (role !== "all") query.role = role;
  if (status === "blocked") query.isBlocked = true;
  if (status === "active") query.isBlocked = false;

  const [users, total] = await Promise.all([
    User.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber),
    User.countDocuments(query)
  ]);

  res.json({
    users,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber)
    }
  });
});

router.put("/:id", protect, authorize("admin"), async (req, res) => {
  const allowedFields = [
    "name",
    "email",
    "phone",
    "address",
    "city",
    "stream",
    "qualification",
    "educationLevel",
    "role",
    "isBlocked"
  ];
  const update = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      update[field] = field === "email" ? String(req.body[field]).toLowerCase().trim() : req.body[field];
    }
  });

  if (update.role && !["admin", "user"].includes(update.role)) {
    return res.status(400).json({ message: "Invalid role value" });
  }
  if (req.body.password) {
    update.password = await bcrypt.hash(String(req.body.password), 10);
  }
  if (update.qualification && !update.educationLevel) {
    update.educationLevel = update.qualification;
  }

  const user = await User.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true }).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  if (String(req.params.id) === String(req.user._id)) {
    return res.status(400).json({ message: "You cannot delete your own account" });
  }

  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted successfully" });
});

export default router;
