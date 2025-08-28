const mongoose = require("mongoose");

var enqSchema = new mongoose.Schema({
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
  subject: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
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

module.exports = mongoose.model("Enquiry", enqSchema);
