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
    // Basic 
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true },
    description: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: "Manufacturer" },
    countryOfOrigin: { type: mongoose.Schema.Types.ObjectId, ref: "Country" },
    launchYear: { type: Number, min: 1900, max: new Date().getFullYear() + 5 },
    totalPrice: { type: Number },
    version: { type: String, trim: true },

    // Specifications
    specifications: {
      dimensions: {
        length: unitValueSchema,
        width: unitValueSchema,
        height: unitValueSchema,
        wingspan: unitValueSchema,
        reach: unitValueSchema
      },
      weight: unitValueSchema,
      speed: unitValueSchema,
      runtime: unitValueSchema,
      range: unitValueSchema,
      loadCapacity: unitValueSchema,
      accuracy: unitValueSchema,
      powerSource: { type: mongoose.Schema.Types.ObjectId, ref: "PowerSource" },
      batteryCapacity: unitValueSchema,
      batteryChargeTime: unitValueSchema,
      operatingTemperature: rangeUnitSchema,
      noiseLevel: unitValueSchema,
      energyConsumption: unitValueSchema,
      materials: [{ type: mongoose.Schema.Types.ObjectId, ref: "Material" }],
      color: [{ type: mongoose.Schema.Types.ObjectId, ref: "Color" }],
      durability: {
        ipRating: { type: String, trim: true },
        milStdCompliance: { type: String, trim: true },
        radiationShielding: { type: String, trim: true }
      },
      maintenanceInfo: {
        mtbf: unitValueSchema,
        maintenanceInterval: unitValueSchema
      }
    },

    // Capabilities
    capabilities: {
      autonomyLevel: { type: mongoose.Schema.Types.ObjectId, ref: "AutonomyLevel" },
      navigationTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: "NavigationType" }],
      communicationMethods: [{ type: mongoose.Schema.Types.ObjectId, ref: "CommunicationMethod" }],
      features: [String], 
      primaryFunction: { type: mongoose.Schema.Types.ObjectId, ref: "PrimaryFunction" },
      interoperability: [String],
      loadHandling: {
        grippingStrength: unitValueSchema,
        articulationPrecision: unitValueSchema
      },
      communicationRange: unitValueSchema
    },

    // Payloads & Attachments
    payloadsAndAttachments: {
      maxPayloadWeight: unitValueSchema,
      payloadTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: "PayloadType" }],
      attachments: [String], // names of tools, weapons, modules
      hotSwappable: { type: Boolean, default: false },
      accessoryPorts: [String]
    },

    // Sensors & Software
    sensorsAndSoftware: {
      sensors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sensor" }],
      aiSoftwareFeatures: [{ type: mongoose.Schema.Types.ObjectId, ref: "AiSoftwareFeature" }],
      operatingSystem: { type: String, trim: true },
      firmwareVersion: { type: String, trim: true },
      securityFeatures: [String],
      dataLogging: {
        storageCapacity: unitValueSchema,
        loggingInterval: unitValueSchema
      }
    },

    // Operational Environment & Applications
    operationalEnvironmentAndApplications: {
      operatingEnvironment: { type: mongoose.Schema.Types.ObjectId, ref: "OperatingEnvironment" },
      terrainCapabilities: [{ type: mongoose.Schema.Types.ObjectId, ref: "TerrainCapability" }],
      applications: [String], // military, industrial, medical, etc.
      mobilityConstraints: {
        maxSlope: unitValueSchema,
        maxStepHeight: unitValueSchema,
        maxWaterDepth: unitValueSchema
      },
      enduranceExtremeConditions: [String], // radiation, low gravity, deep sea
      deploymentLogistics: [String] // transport, foldable, lightweight
    },

    // Media
    images: [{ type: String }],
    videoEmbedCode: { type: String, trim: true },

    // Meta
    metaTitle: { type: String },
    metaDescription: { type: String },
    status: { type: Boolean, default: true, required: true },
    recentlyViewed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Robot" }],
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Robot", RobotSchema);
