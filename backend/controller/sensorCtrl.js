const Sensor = require("../models/sensorModel");
const asyncHandler = require("express-async-handler");

// Create Sensor
const createSensor = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Sensor name is required");
  }
  const sensor = await Sensor.create({ name });
  res.status(201).json({ message: "Sensor created successfully", data: sensor });
});

// Get All Sensors
const getAllSensors = asyncHandler(async (req, res) => {
  const sensors = await Sensor.find().sort({ createdAt: -1 });
  res.json(sensors);
});

// Get Single Sensor
const getSensor = asyncHandler(async (req, res) => {
  const sensor = await Sensor.findById(req.params.id);
  if (!sensor) {
    res.status(404);
    throw new Error("Sensor not found");
  }
  res.json(sensor);
});

// Update Sensor
const updateSensor = asyncHandler(async (req, res) => {
  const sensor = await Sensor.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, status: req.body.status },
    { new: true }
  );
  if (!sensor) {
    res.status(404);
    throw new Error("Sensor not found");
  }
  res.json({ message: "Sensor updated successfully", data: sensor });
});

// Delete Sensor
const deleteSensor = asyncHandler(async (req, res) => {
  const sensor = await Sensor.findByIdAndDelete(req.params.id);
  if (!sensor) {
    res.status(404);
    throw new Error("Sensor not found");
  }
  res.json({ message: "Sensor deleted successfully" });
});

module.exports = {
  createSensor,
  getAllSensors,
  getSensor,
  updateSensor,
  deleteSensor
};