const asyncHandler = require("express-async-handler");
const Category = require("../../models/categoryModel");
const Robot = require("../../models/robotModel");

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
        .select("title slug totalPrice images color")
        .populate("color", "name")
        .limit(4);

    res.status(200).json(robots);
});

module.exports = { getActiveParentCategories, getFilteredRobotsByParentCategory };
