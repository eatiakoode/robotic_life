const express = require("express");
const { uploadPhoto ,photoUploadMiddleware,photoUploadMiddleware1} = require("../middlewares/uploadImage");
const {
  createProperty,
  updateProperty,
  deleteProperty,
  getProperty,
  getallProperty,
  imageDeleteProperty
} = require("../controller/propertyCtrl.js");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.post("/", authMiddleware,  isAdmin, photoUploadMiddleware1,createProperty);
router.put("/:id", authMiddleware, isAdmin,photoUploadMiddleware1, updateProperty);
router.delete("/:id", authMiddleware, isAdmin, deleteProperty);
router.get("/:id", getProperty);
router.get("/", getallProperty);
router.post("/image", authMiddleware,  isAdmin,imageDeleteProperty);

module.exports = router;
