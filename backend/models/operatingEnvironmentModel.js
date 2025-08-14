const mongoose = require("mongoose");

const OperatingEnvironmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Operating Environment name is required"],
      trim: true,
      unique: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("OperatingEnvironment", OperatingEnvironmentSchema);