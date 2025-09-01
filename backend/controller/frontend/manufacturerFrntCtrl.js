const asyncHandler = require("express-async-handler");
const Manufacturer = require("../../models/manufacturerModel");
const Robot = require("../../models/robotModel");

// Get all active manufacturers for frontend
const getActiveManufacturers = asyncHandler(async (req, res) => {
  try {
    console.log("🏭 Fetching manufacturers from database...");
    
    // Get all active manufacturers
    const manufacturers = await Manufacturer.find({ status: { $ne: false } })
      .select("name status")
      .sort({ name: 1 });

    console.log("🏭 Found manufacturers:", manufacturers.length);

    // Count robots for each manufacturer
    const transformedManufacturers = await Promise.all(
      manufacturers.map(async (manufacturer) => {
        const robotCount = await Robot.countDocuments({ 
          manufacturer: manufacturer._id 
        });
        
        return {
          _id: manufacturer._id,
          name: manufacturer.name,
          robotCount: robotCount
        };
      })
    );

    console.log("🏭 Manufacturers with robot counts:", transformedManufacturers);

    res.status(200).json({
      success: true,
      count: transformedManufacturers.length,
      data: transformedManufacturers
    });
  } catch (error) {
    console.error("❌ Error fetching manufacturers:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
});

module.exports = { getActiveManufacturers };
