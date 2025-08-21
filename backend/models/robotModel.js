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
    images: [{
      type: String,
    }],
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
    accuracy: unitValueSchema,
    color: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Color"
      }
    ],
    material: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material"
      }
    ],
    navigationType: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "NavigationType"
    }],
    sensors: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sensor"
    }],
    primaryFunction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PrimaryFunction"
    },
    aiSoftwareFeatures: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "AISoftwareFeature"
    }],
    operatingEnvironment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OperatingEnvironment"
    },
    terrainCapability: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "TerrainCapability"
    }],
    autonomyLevel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AutonomyLevel"
    },
    communicationMethod: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommunicationMethod"
    }],
    payloadTypesSupported: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "PayloadType"
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Robot", RobotSchema);