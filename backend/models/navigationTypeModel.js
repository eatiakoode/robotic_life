// models/NavigationType.js
const mongoose = require("mongoose");

const NavigationTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("NavigationType", NavigationTypeSchema);