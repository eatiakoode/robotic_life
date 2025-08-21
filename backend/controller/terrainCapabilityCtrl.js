const TerrainCapability = require("../models/terrainCapabilityModel");
const asyncHandler = require("express-async-handler");

// Create
const createTerrainCapability = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Terrain Capability name is required");
  }
  const capability = await TerrainCapability.create({ name });
  res
    .status(201)
    .json({ message: "Terrain Capability created successfully", data: capability });
});

// Get All
const getAllTerrainCapabilities = asyncHandler(async (req, res) => {
  const capabilities = await TerrainCapability.find().sort({ createdAt: -1 });
  res.json(capabilities);
});

// Get One
const getTerrainCapability = asyncHandler(async (req, res) => {
  const capability = await TerrainCapability.findById(req.params.id);
  if (!capability) {
    res.status(404);
    throw new Error("Terrain Capability not found");
  }
  res.json(capability);
});

// Update
const updateTerrainCapability = asyncHandler(async (req, res) => {
  const capability = await TerrainCapability.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, status: req.body.status },
    { new: true }
  );
  if (!capability) {
    res.status(404);
    throw new Error("Terrain Capability not found");
  }
  res.json({ message: "Terrain Capability updated successfully", data: capability });
});

// Delete
const deleteTerrainCapability = asyncHandler(async (req, res) => {
  const capability = await TerrainCapability.findByIdAndDelete(req.params.id);
  if (!capability) {
    res.status(404);
    throw new Error("Terrain Capability not found");
  }
  res.json({ message: "Terrain Capability deleted successfully" });
});

module.exports = {
  createTerrainCapability,
  getAllTerrainCapabilities,
  getTerrainCapability,
  updateTerrainCapability,
  deleteTerrainCapability
};