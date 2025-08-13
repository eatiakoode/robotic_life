const Category = require("../models/categoryModel");
const {uploadPhoto, categoryImgResize} = require("../middlewares/uploadImage");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

// Create Category
const createCategory = asyncHandler(async (req, res) => {
  try {
    if (req.files && req.files.length > 0) {
      const processedImages = await categoryImgResize(req);
      if (processedImages.length > 0) {
        req.body.logoimage = "public/images/category/" + processedImages[0];
      }
    }

    if (req.body.slug) {
      req.body.slug = slugify(req.body.slug.toLowerCase());
    } else if (req.body.name) {
      req.body.slug = slugify(req.body.name.toLowerCase());
    } else {
      req.body.slug = "";
    }

    const newCategory = await Category.create(req.body);

    res.json({
      status: "success",
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate("parent", "name")
      .sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("parent", "name");
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    if (req.body.parent && req.body.parent === req.params.id) {
      return res.status(400).json({ error: "A category cannot be its own parent." });
    }

    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};