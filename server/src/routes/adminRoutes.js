import express from "express";
import User from "../models/User.js";
import { protect, authorize } from "../middleware/auth.js";
import { resourceMap } from "../utils/resourceMap.js";
import { slugify } from "../utils/slugify.js";

const router = express.Router();

router.use(protect, authorize("admin"));

router.get("/stats", async (req, res) => {
  const [users, colleges, courses, exams, careers, blogs] = await Promise.all([
    User.countDocuments(),
    resourceMap.colleges.countDocuments(),
    resourceMap.courses.countDocuments(),
    resourceMap.exams.countDocuments(),
    resourceMap.careers.countDocuments(),
    resourceMap.blogs.countDocuments()
  ]);

  res.json({ users, colleges, courses, exams, careers, blogs });
});

router.get("/users", async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
});

router.patch("/users/:id/role", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role: req.body.role === "admin" ? "admin" : "student" },
    { new: true }
  ).select("-password");
  res.json(user);
});

router.post("/:resource", async (req, res) => {
  const Model = resourceMap[req.params.resource];
  if (!Model) return res.status(404).json({ message: "Unknown resource" });

  const payload = { ...req.body };
  if (!payload.slug && (payload.name || payload.title)) {
    payload.slug = slugify(payload.name || payload.title);
  }
  const item = await Model.create(payload);
  res.status(201).json(item);
});

router.put("/:resource/:id", async (req, res) => {
  const Model = resourceMap[req.params.resource];
  if (!Model) return res.status(404).json({ message: "Unknown resource" });

  const payload = { ...req.body };
  if (!payload.slug && (payload.name || payload.title)) {
    payload.slug = slugify(payload.name || payload.title);
  }
  const item = await Model.findByIdAndUpdate(req.params.id, payload, { new: true });
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
});

router.delete("/:resource/:id", async (req, res) => {
  const Model = resourceMap[req.params.resource];
  if (!Model) return res.status(404).json({ message: "Unknown resource" });

  await Model.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
