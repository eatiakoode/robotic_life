const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model

var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description:{
      type: String,
      required: true,
      // unique: true,
      index: true,
    },
    logoimage:{
      type: String,
      // required: true,
      // unique: true,
      index: true,
    },
    blogcategory:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blogcategory", 
      required: true,
    },
    source:{
      type: String,
    },
    date:{
      type: String,
    },
    metatitle:{
      type: String,
    },
    metadescription:{
      type: String,
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
module.exports = mongoose.model("Blog", blogSchema);
