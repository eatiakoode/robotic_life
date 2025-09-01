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
    console.log("🔍 Filter robots called with query:", req.query);
    
    let {
      minPrice, maxPrice,
      minWeight, maxWeight, weightUnit = "kg",
      colors, manufacturers,
      category
    } = req.query;
    
    console.log("🔍 Parsed filters:", {
      category,
      colors,
      manufacturers,
      minPrice,
      maxPrice
    });
 
    let filter = {};
 
    if (minPrice || maxPrice) {
      filter.totalPrice = {};
      if (minPrice) filter.totalPrice.$gte = Number(minPrice);
      if (maxPrice) filter.totalPrice.$lte = Number(maxPrice);
    }
 
    if (category) {
      console.log("🔍 Looking for category with slug:", category);
      const categoryDoc = await Category.findOne({ slug: category });
      console.log("🔍 Category found:", categoryDoc);
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      }
    }
 
    if (manufacturers) {
      console.log("🔍 Filtering by manufacturers:", manufacturers);
      const Manufacturer = require("../../models/manufacturerModel");
      
      if (typeof manufacturers === 'string') {
        const manufacturerNames = manufacturers.split(",");
        console.log("🔍 Looking for manufacturers:", manufacturerNames);
        
        // Find manufacturers by name
        const manufacturerDocs = await Manufacturer.find({
          name: { $in: manufacturerNames }
        }).select("_id name");
        
        console.log("🔍 Found manufacturers:", manufacturerDocs);
        
        if (manufacturerDocs && manufacturerDocs.length > 0) {
          const manufacturerIds = manufacturerDocs.map(doc => doc._id);
          filter.manufacturer = { $in: manufacturerIds };
          console.log("🔍 Filtering by manufacturer IDs:", manufacturerIds);
        } else {
          console.log("⚠️ No manufacturers found with names:", manufacturerNames);
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
      console.log("🔍 Filtering by colors:", colors);
      const Color = require("../../models/colorModel");
      
      if (typeof colors === 'string') {
        const colorNames = colors.split(",");
        console.log("🔍 Looking for colors:", colorNames);
        
        // Find colors by name
        const colorDocs = await Color.find({
          name: { $in: colorNames }
        }).select("_id name");
        
        console.log("🔍 Found colors:", colorDocs);
        
        if (colorDocs && colorDocs.length > 0) {
          const colorIds = colorDocs.map(doc => doc._id);
          filter.color = { $in: colorIds };
          console.log("🔍 Filtering by color IDs:", colorIds);
        } else {
          console.log("⚠️ No colors found with names:", colorNames);
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