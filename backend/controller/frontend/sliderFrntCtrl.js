const Slider = require("../../models/sliderModel");
const asyncHandler = require("express-async-handler");

// Get active sliders
const getActiveSliders = asyncHandler(async (req, res) => {
  try {
    const sliders = await Slider.find({ status: true })
      .select("title description images buttonText buttonLink")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: sliders.length,
      data: sliders,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = {
  getActiveSliders,
};