const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Sensor name is required"],
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

module.exports = mongoose.model("Sensor", SensorSchema);