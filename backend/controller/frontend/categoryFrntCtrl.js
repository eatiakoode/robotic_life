const asyncHandler = require("express-async-handler");
const Category = require("../../models/categoryModel");

// Get all active categories
const getActiveParentCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find({
            parent: null,
            status: true
        })
            .select("name slug description logoimage")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories,
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = { getActiveParentCategories };
