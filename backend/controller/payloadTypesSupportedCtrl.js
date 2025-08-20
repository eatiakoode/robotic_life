const PayloadTypesSupported = require("../models/payloadTypesSupportedModel");
const asyncHandler = require("express-async-handler");

// Create
const createPayloadType = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Payload Type name is required");
  }
  const type = await PayloadTypesSupported.create({ name });
  res.status(201).json({
    message: "Payload Type created successfully",
    data: type
  });
});

// Get All
const getAllPayloadTypes = asyncHandler(async (req, res) => {
  const types = await PayloadTypesSupported.find().sort({ createdAt: -1 });
  res.json(types);
});

// Get One
const getPayloadType = asyncHandler(async (req, res) => {
  const type = await PayloadTypesSupported.findById(req.params.id);
  if (!type) {
    res.status(404);
    throw new Error("Payload Type not found");
  }
  res.json(type);
});

// Update
const updatePayloadType = asyncHandler(async (req, res) => {
  const type = await PayloadTypesSupported.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, status: req.body.status },
    { new: true }
  );
  if (!type) {
    res.status(404);
    throw new Error("Payload Type not found");
  }
  res.json({
    message: "Payload Type updated successfully",
    data: type
  });
});

// Delete
const deletePayloadType = asyncHandler(async (req, res) => {
  const type = await PayloadTypesSupported.findByIdAndDelete(req.params.id);
  if (!type) {
    res.status(404);
    throw new Error("Payload Type not found");
  }
  res.json({ message: "Payload Type deleted successfully" });
});

module.exports = {
  createPayloadType,
  getAllPayloadTypes,
  getPayloadType,
  updatePayloadType,
  deletePayloadType
};