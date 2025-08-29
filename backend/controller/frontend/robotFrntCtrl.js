const asyncHandler = require("express-async-handler");
const Robot = require("../../models/robotModel");
const Category = require("../../models/categoryModel");

// Get Most Recent Robots
const getRecentRobots = asyncHandler(async (req, res) => {
  const robots = await Robot.find()
    .select("title slug images totalPrice color")
    .populate("color", "name status")
    .sort({ createdAt: -1 })
    .limit(3);

  res.status(200).json(robots);
});

// get all robots
const getallRobots = asyncHandler(async (req, res) => {
  try {
    const getallRobots = await Robot.find()
      .populate("category", "name slug")
      .populate("manufacturer", "name")
      .populate("color", "name")
      .populate("powerSource", "name")
      .populate("material", "name")
      .lean();

    res.json({
      success: true,
      count: getallRobots.length,
      data: getallRobots
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Filter Robots
const filterRobots = async (req, res) => {
  try {
    const {
      minPrice,
      maxPrice,
      minWeight,
      maxWeight,
      colors,
      manufacturers,
      category
    } = req.query;

    let filter = {};

    if (minPrice || maxPrice) {
      filter.totalPrice = {};
      if (minPrice) filter.totalPrice.$gte = Number(minPrice);
      if (maxPrice) filter.totalPrice.$lte = Number(maxPrice);
    }

    if (minWeight || maxWeight) {
      filter["weight.value"] = {};
      if (minWeight) filter["weight.value"].$gte = Number(minWeight);
      if (maxWeight) filter["weight.value"].$lte = Number(maxWeight);
    }

    if (colors) {
      filter.color = { $in: colors.split(",") };
    }

    if (manufacturers) {
      filter.manufacturer = { $in: manufacturers.split(",") };
    }

    // Add category filtering
    // if (category) {
    //   filter.category = category;
    // }
    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      } else {
        filter.category = category;
      }
    }

    const robots = await Robot.find(filter)
      .populate("category", "name slug")
      .populate("manufacturer", "name")
      .populate("color", "name")
      .populate("powerSource", "name")
      .populate("material", "name")
      .lean();

    res.status(200).json({
      success: true,
      count: robots.length,
      data: robots
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message
    });
  }
};

module.exports = { getRecentRobots, getallRobots, filterRobots };
