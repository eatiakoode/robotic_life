const express = require("express");
const { uploadPhoto ,photoUploadMiddleware1} = require("../middlewares/uploadImage");
const {
  createLandingplan,
  updateLandingplan,
  deleteLandingplan,
  getLandingplan,
  getallLandingplan,
} = require("../controller/landingplanCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.post("/", authMiddleware,  isAdmin, photoUploadMiddleware1,createLandingplan);
router.put("/:id", authMiddleware, isAdmin, updateLandingplan);
router.delete("/:id", authMiddleware, isAdmin, deleteLandingplan);
router.get("/:id", getLandingplan);
router.get("/", getallLandingplan);

module.exports = router;
