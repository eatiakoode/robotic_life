const express = require("express");
const { uploadPhoto ,photoUploadMiddleware1} = require("../middlewares/uploadImage");
const {
  createPropertyplan,
  updatePropertyplan,
  deletePropertyplan,
  getPropertyplan,
  getallPropertyplan,
  imageDeletePropertyPlan
} = require("../controller/propertyplanCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.post("/", authMiddleware,  isAdmin, photoUploadMiddleware1,createPropertyplan);
router.put("/:id", authMiddleware, isAdmin, updatePropertyplan);
router.delete("/:id", authMiddleware, isAdmin, deletePropertyplan);
router.get("/:id", getPropertyplan);
router.get("/", getallPropertyplan);
router.post("/image", authMiddleware,  isAdmin,imageDeletePropertyPlan);

module.exports = router;
