const express = require("express");
const router = express.Router();
const { createSlider, getSliders, getSliderById, updateSlider, deleteSlider } = require("../controller/sliderCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto } = require("../middlewares/uploadImage");


router.post("/", authMiddleware, isAdmin, uploadPhoto.array("images", 10), createSlider);
router.get("/", authMiddleware, isAdmin, (req, res, next) => {
    console.log("Slider GET route hit");
    next();
}, getSliders);
router.get("/:id", authMiddleware, isAdmin, getSliderById);
router.put("/:id", authMiddleware, isAdmin, uploadPhoto.array("images", 10), updateSlider);
router.delete("/:id", authMiddleware, isAdmin, deleteSlider);

module.exports = router;
