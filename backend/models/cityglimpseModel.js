const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model

var CityglimpseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: true,
      // unique: true,
      index: true,
    },
    description:{
      type: String,
      // required: true,
      // unique: true,
      // index: true,
    },
    cityid: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "City", 
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
module.exports = mongoose.model("Cityglimpse", CityglimpseSchema);
