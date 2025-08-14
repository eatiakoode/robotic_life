const mongoose = require("mongoose");

const AiSoftwareFeatureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "AI/Software Feature name is required"],
      trim: true,
      unique: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AiSoftwareFeature", AiSoftwareFeatureSchema);