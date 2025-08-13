const mongoose = require("mongoose");
const Robot = require("./robotModel");

var manufacturerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true
    },
    description: {
      type: String,
    },
    // logoImage: {
    //   type: String,
    // },
    metaTitle: {
      type: String,
    },
    metaDescription: {
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

// Virtual populate to get all robots from this manufacturer
manufacturerSchema.virtual("robotList", {
  ref: "Robot",
  localField: "_id",
  foreignField: "manufacturer",
});

manufacturerSchema.set("toObject", { virtuals: true });
manufacturerSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Manufacturer", manufacturerSchema);
