// models/PowerSource.js
const mongoose = require("mongoose");

const PowerSourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PowerSource", PowerSourceSchema);
