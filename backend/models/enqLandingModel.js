const mongoose = require("mongoose");

var enqLandingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  landingpageid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Landingpage",
    required: true,
  },
  status: {
    type: String,
    default: "Submitted",
    enum: ["Submitted", "Contacted", "In Progress", "Resolved"],
  },
},
  {
    timestamps: true,
  });

module.exports = mongoose.model("Enquirylanding", enqLandingSchema);
