const asyncHandler = require("express-async-handler");
const Color = require("../../models/colorModel");
const Robot = require("../../models/robotModel");

// Get all active colors for frontend
const getActiveColors = asyncHandler(async (req, res) => {
  try {
    // First try to get colors from Color collection
    let colors = await Color.find({ status: true })
      .select("name status")
      .sort({ name: 1 });

    // If no colors in Color collection, get them from robots
    if (!colors || colors.length === 0) {
      // Get all unique colors used in robots
      const robots = await Robot.find()
        .populate("color", "name status")
        .select("color");

      // Extract unique colors
      const colorSet = new Set();
      const colorMap = new Map();
      
      robots.forEach(robot => {
        if (robot.color && Array.isArray(robot.color)) {
          robot.color.forEach(color => {
            if (color && color.name && color.status !== false) {
              colorSet.add(color.name);
              colorMap.set(color.name, color);
            }
          });
        }
      });

      // Convert to array format
      colors = Array.from(colorSet).map(colorName => {
        const colorObj = colorMap.get(colorName);
        return {
          _id: colorObj._id,
          name: colorName,
          status: colorObj.status
        };
      }).sort((a, b) => a.name.localeCompare(b.name));
    }

    res.status(200).json({
      success: true,
      count: colors.length,
      data: colors
    });
  } catch (error) {
    console.error("❌ Error fetching colors:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
});

module.exports = { getActiveColors };
