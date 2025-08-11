const express = require("express");
const {
  createLocation,
  updateLocation,
  deleteLocation,
  getLocation,
  getallLocation,
  getLocationCityId
} = require("../controller/locationCtrl.js");
const { uploadPhoto } = require("../middlewares/uploadImage");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin,uploadPhoto.array("locationlogo", 10), createLocation);
router.put("/:id", authMiddleware, isAdmin, uploadPhoto.array("locationlogo", 10),updateLocation);
router.delete("/:id", authMiddleware, isAdmin, deleteLocation);
router.get("/byid/:id", getLocation);
router.get("/", getallLocation);
router.get("/bycity/:cityid", getLocationCityId);

module.exports = router;
