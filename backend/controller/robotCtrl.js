const Robot = require("../models/robotModel");
const Category = require("../models/categoryModel");
const Manufacturer = require("../models/manufacturerModel");
const Country = require("../models/countryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const { uploadPhoto, robotImgUpload } = require("../middlewares/uploadImage");

// Create a new Robot
const createRobot = asyncHandler(async (req, res) => {
  try {
    if (req.files) {
      const processedImages = await robotImgUpload(req);
      if (processedImages.length > 0) {
        req.body.images = "public/images/robot/" + processedImages[0];
      }
    }
    if (req.body.slug) {
      req.body.slug = slugify(req.body.slug.toLowerCase());
    } else if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    } else {
      req.body.slug = "";
    }
    const robot = await Robot.create(req.body);

    const populatedRobot = await Robot.findById(robot._id)
      .populate("category", "name")
      .populate("manufacturer", "name")
      .populate("countryOfOrigin", "name")
      .populate("specifications.powerSource", "name")
      .populate("specifications.materials", "name")
      .populate("specifications.color", "name")
      .populate("capabilities.autonomyLevel", "name")
      .populate("capabilities.navigationTypes", "name")
      .populate("capabilities.communicationMethods", "name")
      .populate("capabilities.primaryFunction", "name")
      .populate("payloadsAndAttachments.payloadTypes", "name")
      .populate("sensorsAndSoftware.sensors", "name")
      .populate("sensorsAndSoftware.aiSoftwareFeatures", "name")
      .populate(
        "operationalEnvironmentAndApplications.operatingEnvironment",
        "name"
      )
      .populate(
        "operationalEnvironmentAndApplications.terrainCapabilities",
        "name"
      );
    res.status(201).json({
      message: "Robot created successfully",
      data: populatedRobot,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all robots
const getRobots = async (req, res) => {
  try {
    const { category, manufacturer, country, year, search } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (manufacturer) filter.manufacturer = manufacturer;
    if (country) filter.countryOfOrigin = country;
    if (year) filter.launchYear = Number(year);
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const robots = await Robot.find(filter)
      .populate("category", "name parent")
      .populate("manufacturer", "name")
      .populate("countryOfOrigin", "name")
      .sort({ createdAt: -1 });

    res.json(robots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single robot
const getRobotById = async (req, res) => {
  try {
    const robot = await Robot.findById(req.params.id)
      .populate("category", "name parent")
      .populate("manufacturer", "name")
      .populate("countryOfOrigin", "name");

    if (!robot) {
      return res.status(404).json({ error: "Robot not found" });
    }
    res.json(robot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a robot
const updateRobot = async (req, res) => {
  try {
    console.log("req.body:", req.body);

    if (req.files && req.files.length > 0) {
      const processedImages = await robotImgUpload(req);
      if (processedImages.length > 0) {
        req.body.images = "public/images/robot/" + processedImages[0];
      }
    }

    if (req.body.slug && typeof req.body.slug === "string") {
      req.body.slug = slugify(req.body.slug.toLowerCase());
    } else if (req.body.title && typeof req.body.title === "string") {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }

    const robot = await Robot.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!robot) {
      return res.status(404).json({ error: "Robot not found" });
    }
    res.json(robot);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Delete a robot
const deleteRobot = async (req, res) => {
  try {
    const robot = await Robot.findByIdAndDelete(req.params.id);

    if (!robot) {
      return res.status(404).json({ error: "Robot not found" });
    }
    res.json({ message: "Robot deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createRobot,
  getRobots,
  getRobotById,
  updateRobot,
  deleteRobot,
};
