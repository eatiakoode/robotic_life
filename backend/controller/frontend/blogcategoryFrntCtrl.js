const Blogcategory = require("../../models/blogcategoryModel");
const asyncHandler = require("express-async-handler");

// Get all active blog categories
const getActiveBlogCategories = asyncHandler(async (req, res) => {
  console.log('getActiveBlogCategories called');
  
  try {
    // First check total categories in database
    const totalCategories = await Blogcategory.countDocuments();
    console.log('Total categories in database:', totalCategories);
    
    const activeCategories = await Blogcategory.countDocuments({ status: true });
    console.log('Active categories in database:', activeCategories);
    
    const categories = await Blogcategory.find({ status: true })
      .select("title")
      .sort({ title: 1 })
      .lean();

    console.log('Blog categories found:', categories);

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
