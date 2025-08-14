// controllers/navigationTypeCtrl.js
const NavigationType = require("../models/navigationTypeModel");
const asyncHandler = require("express-async-handler");

// Create Navigation Type
const createNavigationType = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const existing = await NavigationType.findOne({ name: name.trim() });
  if (existing) {
    return res.status(400).json({ message: "Navigation type already exists" });
  }

  const navigationType = await NavigationType.create({ name: name.trim() });
  res.status(201).json({
    message: "Navigation type created successfully",
    data: navigationType
  });
});

// Get All Navigation Types
const getAllNavigationTypes = asyncHandler(async (req, res) => {
  const navigationTypes = await NavigationType.find().sort({ createdAt: -1 });
  res.status(200).json(navigationTypes);
});

// Get Single Navigation Type
const getNavigationType = asyncHandler(async (req, res) => {
  const navigationType = await NavigationType.findById(req.params.id);
  if (!navigationType) {
    return res.status(404).json({ message: "Navigation type not found" });
  }
  res.status(200).json(navigationType);
});

// Update Navigation Type
const updateNavigationType = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const navigationType = await NavigationType.findById(req.params.id);

  if (!navigationType) {
    return res.status(404).json({ message: "Navigation type not found" });
  }

  if (name) navigationType.name = name.trim();

  await navigationType.save();
  res.status(200).json({
    message: "Navigation type updated successfully",
    data: navigationType
  });
});

// Delete Navigation Type
const deleteNavigationType = asyncHandler(async (req, res) => {
  const navigationType = await NavigationType.findById(req.params.id);

  if (!navigationType) {
    return res.status(404).json({ message: "Navigation type not found" });
  }

  await navigationType.deleteOne();
  res.status(200).json({ message: "Navigation type deleted successfully" });
});

module.exports = {
  createNavigationType,
  getAllNavigationTypes,
  getNavigationType,
  updateNavigationType,
  deleteNavigationType
};