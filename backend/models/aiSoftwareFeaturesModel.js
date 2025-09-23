const mongoose = require("mongoose");

const AiSoftwareFeatureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "AI/Software Feature name is required"],
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

module.exports = mongoose.model("AiSoftwareFeature", AiSoftwareFeatureSchema);