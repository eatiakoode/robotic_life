const asyncHandler = require("express-async-handler");
const PowerSource = require("../models/powerSourceModel");

// Create a power source
const createPowerSource = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Power source name is required");
  }

  const exists = await PowerSource.findOne({ name: name.trim() });
  if (exists) {
    res.status(400);
    throw new Error("Power source already exists");
  }

  const newSource = await PowerSource.create({ name: name.trim() });
  res.status(201).json({
    message: "Power source created successfully",
    data: newSource
  });
});

// Get all power sources
const getAllPowerSources = asyncHandler(async (req, res) => {
  const sources = await PowerSource.find().sort({ name: 1 });
  res.status(200).json(sources);
});

// Get single power source
const getPowerSourceById = asyncHandler(async (req, res) => {
  const source = await PowerSource.findById(req.params.id);
  if (!source) {
    res.status(404);
    throw new Error("Power source not found");
  }
  res.status(200).json(source);
});

// Update power source
const updatePowerSource = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Power source name is required");
  }

  const updatedSource = await PowerSource.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, status: req.body.status },
    { new: true }
  );

  if (!updatedSource) {
    res.status(404);
    throw new Error("Power source not found");
  }

  res.status(200).json({
    message: "Power source updated successfully",
    data: updatedSource
  });
});

// Delete power source
const deletePowerSource = asyncHandler(async (req, res) => {
  const source = await PowerSource.findById(req.params.id);
  if (!source) {
    res.status(404);
    throw new Error("Power source not found");
  }
  await source.deleteOne();
  res.status(200).json({ message: "Power source deleted successfully" });
});

module.exports = {
  createPowerSource,
  getAllPowerSources,
  getPowerSourceById,
  updatePowerSource,
  deletePowerSource
};
