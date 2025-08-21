const PrimaryFunction = require("../models/primaryFunctionModel");
const asyncHandler = require("express-async-handler");

// Create Primary Function
const createPrimaryFunction = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Primary Function name is required");
  }
  const primaryFunction = await PrimaryFunction.create({ name });
  res
    .status(201)
    .json({ message: "Primary Function created successfully", data: primaryFunction });
});

// Get All
const getAllPrimaryFunctions = asyncHandler(async (req, res) => {
  const primaryFunctions = await PrimaryFunction.find().sort({ createdAt: -1 });
  res.json(primaryFunctions);
});

// Get One
const getPrimaryFunction = asyncHandler(async (req, res) => {
  const primaryFunction = await PrimaryFunction.findById(req.params.id);
  if (!primaryFunction) {
    res.status(404);
    throw new Error("Primary Function not found");
  }
  res.json(primaryFunction);
});

// Update
const updatePrimaryFunction = asyncHandler(async (req, res) => {
  const primaryFunction = await PrimaryFunction.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, status: req.body.status },
    { new: true }
  );
  if (!primaryFunction) {
    res.status(404);
    throw new Error("Primary Function not found");
  }
  res.json({ message: "Primary Function updated successfully", data: primaryFunction });
});

// Delete
const deletePrimaryFunction = asyncHandler(async (req, res) => {
  const primaryFunction = await PrimaryFunction.findByIdAndDelete(req.params.id);
  if (!primaryFunction) {
    res.status(404);
    throw new Error("Primary Function not found");
  }
  res.json({ message: "Primary Function deleted successfully" });
});

module.exports = {
  createPrimaryFunction,
  getAllPrimaryFunctions,
  getPrimaryFunction,
  updatePrimaryFunction,
  deletePrimaryFunction
};