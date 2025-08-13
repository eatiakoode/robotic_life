const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require("../controller/categoryCtrl");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto } = require("../middlewares/uploadImage");

const router = express.Router();

// Create Category
router.post("/", authMiddleware, isAdmin,uploadPhoto.array("logo", 10), createCategory);

// Get all Categories
router.get("/", authMiddleware, isAdmin, getCategories);

// Get Category by ID
router.get("/:id", authMiddleware, isAdmin, getCategoryById);

// Update Category
router.put("/:id", authMiddleware, isAdmin, updateCategory);

// Delete Category
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);

module.exports = router;
