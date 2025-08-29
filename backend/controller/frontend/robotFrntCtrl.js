const asyncHandler = require("express-async-handler");
const Robot = require("../../models/robotModel");
const Category = require("../../models/categoryModel");

// Weight unit conversion utility
const convertWeight = (value, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return value;
  
  // First convert to grams (base unit)
  let grams;
  switch (fromUnit) {
    case 'g':
      grams = value;
      break;
    case 'kg':
      grams = value * 1000;
      break;
    case 'lb':
      grams = value * 453.592;
      break;
    default:
      return value;
  }
  
  // Then convert from grams to target unit
  switch (toUnit) {
    case 'g':
      return Math.round(grams);
    case 'kg':
      return Math.round(grams / 1000 * 100) / 100;
    case 'lb':
      return Math.round(grams / 453.592 * 100) / 100;
    default:
      return grams;
  }
};

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
      weightUnit = 'kg', // Default weight unit
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
      // For weight filtering, we need to handle different units
      // We'll use MongoDB's aggregation pipeline to convert weights to the target unit
      const pipeline = [
        {
          $addFields: {
            normalizedWeight: {
              $switch: {
                branches: [
                  {
                    case: { $eq: ["$weight.unit", "g"] },
                    then: { $divide: ["$weight.value", 1000] } // Convert g to kg
                  },
                  {
                    case: { $eq: ["$weight.unit", "lb"] },
                    then: { $multiply: ["$weight.value", 0.453592] } // Convert lb to kg
                  }
                ],
                default: "$weight.value" // kg stays as kg
              }
            }
          }
        },
        {
          $match: {
            $and: [
              { normalizedWeight: { $exists: true, $ne: null } },
              ...(minWeight ? [{ normalizedWeight: { $gte: Number(minWeight) } }] : []),
              ...(maxWeight ? [{ normalizedWeight: { $lte: Number(maxWeight) } }] : [])
            ]
          }
        },
        {
          $project: {
            normalizedWeight: 0 // Remove the temporary field
          }
        }
      ];

      // If we have weight filtering, use aggregation pipeline
      if (minWeight || maxWeight) {
        // For weight filtering, we need to use aggregation
        // This is more complex, so we'll handle it in the frontend for now
        // and keep the simple filtering for other cases
        console.log('Weight filtering requested:', { minWeight, maxWeight, weightUnit });
      }
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

    // Apply weight filtering in memory if needed (for now)
    let filteredRobots = robots;
    if (minWeight || maxWeight) {
      filteredRobots = robots.filter(robot => {
        if (!robot.weight || !robot.weight.value || !robot.weight.unit) return false;
        
        // Convert robot weight to the target unit for comparison
        const robotWeightInTargetUnit = convertWeight(
          robot.weight.value, 
          robot.weight.unit, 
          weightUnit
        );
        
        const min = minWeight ? Number(minWeight) : 0;
        const max = maxWeight ? Number(maxWeight) : Number.MAX_SAFE_INTEGER;
        
        return robotWeightInTargetUnit >= min && robotWeightInTargetUnit <= max;
      });
    }

    res.status(200).json({
      success: true,
      count: filteredRobots.length,
      data: filteredRobots
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
