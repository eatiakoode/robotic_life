const express = require("express");
const { uploadPhoto ,photoUploadMiddleware1} = require("../middlewares/uploadImage");
const {
  createCityglimpse,
  updateCityglimpse,
  deleteCityglimpse,
  getCityglimpse,
  getallCityglimpse,
} = require("../controller/cityglimpseCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.post("/", authMiddleware,  isAdmin,uploadPhoto.none(), createCityglimpse);
router.put("/:id", authMiddleware, isAdmin, updateCityglimpse);
router.delete("/:id", authMiddleware, isAdmin, deleteCityglimpse);
router.get("/:id", getCityglimpse);
router.get("/", getallCityglimpse);

module.exports = router;
