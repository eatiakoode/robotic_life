const mongoose = require("mongoose"); // Erase if already required
const Landingpayment = require("../models/landingpaymentModel");
const Landingfloor = require("../models/landingfloorModel");
const Landingimage = require("../models/landingimagesModel");

// Declare the Schema of the Mongo model
var landingpageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
    },
    bannertitle: {
        type: String,
        required: true,
    },
    bannerdescription: {
    type: String,
    required: true,
    },
    bannerreview: {
      type: String,
      required: true,
      },
    bannerimage: {
    type: String,
    // required: true,
    },
    abouttitle: {
        type: String,
        required: true,
    },
    aboutdescription: {
    type: String,
    // required: true,
    },
    aboutimage: {
    type: String,
    // required: true,
    },
    amenityid: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Amenity", // 🔗 This should match the name you used in mongoose.model("Amenity", ...)
      // required: true,
    }],
   
    faqid: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faq", // 🔗 This should match the name you used in mongoose.model("Amenity", ...)
        // required: true,
      }],
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
    }
  },
  {
    timestamps: true,
  }
);

landingpageSchema.virtual('galleryimages', {
  ref: 'Landingimage', // Make sure this matches the model name for your images schema
  localField: '_id',
  foreignField: 'landingpageid',
});

landingpageSchema.set('toObject', { virtuals: true });
landingpageSchema.set('toJSON', { virtuals: true });


landingpageSchema.virtual('floorplan', {
  ref: 'Landingfloor', // Make sure this matches the model name for your images schema
  localField: '_id',
  foreignField: 'landingpageid',
});

landingpageSchema.set('toObject', { virtuals: true });
landingpageSchema.set('toJSON', { virtuals: true });
//Export the model


landingpageSchema.virtual('paymentplan', {
    ref: 'Landingpayment', // Make sure this matches the model name for your images schema
    localField: '_id',
    foreignField: 'landingpageid',
  });
  
  landingpageSchema.set('toObject', { virtuals: true });
  landingpageSchema.set('toJSON', { virtuals: true });

  
  //Export the model
module.exports = mongoose.model("Landingpage", landingpageSchema);


