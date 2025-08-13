const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null
    }
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