const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: false,
            trim: true,
        },
        images: [{
            type: String,
        }],
        buttonText: {
            type: String,
            required: false,
            trim: true,
        },
        buttonLink: {
            type: String,
            required: false,
            trim: true,
        },
        metaTitle: {
            type: String,
            required: false,
            trim: true,
        },
        metaDescription: {
            type: String,
            required: false,
            trim: true,
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Slider", sliderSchema);
