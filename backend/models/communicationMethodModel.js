const mongoose = require("mongoose");

const CommunicationMethodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Communication Method name is required"],
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

module.exports = mongoose.model("CommunicationMethod", CommunicationMethodSchema);