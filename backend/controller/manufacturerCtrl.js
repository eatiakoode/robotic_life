const Manufacturer = require("../models/manufacturerModel");

// Create Manufacturer
const createManufacturer = async (req, res) => {
  try {
    const manufacturer = await Manufacturer.create(req.body);
    res.status(201).json(manufacturer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Manufacturers
const getManufacturers = async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find()
      .populate("robotList", "title") // Optional: fetch related robots
      .sort({ createdAt: -1 });
    res.json(manufacturers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Manufacturer by ID
const getManufacturerById = async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findById(req.params.id)
      .populate("robotList", "title");

    if (!manufacturer) {
      return res.status(404).json({ error: "Manufacturer not found" });
    }

    res.json(manufacturer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Manufacturer
const updateManufacturer = async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!manufacturer) {
      return res.status(404).json({ error: "Manufacturer not found" });
    }

    res.json(manufacturer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Manufacturer
const deleteManufacturer = async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findByIdAndDelete(req.params.id);

    if (!manufacturer) {
      return res.status(404).json({ error: "Manufacturer not found" });
    }

    res.json({ message: "Manufacturer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createManufacturer,
  getManufacturers,
  getManufacturerById,
  updateManufacturer,
  deleteManufacturer
};