const mongoose = require("mongoose");

var faqSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    robotid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Robot",
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Faq", faqSchema);
