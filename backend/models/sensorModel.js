const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Sensor name is required"],
      trim: true,
      unique: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sensor", SensorSchema);