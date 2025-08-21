const mongoose = require("mongoose");

var enqSubscribeSchema = new mongoose.Schema({
  email: {
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

module.exports = mongoose.model("Enquirysubscribe", enqSubscribeSchema);
