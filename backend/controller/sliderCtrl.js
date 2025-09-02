const Slider = require("../models/sliderModel");
const asyncHandler = require("express-async-handler");
const { sliderImgResize } = require("../middlewares/uploadImage");

// Create slider
const createSlider = asyncHandler(async (req, res) => {
    try {
        console.log("Create slider - req.files:", req.files);
        console.log("Create slider - req.body:", req.body);
        
        if (req.files && Array.isArray(req.files)) {
            console.log("Processing images:", req.files);
            const processedImages = await sliderImgResize(req.files);
            console.log("Processed images:", processedImages);
            if (processedImages.length > 0) {
                req.body.images = processedImages.map(
                    (img) => "images/slider/" + img
                );
                console.log("Final images array:", req.body.images);
            }
        }

        const slider = await Slider.create(req.body);
        console.log("Created slider:", slider);
        res.status(201).json({
            message: "Slider created successfully",
            data: slider,
        });
    } catch (err) {
        console.error("Error creating slider:", err);
        res.status(400).json({ error: err.message });
    }
});

// Get all sliders
const getSliders = async (req, res) => {
    try {
        console.log("getSliders called with query:", req.query);
        const { limit = 10, skip = 0 } = req.query;
        
        // Convert string parameters to numbers
        const limitNum = parseInt(limit);
        const skipNum = parseInt(skip);
        
        console.log("Fetching sliders with limit:", limitNum, "skip:", skipNum);
        
        const sliders = await Slider.find()
            .sort({ createdAt: -1 }) // latest first
            .limit(limitNum)
            .skip(skipNum);
            
        // Get total count for pagination
        const totalCount = await Slider.countDocuments();
        
        console.log("Found sliders:", sliders.length, "Total count:", totalCount);
        
        res.status(200).json({ 
            success: true, 
            data: sliders,
            totalCount,
            currentPage: Math.floor(skipNum / limitNum) + 1,
            totalPages: Math.ceil(totalCount / limitNum)
        });
    } catch (err) {
        console.error("Error fetching sliders:", err);
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
        console.log("Update slider - req.files:", req.files);
        console.log("Update slider - req.body:", req.body);
        
        if (req.files && Array.isArray(req.files)) {
            console.log("Processing update images:", req.files);
            const processedImages = await sliderImgResize(req.files);
            console.log("Processed update images:", processedImages);
            if (processedImages.length > 0) {
                req.body.images = processedImages.map(
                    (img) => "images/slider/" + img
                );
                console.log("Final update images array:", req.body.images);
            }
        }

        const slider = await Slider.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!slider) {
            return res.status(404).json({ error: "Slider not found" });
        }

        console.log("Updated slider:", slider);
        res.status(200).json({
            message: "Slider updated successfully",
            data: slider,
        });
    } catch (err) {
        console.error("Error updating slider:", err);
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