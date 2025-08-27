const asyncHandler = require("express-async-handler");
const Robot = require("../../models/robotModel"); 

// Get Most Recent Robots
const getRecentRobots = asyncHandler(async (req, res) => {
  const robots = await Robot.find() 
    .select("title slug images totalPrice color") 
    .populate("color", "name status") // Populate color data with name and status (only fields that exist)
    .sort({ createdAt: -1 }) 
    .limit(3); 

  res.status(200).json(robots);
});

module.exports = { getRecentRobots };
