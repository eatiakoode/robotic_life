const Blogcategory = require("../../models/blogcategoryModel");
const asyncHandler = require("express-async-handler");

// Get all active blog categories
const getActiveBlogCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Blogcategory.find({ status: true })
      .select("title")
      .sort({ title: 1 })
      .lean();

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error('Backend blog category error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = {
  getActiveBlogCategories
};
