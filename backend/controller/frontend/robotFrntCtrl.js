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
    const getallRobots = await Robot.find().select("title description totalPrice images").lean().limit(10);
    res.json(getallRobots);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { getRecentRobots, getallRobots };
