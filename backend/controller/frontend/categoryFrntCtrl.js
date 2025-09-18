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
            .sort({ createdAt: 1, _id: 1 });



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



    const robots = await Robot.find({ 
        category: { $in: categoryIds },
        status: true 
    })
        .populate("specifications.color", "name")
        .populate("category", "name slug")
        .populate("manufacturer", "name")
        .populate("countryOfOrigin", "name")
        .populate("specifications.powerSource", "name")
        .limit(4);

    res.status(200).json({
        success: true,
        count: robots.length,
        data: robots,
    });
});

const getRobotsByCategorySlug = asyncHandler(async (req, res) => {
  try {
    const { slug } = req.params;
    const { type } = req.query; // Get the type from query parameters

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Category slug is required",
      });
    }

    const category = await Category.findOne({ slug }).select("name slug parent status");
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }


    let categoryIds = [category._id];

    // Determine behavior based on URL type parameter - STRICT MODE
    if (type === 'subcategory') {
      // URL says subcategory - ONLY include this specific category, regardless of database structure
      console.log('📁 URL says subcategory - STRICT MODE: only this specific category:', categoryIds.length, 'category');
      console.log('📁 Will query ONLY category ID:', category._id, 'for slug:', category.slug);
    } else if (type === 'parent') {
      // URL says parent - include this category + all its subcategories
      if (!category.parent) {
        const subcategories = await Category.find({ parent: category._id }).select("_id name slug");
        console.log('📂 Found subcategories for parent:', subcategories.map(s => ({ id: s._id, name: s.name, slug: s.slug })));
        categoryIds = categoryIds.concat(subcategories.map((c) => c._id));
        console.log('📂 URL says parent - including subcategories:', categoryIds.length, 'total categories');
      } else {
        console.log('📁 Database says subcategory but URL says parent - only this specific category:', categoryIds.length, 'category');
      }
    } else {
      // No type specified - use database structure to determine behavior
      if (!category.parent) {
        const subcategories = await Category.find({ parent: category._id }).select("_id name slug");
        console.log('📂 No type specified - found subcategories for parent:', subcategories.map(s => ({ id: s._id, name: s.name, slug: s.slug })));
        categoryIds = categoryIds.concat(subcategories.map((c) => c._id));
        console.log('📂 No type specified - including subcategories:', categoryIds.length, 'total categories');
      } else {
        console.log('📁 No type specified - database says subcategory - only this specific category:', categoryIds.length, 'category');
      }
    }
    // If it's a subcategory, only include that specific subcategory (don't include parent)
    // This ensures subcategory filtering shows only robots from that subcategory


    const robots = await Robot.find({
      category: { $in: categoryIds },
      status: true,
    })
      .populate("category", "name slug")
      .populate("manufacturer", "name")
      .populate("countryOfOrigin", "name")
      .populate("specifications.powerSource", "name")
      .populate("specifications.materials", "name")
      .populate("specifications.color", "name")
      .populate("capabilities.primaryFunction", "name")
      .populate("capabilities.autonomyLevel", "name")
      .populate("capabilities.navigationTypes", "name")
      .populate("capabilities.communicationMethods", "name")
      .populate("operationalEnvironmentAndApplications.operatingEnvironment", "name")
      .populate("operationalEnvironmentAndApplications.terrainCapabilities", "name")
      .populate("sensorsAndSoftware.sensors", "name")
      .populate("sensorsAndSoftware.aiSoftwareFeatures", "name")
      .populate("payloadsAndAttachments.payloadTypes", "name");

    console.log('✅ Found robots:', {
      count: robots.length,
      robots: robots.map(r => ({ id: r._id, title: r.title, category: r.category?.name }))
    });

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
