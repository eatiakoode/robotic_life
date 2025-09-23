const Category = require("../../models/categoryModel.js");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId.js");


const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCategory = await Category.findById(id).lean();
    res.json(getaCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getallCategory = asyncHandler(async (req, res) => {
  try {
    const { parent } = req.query;
    
    let filter = { "status": true };
    
    // If parent parameter is provided, filter by parent
    if (parent) {
      if (parent === 'null' || parent === '') {
        // Get parent categories (no parent)
        filter.parent = null;
      } else {
        // Get subcategories for specific parent
        filter.parent = parent;
      }
    }
    
    
    const getallCategory = await Category.find(filter).lean();

    
    res.json({
      success: true,
      data: getallCategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
module.exports = {
  getCategory,
  getallCategory,
};
