const AutonomyLevel = require("../models/autonomyLevelModel");
const asyncHandler = require("express-async-handler");

// Create
const createAutonomyLevel = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Autonomy Level name is required");
  }
  const level = await AutonomyLevel.create({ name });
  res.status(201).json({
    message: "Autonomy Level created successfully",
    data: level
  });
});

// Get All
const getAllAutonomyLevels = asyncHandler(async (req, res) => {
  const levels = await AutonomyLevel.find().sort({ createdAt: -1 });
  res.json(levels);
});

// Get One
const getAutonomyLevel = asyncHandler(async (req, res) => {
  const level = await AutonomyLevel.findById(req.params.id);
  if (!level) {
    res.status(404);
    throw new Error("Autonomy Level not found");
  }
  res.json(level);
});

// Update
const updateAutonomyLevel = asyncHandler(async (req, res) => {
  const level = await AutonomyLevel.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!level) {
    res.status(404);
    throw new Error("Autonomy Level not found");
  }
  res.json({
    message: "Autonomy Level updated successfully",
    data: level
  });
});

// Delete
const deleteAutonomyLevel = asyncHandler(async (req, res) => {
  const level = await AutonomyLevel.findByIdAndDelete(req.params.id);
  if (!level) {
    res.status(404);
    throw new Error("Autonomy Level not found");
  }
  res.json({ message: "Autonomy Level deleted successfully" });
});

module.exports = {
  createAutonomyLevel,
  getAllAutonomyLevels,
  getAutonomyLevel,
  updateAutonomyLevel,
  deleteAutonomyLevel
};