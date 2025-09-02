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

module.exports = { getActiveParentCategories, getFilteredRobotsByParentCategory };
