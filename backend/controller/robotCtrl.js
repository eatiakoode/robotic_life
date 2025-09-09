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
        // Handle multiple images properly
        if (Array.isArray(processedImages)) {
          req.body.images = processedImages.map(img => "public/images/robot/" + img);
        } else {
          req.body.images = "public/images/robot/" + processedImages[0];
        }
      }
    }
    if (req.body.slug) {
      req.body.slug = slugify(req.body.slug.toLowerCase());
    } else if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    } else {
      req.body.slug = "";
    }

    // Map frontend field names to backend model field names
    if (req.body.videoembedcode !== undefined) {
      req.body.videoEmbedCode = req.body.videoembedcode;
      delete req.body.videoembedcode;
    }
    if (req.body.metatitle !== undefined) {
      req.body.metaTitle = req.body.metatitle;
      delete req.body.metatitle;
    }
    if (req.body.metadescription !== undefined) {
      req.body.metaDescription = req.body.metadescription;
      delete req.body.metadescription;
    }

    const robot = await Robot.create(req.body);

    const populatedRobot = await Robot.findById(robot._id)
      .populate("category", "name")
      .populate("manufacturer", "name")
      .populate("countryOfOrigin", "title")
      .populate("powerSource", "name")
      .populate("color", "name")
      .populate("material", "name")
      .populate("navigationType", "name")
      .populate("sensors", "name")
      .populate("primaryFunction", "name")
      .populate("aiSoftwareFeatures", "name")
      .populate("operatingEnvironment", "name")
      .populate("terrainCapability", "name")
      .populate("autonomyLevel", "name")
      .populate("communicationMethod", "name")
      .populate("payloadTypesSupported", "name");

    res.status(201).json({
      message: "Robot created successfully",
      data: populatedRobot
    });
  } catch (err) {
    console.error("Create robot error:", err);
    
    // Handle specific validation errors
    if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors).map(e => e.message).join(', ');
      return res.status(400).json({ 
        error: `Validation failed: ${validationErrors}`,
        details: err.errors 
      });
    }
    
    // Handle duplicate key errors
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({ 
        error: `A robot with this ${field} already exists. Please use a different ${field}.` 
      });
    }
    
    // Handle other errors
    res.status(400).json({ 
      error: err.message || "Failed to create robot. Please check your data and try again." 
    });
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
      .populate("countryOfOrigin", "title")
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
      .populate("countryOfOrigin", "title");

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
    console.log("Update robot request body:", req.body);
    console.log("Update robot files:", req.files);

    // Handle image processing and existing images
    let finalImages = [];
    
    // Start with existing images if provided
    if (req.body.existingImages) {
      // Parse existing images array if it's a string
      if (typeof req.body.existingImages === 'string') {
        try {
          finalImages = JSON.parse(req.body.existingImages);
        } catch (e) {
          finalImages = [req.body.existingImages];
        }
      } else {
        finalImages = req.body.existingImages;
      }
    }
    
    // Add new images if uploaded
    if (req.files && Object.keys(req.files).length > 0) {
      const processedImages = await robotImgUpload(req);
      if (processedImages.length > 0) {
        const newImagePaths = processedImages.map(img => "public/images/robot/" + img);
        finalImages = [...finalImages, ...newImagePaths];
        
        // Handle featured image
        if (req.files.featuredimage) {
          req.body.featuredimage = newImagePaths[0];
        }
      }
    }
    
    // Update the images field
    if (finalImages.length > 0) {
      req.body.images = finalImages;
    }
    
    // Remove the existingImages field as it's not part of the model
    delete req.body.existingImages;
    
    // If no new featured image is uploaded, preserve the existing one
    if (!req.body.featuredimage && req.body.existingFeaturedImage) {
      req.body.featuredimage = req.body.existingFeaturedImage;
    }
    
    // Remove the existingFeaturedImage field as it's not part of the model
    if (req.body.existingFeaturedImage) {
      delete req.body.existingFeaturedImage;
    }

    // Auto-generate slug if not provided
    if (!req.body.slug && req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    } else if (req.body.slug) {
      req.body.slug = slugify(req.body.slug.toLowerCase());
    }

    // Map frontend field names to backend model field names
    if (req.body.videoembedcode !== undefined) {
      req.body.videoEmbedCode = req.body.videoembedcode;
      delete req.body.videoembedcode;
    }
    if (req.body.metatitle !== undefined) {
      req.body.metaTitle = req.body.metatitle;
      delete req.body.metatitle;
    }
    if (req.body.metadescription !== undefined) {
      req.body.metaDescription = req.body.metadescription;
      delete req.body.metadescription;
    }

    console.log("Final update data:", req.body);

    const robot = await Robot.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!robot) {
      return res.status(404).json({ error: "Robot not found" });
    }

    // Populate the updated robot
    const populatedRobot = await Robot.findById(robot._id)
      .populate("category", "name")
      .populate("manufacturer", "name")
      .populate("countryOfOrigin", "title")
      .populate("powerSource", "name")
      .populate("color", "name")
      .populate("material", "name")
      .populate("navigationType", "name")
      .populate("sensors", "name")
      .populate("primaryFunction", "name")
      .populate("aiSoftwareFeatures", "name")
      .populate("operatingEnvironment", "name")
      .populate("terrainCapability", "name")
      .populate("autonomyLevel", "name")
      .populate("communicationMethod", "name")
      .populate("payloadTypesSupported", "name");

    res.json({
      message: "Robot updated successfully",
      data: populatedRobot
    });
  } catch (err) {
    console.error("Update robot error:", err);
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

