const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model

var landingimagesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    image: {
      type: String,
      required: true,      
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
module.exports = mongoose.model("Landingimage", landingimagesSchema);
