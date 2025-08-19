const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getParentCategories,
  getSubCategories
} = require("../controller/categoryCtrl");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto } = require("../middlewares/uploadImage");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, uploadPhoto.array("logo", 10), createCategory);
router.get("/", authMiddleware, isAdmin, getCategories);
router.get("/parent", authMiddleware, isAdmin, getParentCategories);
router.get("/sub/:parentId", authMiddleware, isAdmin, getSubCategories);
router.get("/:id", authMiddleware, isAdmin, getCategoryById);
// Enable file upload on update as well (same field name: "logo")
router.put("/:id", authMiddleware, isAdmin, uploadPhoto.array("logo", 10), updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);


module.exports = router;
