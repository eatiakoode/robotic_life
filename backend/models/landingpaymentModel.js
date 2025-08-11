const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model

var landingpaymentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      index: true,
    },
    price: {
      type: String,
      index: true,
    },
    areasize: {
      type: String,    
    },
    landingpageid: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Landingpage", 
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

//Export the model
module.exports = mongoose.model("Landingpayment", landingpaymentSchema);
