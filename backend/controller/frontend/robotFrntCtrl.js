const asyncHandler = require("express-async-handler");
const Robot = require("../../models/robotModel");
const Category = require("../../models/categoryModel");
 
// Get Most Recent Robots
const getRecentRobots = asyncHandler(async (req, res) => {
  const robots = await Robot.find()
    .select("title slug images totalPrice color description category manufacturer")
    .populate("color", "name status")
    .populate("category", "name slug")
    .populate("manufacturer", "name")
    .sort({ createdAt: -1 })
    .limit(3);
 
  res.status(200).json(robots);
});
 
// get all robots
const getallRobots = asyncHandler(async (req, res) => {
  try {
    const getallRobots = await Robot.find()
      .select("title slug description totalPrice images category manufacturer color powerSource material launchYear version videoEmbedCode dimensions weight batteryCapacity loadCapacity operatingTemperature range runtime speed accuracy")
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

// Get robot by slug
const getRobotBySlug = asyncHandler(async (req, res) => {
  try {
    const { slug } = req.params;
    
    const robot = await Robot.findOne({ slug: slug })
      .populate("category", "name slug parent")
      .populate("manufacturer", "name")
      .populate("countryOfOrigin", "name")
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
      .populate("payloadTypesSupported", "name")
      .lean();

    if (!robot) {
      return res.status(404).json({ 
        success: false,
        error: "Robot not found" 
      });
    }

    res.json({
      success: true,
      data: robot
    });
  } catch (error) {
    console.error('Error fetching robot by slug:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
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
      // Convert string prices to numbers for comparison
      filter.$expr = {
        $and: []
      };
      
      if (minPrice) {
        filter.$expr.$and.push({
          $gte: [{ $toDouble: "$totalPrice" }, Number(minPrice)]
        });
      }
      
      if (maxPrice) {
        filter.$expr.$and.push({
          $lte: [{ $toDouble: "$totalPrice" }, Number(maxPrice)]
        });
      }
    }

    // Add weight filtering to the database query
    if (minWeight || maxWeight) {
      // If we don't have $expr yet, create it
      if (!filter.$expr) {
        filter.$expr = { $and: [] };
      }
      
      // First, ensure the robot has weight data
      filter.$expr.$and.push({
        $and: [
          { $ne: ["$weight", null] },
          { $ne: ["$weight.value", null] },
          { $ne: ["$weight.unit", null] }
        ]
      });
      
      if (minWeight) {
        // Convert minWeight to grams for comparison
        const minWeightInGrams = convertWeight(Number(minWeight), weightUnit, "g");
        // We need to convert the stored weight to grams for comparison
        filter.$expr.$and.push({
          $gte: [
            {
              $cond: {
                if: { $eq: ["$weight.unit", "g"] },
                then: { $toDouble: "$weight.value" },
                else: {
                  $cond: {
                    if: { $eq: ["$weight.unit", "kg"] },
                    then: { $multiply: [{ $toDouble: "$weight.value" }, 1000] },
                    else: {
                      $cond: {
                        if: { $eq: ["$weight.unit", "lb"] },
                        then: { $multiply: [{ $toDouble: "$weight.value" }, 453.592] },
                        else: { $toDouble: "$weight.value" } // Assume grams
                      }
                    }
                  }
                }
              }
            },
            minWeightInGrams
          ]
        });
      }
      
      if (maxWeight) {
        // Convert maxWeight to grams for comparison
        const maxWeightInGrams = convertWeight(Number(maxWeight), weightUnit, "g");
        // We need to convert the stored weight to grams for comparison
        filter.$expr.$and.push({
          $lte: [
            {
              $cond: {
                if: { $eq: ["$weight.unit", "g"] },
                then: { $toDouble: "$weight.value" },
                else: {
                  $cond: {
                    if: { $eq: ["$weight.unit", "kg"] },
                    then: { $multiply: [{ $toDouble: "$weight.value" }, 1000] },
                    else: {
                      $cond: {
                        if: { $eq: ["$weight.unit", "lb"] },
                        then: { $multiply: [{ $toDouble: "$weight.value" }, 453.592] },
                        else: { $toDouble: "$weight.value" } // Assume grams
                      }
                    }
                  }
                }
              }
            },
            maxWeightInGrams
          ]
        });
      }
    }

    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      }
    }

    if (manufacturers) {
      const Manufacturer = require("../../models/manufacturerModel");
      
      if (typeof manufacturers === 'string') {
        const manufacturerNames = manufacturers.split(",");
        
        // Find manufacturers by name
        const manufacturerDocs = await Manufacturer.find({
          name: { $in: manufacturerNames }
        }).select("_id name");
        
        if (manufacturerDocs && manufacturerDocs.length > 0) {
          const manufacturerIds = manufacturerDocs.map(doc => doc._id);
          filter.manufacturer = { $in: manufacturerIds };
        } else {
          // Return empty result if manufacturer not found
          return res.status(200).json({
            success: true,
            count: 0,
            data: []
          });
        }
      }
    }

    if (colors) {
      const Color = require("../../models/colorModel");
      
      if (typeof colors === 'string') {
        const colorNames = colors.split(",");
        
        // Find colors by name
        const colorDocs = await Color.find({
          name: { $in: colorNames }
        }).select("_id name");
        
        if (colorDocs && colorDocs.length > 0) {
          const colorIds = colorDocs.map(doc => doc._id);
          filter.color = { $in: colorIds };
        } else {
          // Return empty result if color not found
          return res.status(200).json({
            success: true,
            count: 0,
            data: []
          });
        }
      }
    }

    let robots = await Robot.find(filter)
      .populate("category", "name slug")
      .populate("manufacturer", "name")
      .populate("color", "name")
      .lean();

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
 
module.exports = { getRecentRobots, getallRobots, getRobotBySlug, filterRobots };