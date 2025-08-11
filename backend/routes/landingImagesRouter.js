const express = require("express");
// const { uploadPhoto ,photoUploadMiddleware} = require("../middlewares/uploadImage");
const {
  createLandingimages,
  updateLandingimages,
  deleteLandingimages,
  getLandingimages,
  getallLandingimages,
} = require("../controller/landingimagesCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.post("/", authMiddleware,  isAdmin,createLandingimages);
router.put("/:id", authMiddleware, isAdmin, updateLandingimages);
router.delete("/:id", authMiddleware, isAdmin, deleteLandingimages);
router.get("/:id", getLandingimages);
router.get("/", getallLandingimages);

module.exports = router;
