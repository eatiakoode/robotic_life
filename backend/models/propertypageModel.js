const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var propertypageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      // unique: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      // unique: true,
      // index: true,
    },
    description: {
      type: String,
      required: true,
      // unique: true,
      // index: true,
    },
   
    countryid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country", 
      // required: true,
    },
    stateid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State", 
      // required: true,
    },
    cityid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City", // 🔗 This should match the name you used in mongoose.model("City", ...)
      // required: true,
    },
    locationid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location", // 🔗 This should match the name you used in mongoose.model("City", ...)
      // required: true,
    },
    
    propertytypeid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Propertytype", // 🔗 This should match the name you used in mongoose.model("Propertytype", ...)
      // required: true,
    },
    builderid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Builder", // 🔗 This should match the name you used in mongoose.model("Builder", ...)
      // required: true,
    },
   
    categoryid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // 🔗 This should match the name you used in mongoose.model("Category", ...)
      // required: true,
    },
    constructionstatus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Constructionstatus", // 🔗 This should match the name you used in mongoose.model("Category", ...)
      // required: true,
    },
    furnishingstatus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Furnishingstatus", // 🔗 This should match the name you used in mongoose.model("Category", ...)
      // required: true,
    },
    metatitle:{
      type: String,
      // required: true,
      // unique: true,
      // index: true,
    },
    metadescription:{
      type: String,
      // required: true,
      // unique: true,
      // index: true,
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
module.exports = mongoose.model("Propertypage", propertypageSchema);
