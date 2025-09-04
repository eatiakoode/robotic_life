const asyncHandler = require("express-async-handler");
const Category = require("../../models/categoryModel");
const Robot = require("../../models/robotModel");

// Get all active categories (with parent parameter support)
const getActiveParentCategories = asyncHandler(async (req, res) => {
    try {
        const { parent } = req.query;
        
        let filter = { status: true };
        
        // If parent parameter is provided, filter by parent
        if (parent) {
            if (parent === 'null' || parent === '') {
                // Get parent categories (no parent)
                filter.parent = null;
            } else {
                // Get subcategories for specific parent
                filter.parent = parent;
            }
        } else {
            // Default: get parent categories
            filter.parent = null;
        }
        

        
        const categories = await Category.find(filter)
            .select("name slug description logoimage parent")
            .sort({ createdAt: -1 });



        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories,
        });
    } catch (err) {
        console.error('Backend category error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Get filtered robots by parent category
const getFilteredRobotsByParentCategory = asyncHandler(async (req, res) => {
    const { parentSlug } = req.params;

    const parentCategory = await Category.findOne({ slug: parentSlug, parent: null, status: true });
    if (!parentCategory) {
        return res.status(404).json({ message: "Parent category not found" });
    }

    const childCategories = await Category.find({ parent: parentCategory._id, status: true }).select("_id");

    const categoryIds = [parentCategory._id, ...childCategories.map(cat => cat._id)];



    const robots = await Robot.find({ category: { $in: categoryIds } })
        .populate("color", "name")
        .populate("category", "name slug")
        .populate("manufacturer", "name")
        .limit(4);



    res.status(200).json(robots);
});

const getRobotsByCategorySlug = asyncHandler(async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Category slug is required",
      });
    }

    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    let categoryIds = [category._id];

    if (!category.parent) {
      const subcategories = await Category.find({ parent: category._id }).select("_id");
      categoryIds = categoryIds.concat(subcategories.map((c) => c._id));
    }

    const robots = await Robot.find({
      category: { $in: categoryIds },
      status: true,
    })
      .populate("category", "name slug")
      .populate("manufacturer", "name")
      .populate("countryOfOrigin", "name")
      .populate("powerSource", "name");

    res.status(200).json({
      success: true,
      count: robots.length,
      data: robots,
    });
  } catch (error) {
    console.error("Error fetching robots by category slug:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

const getActiveSubcategories = async (req, res) => {
  try {
    const subcategories = await Category.find({
      status: true,
      parent: { $ne: null }
    })
      .populate("parent", "name slug")
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: subcategories.length,
      data: subcategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching subcategories",
      error: error.message,
    });
  }
};

module.exports = { getActiveParentCategories, getFilteredRobotsByParentCategory, getRobotsByCategorySlug, getActiveSubcategories };
