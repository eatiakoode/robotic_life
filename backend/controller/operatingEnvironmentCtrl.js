const OperatingEnvironment = require("../models/operatingEnvironmentModel");
const asyncHandler = require("express-async-handler");

// Create
const createOperatingEnvironment = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Operating Environment name is required");
  }
  const environment = await OperatingEnvironment.create({ name });
  res
    .status(201)
    .json({ message: "Operating Environment created successfully", data: environment });
});

// Get All
const getAllOperatingEnvironments = asyncHandler(async (req, res) => {
  const environments = await OperatingEnvironment.find().sort({ createdAt: -1 });
  res.json(environments);
});

// Get One
const getOperatingEnvironment = asyncHandler(async (req, res) => {
  const environment = await OperatingEnvironment.findById(req.params.id);
  if (!environment) {
    res.status(404);
    throw new Error("Operating Environment not found");
  }
  res.json(environment);
});

// Update
const updateOperatingEnvironment = asyncHandler(async (req, res) => {
  const environment = await OperatingEnvironment.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!environment) {
    res.status(404);
    throw new Error("Operating Environment not found");
  }
  res.json({ message: "Operating Environment updated successfully", data: environment });
});

// Delete
const deleteOperatingEnvironment = asyncHandler(async (req, res) => {
  const environment = await OperatingEnvironment.findByIdAndDelete(req.params.id);
  if (!environment) {
    res.status(404);
    throw new Error("Operating Environment not found");
  }
  res.json({ message: "Operating Environment deleted successfully" });
});

module.exports = {
  createOperatingEnvironment,
  getAllOperatingEnvironments,
  getOperatingEnvironment,
  updateOperatingEnvironment,
  deleteOperatingEnvironment
};