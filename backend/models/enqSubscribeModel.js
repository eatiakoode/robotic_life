const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
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

//Export the model
module.exports = mongoose.model("Enquirysubscribe", enqSubscribeSchema);
