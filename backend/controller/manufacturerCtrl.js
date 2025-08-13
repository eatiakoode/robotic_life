const Manufacturer = require("../models/manufacturerModel");
const asyncHandler = require("express-async-handler");
const { uploadPhoto, manufacturerImgResize } = require("../middlewares/uploadImage");
const slugify = require("slugify");

// Create Manufacturer
const createManufacturer = asyncHandler(async (req, res) => {
  try {
    if (req.files) {
      const processedImages = await manufacturerImgResize(req);
      if (processedImages.length > 0) {
        req.body.logoImage = "public/images/manufacturer/" + processedImages[0];
      }
    }

    if (req.body.slug) {
      req.body.slug = slugify(req.body.slug.toLowerCase());
    } else if (req.body.name) {
      req.body.slug = slugify(req.body.name.toLowerCase());
    } else {
      req.body.slug = "";
    }

    const newManufacturer = await Manufacturer.create(req.body);

    res.json({
      status: "success",
      message: "Manufacturer added successfully",
      data: newManufacturer,
    });
  } catch (error) {
    throw new Error(error);
  }
});

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