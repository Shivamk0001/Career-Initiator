import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

router.put("/me", protect, async (req, res) => {
  const allowedFields = ["fullName", "phone", "city"];
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

export default router;
