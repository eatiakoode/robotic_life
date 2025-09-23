// models/NavigationType.js
const mongoose = require("mongoose");

const NavigationTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NavigationType", NavigationTypeSchema);