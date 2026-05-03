import express from "express";
import { resourceMap } from "../utils/resourceMap.js";

const router = express.Router();

router.get("/:resource", async (req, res) => {
  const Model = resourceMap[req.params.resource];
  if (!Model) return res.status(404).json({ message: "Unknown resource" });

  const { search = "", location, minFees, maxFees, type } = req.query;
  const query = {};
  const searchableField = req.params.resource === "careers" ? "title" : "name";

  if (search) query[searchableField] = { $regex: search, $options: "i" };
  if (location) query.location = location;
  if (type) query.collegeType = type;

  if (minFees || maxFees) {
    query.fees = {
      ...(minFees ? { $gte: Number(minFees) } : {}),
      ...(maxFees ? { $lte: Number(maxFees) } : {})
    };
  }

  const items = await Model.find(query).sort({ createdAt: -1 });
  res.json(items);
});

router.get("/:resource/:slug", async (req, res) => {
  const Model = resourceMap[req.params.resource];
  if (!Model) return res.status(404).json({ message: "Unknown resource" });

  const item = await Model.findOne({ slug: req.params.slug });
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
});

export default router;
