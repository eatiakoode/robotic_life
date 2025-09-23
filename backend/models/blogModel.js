const mongoose = require("mongoose"); 

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
    description: {
      type: String,
      required: true,
      // unique: true,
      index: true,
    },
    contentTitle: {
      type: String,
      default: "",
      index: true,
    },
    contentParagraphs: {
      type: String,
      default: "",
      index: true,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    logoimage: {
      type: String,
      // required: true,
      // unique: true,
      index: true,
    },
    blogcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blogcategory",
      required: true,
    },
    source: {
      type: String,
    },
    date: {
      type: String,
    },
    metatitle: {
      type: String,
    },
    metadescription: {
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

module.exports = mongoose.model("Blog", blogSchema);
