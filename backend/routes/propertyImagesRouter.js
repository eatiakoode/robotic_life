const express = require("express");
// const { uploadPhoto ,photoUploadMiddleware} = require("../middlewares/uploadImage");
const {
  createPropertyimages,
  updatePropertyimages,
  deletePropertyimages,
  getPropertyimages,
  getallPropertyimages,
} = require("../controller/propertyimagesCtrl.js");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.post("/", authMiddleware,  isAdmin,createPropertyimages);
router.put("/:id", authMiddleware, isAdmin, updatePropertyimages);
router.delete("/:id", authMiddleware, isAdmin, deletePropertyimages);
router.get("/:id", getPropertyimages);
router.get("/", getallPropertyimages);

module.exports = router;
