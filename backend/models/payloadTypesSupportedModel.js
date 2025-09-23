const mongoose = require("mongoose");

const PayloadTypesSupportedSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Payload Type name is required"],
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

module.exports = mongoose.model("PayloadType", PayloadTypesSupportedSchema);