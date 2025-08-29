const asyncHandler = require("express-async-handler");
const Robot = require("../../models/robotModel"); 

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
const convertWeight = (value, fromUnit, toUnit) => {
  if (!value) return null;

  let inKg;

  switch (fromUnit.toLowerCase()) {
    case "g":
      inKg = value / 1000;
      break;
    case "lb":
      inKg = value * 0.453592;
      break;
    case "kg":
      inKg = value;
      break;
    default:
      return null;
  }

  switch (toUnit.toLowerCase()) {
    case "g":
      return inKg * 1000;
    case "lb":
      return inKg / 0.453592;
    case "kg":
      return inKg;
    default:
      return inKg;
  }
};

const filterRobots = async (req, res) => {
  try {
    let {
      minPrice, maxPrice,
      minWeight, maxWeight, weightUnit = "kg",
      colors, manufacturers,
      category
    } = req.query;

    let filter = {};

    if (minPrice || maxPrice) {
      filter.totalPrice = {};
      if (minPrice) filter.totalPrice.$gte = Number(minPrice);
      if (maxPrice) filter.totalPrice.$lte = Number(maxPrice);
    }

    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      }
    }

    if (manufacturers) {
      filter.manufacturer = { $in: manufacturers.split(",") };
    }

    if (colors) {
      filter.color = { $in: colors.split(",") };
    }

    let robots = await Robot.find(filter)
      .populate("category", "name slug")
      .populate("manufacturer", "name")
      .populate("color", "name")
      .lean();

    if (minWeight || maxWeight) {
      const min = minWeight ? Number(minWeight) : 0;
      const max = maxWeight ? Number(maxWeight) : Number.MAX_SAFE_INTEGER;

      robots = robots.filter(r => {
        if (!r.weight || !r.weight.value || !r.weight.unit) return false;

        const converted = convertWeight(r.weight.value, r.weight.unit, weightUnit);
        if (converted === null) return false;

        return converted >= min && converted <= max;
      });
    }

    res.status(200).json({
      success: true,
      count: robots.length,
      data: robots
    });

  } catch (err) {
    console.error("Filter error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message
    });
  }
};

module.exports = { getRecentRobots, getallRobots, filterRobots };
