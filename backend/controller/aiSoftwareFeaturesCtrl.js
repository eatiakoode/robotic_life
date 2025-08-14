const AiSoftwareFeature = require("../models/aiSoftwareFeaturesModel");
const asyncHandler = require("express-async-handler");

// Create AI/Software Feature
const createAiSoftwareFeature = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("AI/Software Feature name is required");
  }
  const feature = await AiSoftwareFeature.create({ name });
  res
    .status(201)
    .json({ message: "AI/Software Feature created successfully", data: feature });
});

// Get All
const getAllAiSoftwareFeatures = asyncHandler(async (req, res) => {
  const features = await AiSoftwareFeature.find().sort({ createdAt: -1 });
  res.json(features);
});

// Get One
const getAiSoftwareFeature = asyncHandler(async (req, res) => {
  const feature = await AiSoftwareFeature.findById(req.params.id);
  if (!feature) {
    res.status(404);
    throw new Error("AI/Software Feature not found");
  }
  res.json(feature);
});

// Update
const updateAiSoftwareFeature = asyncHandler(async (req, res) => {
  const feature = await AiSoftwareFeature.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!feature) {
    res.status(404);
    throw new Error("AI/Software Feature not found");
  }
  res.json({ message: "AI/Software Feature updated successfully", data: feature });
});

// Delete
const deleteAiSoftwareFeature = asyncHandler(async (req, res) => {
  const feature = await AiSoftwareFeature.findByIdAndDelete(req.params.id);
  if (!feature) {
    res.status(404);
    throw new Error("AI/Software Feature not found");
  }
  res.json({ message: "AI/Software Feature deleted successfully" });
});

module.exports = {
  createAiSoftwareFeature,
  getAllAiSoftwareFeatures,
  getAiSoftwareFeature,
  updateAiSoftwareFeature,
  deleteAiSoftwareFeature
};