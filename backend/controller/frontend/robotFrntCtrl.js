const asyncHandler = require("express-async-handler");
const Robot = require("../../models/robotModel");
const Category = require("../../models/categoryModel");
const Color = require("../../models/colorModel");
const Manufacturer = require("../../models/manufacturerModel");

// Get Most Recent Robots
const getRecentRobots = asyncHandler(async (req, res) => {
  const robots = await Robot.find()
    .select("title slug images totalPrice specifications.color description category manufacturer")
    .populate("specifications.color", "name status")
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
      .select("title slug description totalPrice images category manufacturer specifications.color specifications.powerSource specifications.materials launchYear version videoEmbedCode specifications.dimensions specifications.weight specifications.batteryCapacity specifications.loadCapacity specifications.operatingTemperature specifications.range specifications.runtime specifications.speed specifications.accuracy")
      .populate("category", "name slug")
      .populate("manufacturer", "name")
      .populate("specifications.color", "name")
      .populate("specifications.powerSource", "name")
      .populate("specifications.materials", "name")
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
      .populate("countryOfOrigin", "title")
      .populate("specifications.powerSource", "name")
      .populate("specifications.color", "name")
      .populate("specifications.materials", "name")
      .populate("capabilities.navigationTypes", "name")
      .populate("sensorsAndSoftware.sensors", "name")
      .populate("capabilities.primaryFunction", "name")
      .populate("sensorsAndSoftware.aiSoftwareFeatures", "name")
      .populate("operationalEnvironmentAndApplications.operatingEnvironment", "name")
      .populate("operationalEnvironmentAndApplications.terrainCapabilities", "name")
      .populate("capabilities.autonomyLevel", "name")
      .populate("capabilities.communicationMethods", "name")
      .populate("payloadsAndAttachments.payloadTypes", "name")
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

    if (minWeight || maxWeight) {
      if (!filter.$expr) {
        filter.$expr = { $and: [] };
      }

      filter.$expr.$and.push({
        $and: [
          { $ne: ["$weight", null] },
          { $ne: ["$weight.value", null] },
          { $ne: ["$weight.unit", null] }
        ]
      });

      if (minWeight) {
        const minWeightInGrams = convertWeight(Number(minWeight), weightUnit, "g");
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
                        else: { $toDouble: "$weight.value" }
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
        const maxWeightInGrams = convertWeight(Number(maxWeight), weightUnit, "g");
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
                        else: { $toDouble: "$weight.value" }
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
        if (!categoryDoc.parent) {
          const subcategories = await Category.find({ parent: categoryDoc._id }).select("_id");
          const categoryIds = [categoryDoc._id, ...subcategories.map(c => c._id)];
          filter.category = { $in: categoryIds };
        } else {
          filter.category = categoryDoc._id;
        }
      }
    }

    if (manufacturers) {

      if (typeof manufacturers === 'string') {
        const manufacturerNames = manufacturers.split(",");

        const manufacturerDocs = await Manufacturer.find({
          name: { $in: manufacturerNames }
        }).select("_id name");

        if (manufacturerDocs && manufacturerDocs.length > 0) {
          const manufacturerIds = manufacturerDocs.map(doc => doc._id);
          filter.manufacturer = { $in: manufacturerIds };
        } else {
          return res.status(200).json({
            success: true,
            count: 0,
            data: []
          });
        }
      }
    }

    if (colors) {

      if (typeof colors === 'string') {
        const colorNames = colors.split(",");

        const colorDocs = await Color.find({
          name: { $in: colorNames }
        }).select("_id name");

        if (colorDocs && colorDocs.length > 0) {
          const colorIds = colorDocs.map(doc => doc._id);
          filter["specifications.color"] = { $in: colorIds };
        } else {
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
      .populate("specifications.color", "name")
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

// Get Recently Viewed Robots
const getRecentlyViewed = asyncHandler(async (req, res) => {
  try {
    let { ids } = req.body;

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of robot IDs",
      });
    }

    ids = [...new Set(ids)].slice(0, 2);

    const robots = await Robot.find({ _id: { $in: ids } })
      .select("title slug images totalPrice specifications.color")
      .populate("specifications.color", "name")
      .lean();

    res.json({
      success: true,
      count: robots.length,
      data: robots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// Get Related Robots
const getRelatedRobots = async (req, res) => {
  try {
    const { slug } = req.params;

    const robot = await Robot.findOne({ slug }).populate("category", "name parent");

    if (!robot) {
      return res.status(404).json({
        success: false,
        message: "Robot not found",
      });
    }

    const relatedRobots = await Robot.find({
      category: robot.category._id,
      _id: { $ne: robot._id },
      status: true
    })
      .select("title totalPrice images specifications.color slug")
      .populate("specifications.color", "name")
      .limit(4)
      .lean()

    res.status(200).json({
      success: true,
      count: relatedRobots.length,
      data: relatedRobots,
    });

  } catch (err) {
    console.error("Related robots error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message
    });
  }
};

// Compare Robots
const compareRobots = async (req, res) => {
  try {
    const { ids } = req.query;

    if (!ids) {
      return res.status(400).json({
        success: false,
        message: "Please provide robot IDs as query params.",
      });
    }

    const robotIds = ids.split(",");

    if (robotIds.length === 0 || robotIds.length > 3) {
      return res.status(400).json({
        success: false,
        message: "You can compare between 1 to 3 robots only.",
      });
    }

    const robots = await Robot.find({ _id: { $in: robotIds }, status: true })
      .populate("category", "name")
      .populate("manufacturer", "name")
      .populate("specifications.color", "name")
      .populate("specifications.powerSource", "name")
      .populate("capabilities.navigationTypes", "name")
      .populate("sensorsAndSoftware.sensors", "name")
      .populate("capabilities.primaryFunction", "name")
      .populate("sensorsAndSoftware.aiSoftwareFeatures", "name")
      .populate("operationalEnvironmentAndApplications.operatingEnvironment", "name")
      .populate("operationalEnvironmentAndApplications.terrainCapabilities", "name")
      .populate("capabilities.autonomyLevel", "name")
      .populate("capabilities.communicationMethods", "name")
      .populate("payloadsAndAttachments.payloadTypes", "name")
      .select(
        "title slug description category manufacturer launchYear totalPrice images specifications.weight specifications.speed specifications.range specifications.loadCapacity specifications.batteryCapacity specifications.runtime capabilities.autonomyLevel sensorsAndSoftware.aiSoftwareFeatures"
      );

    if (robots.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No robots found for the given IDs.",
      });
    }

    res.status(200).json({
      success: true,
      count: robots.length,
      data: robots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const getFeaturedRobots = asyncHandler(async (req, res) => {
  try {
    const robots = await Robot.find({ status: true, isFeatured: true })
      .select("title slug totalPrice images specifications.color")
      .populate("specifications.color", "name")
      .limit(3)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: robots.length,
      data: robots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching featured robots",
      error: error.message,
    });
  }
});

module.exports = { getRecentRobots, getallRobots, getRobotBySlug, filterRobots, getRecentlyViewed, getRelatedRobots, compareRobots, getFeaturedRobots };