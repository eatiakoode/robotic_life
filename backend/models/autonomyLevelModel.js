const mongoose = require("mongoose");

const AutonomyLevelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Autonomy Level name is required"],
      trim: true,
      unique: true
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AutonomyLevel", AutonomyLevelSchema);