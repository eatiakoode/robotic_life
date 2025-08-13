const mongoose = require("mongoose");

const RobotSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    manufacturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manufacturer",
      required: true
    },
    countryOfOrigin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true
    },
    launchYear: {
      type: Number,
      min: 1900,
      max: new Date().getFullYear() + 5,
      required: true
    },
    totalPrice: {
      type: String,
      trim: true
    },
    version: {
      type: String,
      trim: true
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Robot", RobotSchema);