const mongoose = require("mongoose");
const unitValueSchema = new mongoose.Schema(
  {
    value: { type: Number, required: false },
    unit: { type: String, required: false, trim: true }
  },
  { _id: false }
);

const rangeUnitSchema = new mongoose.Schema(
  {
    min: { type: Number, required: false },
    max: { type: Number, required: false },
    unit: { type: String, required: false, trim: true }
  },
  { _id: false }
);

const RobotSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    manufacturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manufacturer",
      required: true
    },
    countryOfOrigin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true
    },
    launchYear: {
      type: Number,
      min: 1900,
      max: new Date().getFullYear() + 5,
      required: true
    },
    totalPrice: {
      type: String,
      trim: true
    },
    version: {
      type: String,
      trim: true
    },
    logoImage: {
      type: String,
    },
    dimensions: {
      length: unitValueSchema,
      width: unitValueSchema,
      height: unitValueSchema
    },
    weight: unitValueSchema,
    batteryCapacity: unitValueSchema,
    loadCapacity: unitValueSchema,
    operatingTemperature: rangeUnitSchema,
    range: unitValueSchema,
    powerSource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PowerSource",
      required: true
    },
    runtime: unitValueSchema,
    speed: unitValueSchema,
    accuracy: unitValueSchema
  },
  { timestamps: true }
);

module.exports = mongoose.model("Robot", RobotSchema);