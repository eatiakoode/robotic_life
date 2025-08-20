const asyncHandler = require("express-async-handler");
const Color = require("../models/colorModel");

// Create color
const createColor = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Color name is required");
  }
  const exists = await Color.findOne({ name: name.trim() });
  if (exists) {
    res.status(400);
    throw new Error("Color already exists");
  }
  const newColor = await Color.create({ name: name.trim() });
  res.status(201).json({ message: "Color created successfully", data: newColor });
});

// Get all colors
const getAllColors = asyncHandler(async (req, res) => {
  const colors = await Color.find().sort({ name: 1 });
  res.status(200).json(colors);
});

// Get single color
const getColorById = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);
  if (!color) {
    res.status(404);
    throw new Error("Color not found");
  }
  res.status(200).json(color);
});

// Update color
const updateColor = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const updatedColor = await Color.findByIdAndUpdate(
    req.params.id,
    { name: name.trim() },
    { status: req.body.status },
    { new: true, runValidators: true }
  );
  if (!updatedColor) {
    res.status(404);
    throw new Error("Color not found");
  }
  res.status(200).json({ message: "Color updated successfully", data: updatedColor });
});

// Delete color
const deleteColor = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);
  if (!color) {
    res.status(404);
    throw new Error("Color not found");
  }
  await color.deleteOne();
  res.status(200).json({ message: "Color deleted successfully" });
});

module.exports = {
  createColor,
  getAllColors,
  getColorById,
  updateColor,
  deleteColor
};