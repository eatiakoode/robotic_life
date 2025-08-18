const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getParentCategories
} = require("../controller/categoryCtrl");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto } = require("../middlewares/uploadImage");

const router = express.Router();

router.post("/", authMiddleware, isAdmin,uploadPhoto.array("logo", 10), createCategory);
router.get("/", authMiddleware, isAdmin, getCategories);
router.get("/:id", authMiddleware, isAdmin, getCategoryById);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
router.get("/parent", authMiddleware, isAdmin, getParentCategories);

module.exports = router;
