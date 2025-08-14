const CommunicationMethod = require("../models/communicationMethodModel");
const asyncHandler = require("express-async-handler");

// Create
const createCommunicationMethod = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Communication Method name is required");
  }
  const method = await CommunicationMethod.create({ name });
  res.status(201).json({
    message: "Communication Method created successfully",
    data: method
  });
});

// Get All
const getAllCommunicationMethods = asyncHandler(async (req, res) => {
  const methods = await CommunicationMethod.find().sort({ createdAt: -1 });
  res.json(methods);
});

// Get One
const getCommunicationMethod = asyncHandler(async (req, res) => {
  const method = await CommunicationMethod.findById(req.params.id);
  if (!method) {
    res.status(404);
    throw new Error("Communication Method not found");
  }
  res.json(method);
});

// Update
const updateCommunicationMethod = asyncHandler(async (req, res) => {
  const method = await CommunicationMethod.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!method) {
    res.status(404);
    throw new Error("Communication Method not found");
  }
  res.json({
    message: "Communication Method updated successfully",
    data: method
  });
});

// Delete
const deleteCommunicationMethod = asyncHandler(async (req, res) => {
  const method = await CommunicationMethod.findByIdAndDelete(req.params.id);
  if (!method) {
    res.status(404);
    throw new Error("Communication Method not found");
  }
  res.json({ message: "Communication Method deleted successfully" });
});

module.exports = {
  createCommunicationMethod,
  getAllCommunicationMethods,
  getCommunicationMethod,
  updateCommunicationMethod,
  deleteCommunicationMethod
};