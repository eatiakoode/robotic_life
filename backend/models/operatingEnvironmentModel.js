const mongoose = require("mongoose");

const OperatingEnvironmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Operating Environment name is required"],
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

module.exports = mongoose.model("OperatingEnvironment", OperatingEnvironmentSchema);