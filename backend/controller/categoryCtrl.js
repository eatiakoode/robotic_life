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

    // if (!req.body.name && req.body.title) {
    //   req.body.name = req.body.title;
    // }

    if (!('parent' in req.body) || req.body.parent === '' || req.body.parent === 'null' || req.body.parent === undefined) {
      req.body.parent = null;
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

// Get parent categories
const getParentCategories = async (req, res) => {
  try {
    const parents = await Category.find({ parent: null });
    res.status(200).json(parents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching parent categories", error });
  }
};

// Get subcategories
const getSubCategories = async (req, res) => {
  try {
    const { parentId } = req.params;
    const subcategories = await Category.find({ parent: parentId });
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subcategories", error });
  }
};

// Update category
const updateCategory = asyncHandler(async (req, res) => {
  try {
    if (req.files && req.files.length > 0) {
      const processedImages = await categoryImgResize(req);
      if (processedImages.length > 0) {
        req.body.logoimage = "public/images/category/" + processedImages[0];
      }
    }

    if (!("parent" in req.body) || req.body.parent === "" || req.body.parent === "null" || req.body.parent === undefined) {
      req.body.parent = null;
    }

    if (req.body.slug) {
      req.body.slug = slugify(req.body.slug.toLowerCase());
    } else if (req.body.name) {
      req.body.slug = slugify(req.body.name.toLowerCase());
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ status: "error", message: "Category not found" });
    }

    res.json({
      status: "success",
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

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
  deleteCategory,
  getParentCategories,
  getSubCategories
};