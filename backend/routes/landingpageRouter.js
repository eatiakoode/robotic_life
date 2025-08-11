const express = require("express");
const { uploadPhoto ,photoUploadMiddleware1} = require("../middlewares/uploadImage");
const {
  createLandingpage,
  updateLandingpage,
  deleteLandingpage,
  getLandingpage,
  getallLandingpage,
} = require("../controller/landingpageCtrl.js");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.post("/", authMiddleware,  isAdmin, photoUploadMiddleware1,createLandingpage);
router.put("/:id", authMiddleware, isAdmin,photoUploadMiddleware1, updateLandingpage);
router.delete("/:id", authMiddleware, isAdmin, deleteLandingpage);
router.get("/:id", getLandingpage);
router.get("/", getallLandingpage);

module.exports = router;
