const mongoose = require("mongoose");

const TerrainCapabilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Terrain Capability name is required"],
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

module.exports = mongoose.model("TerrainCapability", TerrainCapabilitySchema);