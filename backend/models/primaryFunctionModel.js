const mongoose = require("mongoose");

const PrimaryFunctionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Primary Function name is required"],
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

module.exports = mongoose.model("PrimaryFunction", PrimaryFunctionSchema);