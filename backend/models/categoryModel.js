const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
      trim: true
    },
    logoimage: {
      type: String,
      // required: true,
      unique: true,
      index: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null
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
  { timestamps: true }
);

CategorySchema.pre("save", function (next) {
  if (this.parent && this.parent.equals(this._id)) {
    return next(new Error("A category cannot be its own parent."));
  }
  next();
});

module.exports = mongoose.model("Category", CategorySchema);