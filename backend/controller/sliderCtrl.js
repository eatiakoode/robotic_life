const Slider = require("../models/sliderModel");
const asyncHandler = require("express-async-handler");
const { sliderImgResize } = require("../middlewares/uploadImage");

// Create slider
const createSlider = asyncHandler(async (req, res) => {
    try {
        if (req.files) {
            const processedImages = await sliderImgResize(req);
            if (processedImages.length > 0) {
                req.body.images = processedImages.map(
                    (img) => "public/images/slider/" + img
                );
            }
        }

        const slider = await Slider.create(req.body);
        res.status(201).json({
            message: "Slider created successfully",
            data: slider,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all sliders
const getSliders = async (req, res) => {
    try {
        const sliders = await Slider.find().sort({ createdAt: -1 }); // latest first
        res.status(200).json({ success: true, data: sliders });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get single slider by ID
const getSliderById = async (req, res) => {
    try {
        const slider = await Slider.findById(req.params.id);
        if (!slider) {
            return res.status(404).json({ success: false, error: "Slider not found" });
        }
        res.status(200).json({ success: true, data: slider });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Update slider
const updateSlider = asyncHandler(async (req, res) => {
    try {
        if (req.files) {
            const processedImages = await sliderImgResize(req);
            if (processedImages.length > 0) {
                req.body.images = processedImages.map(
                    (img) => "public/images/slider/" + img
                );
            }
        }

        const slider = await Slider.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!slider) {
            return res.status(404).json({ error: "Slider not found" });
        }

        res.status(200).json({
            message: "Slider updated successfully",
            data: slider,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete slider
const deleteSlider = async (req, res) => {
    try {
        const slider = await Slider.findByIdAndDelete(req.params.id);
        if (!slider) {
            return res.status(404).json({ success: false, error: "Slider not found" });
        }

        res.status(200).json({ success: true, message: "Slider deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = {
    createSlider,
    getSliders,
    getSliderById,
    updateSlider,
    deleteSlider,
};