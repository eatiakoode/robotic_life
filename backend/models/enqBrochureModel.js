const mongoose = require("mongoose");

var enqBrochureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  propertyid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
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
  }
);

module.exports = mongoose.model("Enquirybrochure", enqBrochureSchema);
