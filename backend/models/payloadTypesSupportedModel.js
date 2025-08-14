const mongoose = require("mongoose");

const PayloadTypesSupportedSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Payload Type name is required"],
      trim: true,
      unique: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("PayloadTypesSupported", PayloadTypesSupportedSchema);