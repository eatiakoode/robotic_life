"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getManufacturerTableData } from "../../../api/manufacturer";
import { addRobotAPI as createRobot, updateRobotAPI, getRobotById } from "../../../api/robot";
import { getCountryTableData } from "../../../api/country";
import { getParentCategoriesAPI, getSubCategoriesAPI } from "@/api/category";
import { getPowerSourceTableData } from "../../../api/powersource";
import { getColorTableData } from "../../../api/color";
import { getMaterialTableData } from "../../../api/material";
import { getNavigationTypeTableData } from "../../../api/navigationtype";
import { getSensorTableData } from "../../../api/sensor";
import { getAISoftwareFeatureTableData } from "../../../api/aisoftwarefeature";
import { getPrimaryFunctionTableData } from "../../../api/primaryfunction";
import { getOperatingEnvironmentTableData } from "../../../api/operatingenvironment";
import { getAutonomyLevelTableData } from "../../../api/autonomylevel";
import { getPayloadTypeTableData } from "../../../api/payloadtype";
import { getTerrainCapabilityTableData } from "../../../api/terrain";
import { getCommunicationMethodTableData } from "../../../api/communicationmethod";

import selectedFiles from "../../../utils/selectedFiles";
import Image from "next/image";
import { toast } from "react-toastify";

const EditList = () => {
  const router = useRouter();
  const params = useParams();
  const robotId = params?.id; // Get robot ID from URL params
  const isEditMode = !!robotId; // Check if we're in edit mode

  // --- State Hooks ---
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);

  const [power, setPower] = useState([]);
  const [selectedPower, setSelectedPower] = useState("");

  const [launchYear, setLaunchYear] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("g");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [length, setLength] = useState("");
  const [lengthUnit, setLengthUnit] = useState("cm");
  const [width, setWidth] = useState("");
  const [widthUnit, setWidthUnit] = useState("cm");
  const [version, setVersion] = useState("");
  const [patentNumber, setPatentNumber] = useState("");
  const [loadCapacity, setLoadCapacity] = useState("");
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [batteryCapacityUnit, setBatteryCapacityUnit] = useState("mAh");
  const [loadCapacityUnit, setLoadCapacityUnit] = useState("kg");
  const [runtime, setRuntime] = useState("");
  const [runtimeUnit, setRuntimeUnit] = useState("h");
  const [range, setRange] = useState("");
  const [rangeUnit, setRangeUnit] = useState("km");
  const [speed, setSpeed] = useState("");
  const [speedUnit, setSpeedUnit] = useState("km/h");
  const [accuracy, setAccuracy] = useState("");
  const [accuracyUnit, setAccuracyUnit] = useState("cm");
  const [operatingTemperatureMin, setOperatingTemperatureMin] = useState("");
  const [operatingTemperatureMax, setOperatingTemperatureMax] = useState("");
  const [operatingTemperatureUnit, setOperatingTemperatureUnit] = useState("°C");
  const [chargingTime, setChargingTime] = useState("");
  const [chargingTimeUnit, setChargingTimeUnit] = useState("h");
  
  const [selectedColors, setSelectedColors] = useState([]);
  const [colors, setColors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [navigationType, setNavigationType] = useState([]);
  const [selectedNavigationType, setSelectedNavigationType] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState([]);
  const [selectedAISoftwareFeature, setSelectedAISoftwareFeature] = useState([]);
  const [aiSoftwareFeatures, setAISoftwareFeatures] = useState([]);
  const [primaryFunctions, setPrimaryFunctions] = useState([]);
  const [primaryFunction, setPrimaryFunction] = useState([]);
  const [selectedPrimaryFunction, setSelectedPrimaryFunction] = useState("");
  const [operatingEnvironment, setOperatingEnvironment] = useState([]);
  const [selectedOperatingEnvironment, setSelectedOperatingEnvironment] = useState("");
  const [terrainCapabilities, setTerrainCapabilities] = useState([]);
  const [selectedTerrainCapability, setSelectedTerrainCapability] = useState([]);
  const [communicationMethods, setCommunicationMethods] = useState([]);
  const [selectedCommunicationMethod, setSelectedCommunicationMethod] = useState([]);
  const [autonomyLevel, setAutonomyLevel] = useState([]);
  const [selectedAutonomyLevel, setSelectedAutonomyLevel] = useState("");
  const [payloadTypes, setPayloadTypes] = useState([]);
  const [selectedPayloadType, setSelectedPayloadType] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState("");

  const [videoembedcode, setVideoEmbedCode] = useState("");
  const [nearby, setNearBy] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [metatitle, setMetatitle] = useState("");
  const [metadescription, setMetaDescription] = useState("");
  const [status, setStatus] = useState(true); // true = Active, false = Inactive

  const [featuredimage, setFeaturedImage] = useState(null);
  const [existingFeaturedImage, setExistingFeaturedImage] = useState("");
  const [robotSelectedImgs, setRobotSelectedImgs] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // Additional fields from add form
  const [feature, setFeature] = useState("");
  const [interoperability, setInteroperability] = useState("");
  const [attachments, setAttachments] = useState("");
  const [accessoryPorts, setAccessoryPorts] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");
  const [firmwareVersion, setFirmwareVersion] = useState("");
  const [securityFeatures, setSecurityFeatures] = useState("");
  const [applications, setApplications] = useState("");
  const [enduranceExtremeConditions, setEnduranceExtremeConditions] = useState("");
  const [deploymentLogistics, setDeploymentLogistics] = useState("");

  const [storageCapacity, setStorageCapacity] = useState("");
  const [storageCapacityUnit, setStorageCapacityUnit] = useState("B");
  const [loggingInterval, setLoggingInterval] = useState("");
  const [loggingIntervalUnit, setLoggingIntervalUnit] = useState("s");
  const [maxSlope, setMaxSlope] = useState("");
  const [maxSlopeUnit, setMaxSlopeUnit] = useState("°");
  const [maxStepHeight, setMaxStepHeight] = useState("");
  const [maxStepHeightUnit, setMaxStepHeightUnit] = useState("cm");
  const [maxWaterDepth, setMaxWaterDepth] = useState("");
  const [maxWaterDepthUnit, setMaxWaterDepthUnit] = useState("m");

  const [noiseLevel, setNoiseLevel] = useState("");
  const [noiseLevelUnit, setNoiseLevelUnit] = useState("dB");
  const [energyConsumption, setEnergyConsumption] = useState("");
  const [energyConsumptionUnit, setEnergyConsumptionUnit] = useState("Wh");
  const [wingspan, setWingspan] = useState("");
  const [wingspanUnit, setWingspanUnit] = useState("cm");
  const [ipRating, setIpRating] = useState("");
  const [milStdCompliance, setMilStdCompliance] = useState("");
  const [radiationShielding, setRadiationShielding] = useState("");
  const [mtbf, setMtbf] = useState("");
  const [mtbfUnit, setMtbfUnit] = useState("h");
  const [maintenanceInterval, setMaintenanceInterval] = useState("");
  const [maintenanceIntervalUnit, setMaintenanceIntervalUnit] = useState("h");
  const [grippingStrength, setGrippingStrength] = useState("");
  const [grippingStrengthUnit, setGrippingStrengthUnit] = useState("kg");
  const [articulationPrecision, setArticulationPrecision] = useState("");
  const [articulationPrecisionUnit, setArticulationPrecisionUnit] = useState("°");
  const [communicationRange, setCommunicationRange] = useState("");
  const [communicationRangeUnit, setCommunicationRangeUnit] = useState("m");
  const [hotSwappable, setHotSwappable] = useState(false);

  const normalizeImagePath = (path) => {
    if (!path) return "";
    
    // If it's already a full URL, return as is
    if (path.startsWith("http")) {
      return path;
    }
    
    // Get the backend API URL and construct full image URL
    const apiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || "http://localhost:5000/";
    const cleanPath = path.replace(/^public\//, "");
    const fullImageUrl = apiUrl + cleanPath;
    
    return fullImageUrl;
  };

  // Load existing robot data when in edit mode
  useEffect(() => {
    const loadRobotData = async () => {
      if (!isEditMode || !robotId) return;
      
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const token = userData?.token;
        if (!token) {
          toast.error("User not authenticated");
          router.push("/login");
          return;
        }

        const robotData = await getRobotById(robotId, token);
        
        if (robotData) {
          // Basic fields
          setTitle(robotData.title || "");
          setSlug(robotData.slug || "");
          setDescription(robotData.description || "");
          setPrice(robotData.totalPrice || "");
          setLaunchYear(robotData.launchYear || "");
          setVersion(robotData.version || "");
          
          // Country and location
          setSelectedCountry(robotData.countryOfOrigin?._id || robotData.countryOfOrigin || "");
          
          // Category and subcategory
          setSelectedCategory(robotData.category?._id || robotData.category || "");
          setSelectedSubCategory(robotData.subcategoryid?._id || robotData.subcategoryid || "");
          
          // Manufacturer
          setSelectedManufacturer(robotData.manufacturer?._id || robotData.manufacturer || "");
          
          // Power source
          setSelectedPower(robotData.powerSource?._id || robotData.powerSource || "");
          
          // Dimensions
          if (robotData.dimensions) {
            setLength(robotData.dimensions.length?.value || "");
            setLengthUnit(robotData.dimensions.length?.unit || "cm");
            setWidth(robotData.dimensions.width?.value || "");
            setWidthUnit(robotData.dimensions.width?.unit || "cm");
            setHeight(robotData.dimensions.height?.value || "");
            setHeightUnit(robotData.dimensions.height?.unit || "cm");
          }
          
          // Weight
          if (robotData.weight) {
            setWeight(robotData.weight.value || "");
            setWeightUnit(robotData.weight.unit || "g");
          }
          
          // Battery
          if (robotData.batteryCapacity) {
            setBatteryCapacity(robotData.batteryCapacity.value || "");
            setBatteryCapacityUnit(robotData.batteryCapacity.unit || "mAh");
          }
          
          // Load capacity
          if (robotData.loadCapacity) {
            setLoadCapacity(robotData.loadCapacity.value || "");
            setLoadCapacityUnit(robotData.loadCapacity.unit || "kg");
          }
          
          // Runtime
          if (robotData.runtime) {
            setRuntime(robotData.runtime.value || "");
            setRuntimeUnit(robotData.runtime.unit || "h");
          }
          
          // Speed
          if (robotData.speed) {
            setSpeed(robotData.speed.value || "");
            setSpeedUnit(robotData.speed.unit || "km/h");
          }
          
          // Accuracy
          if (robotData.accuracy) {
            setAccuracy(robotData.accuracy.value || "");
            setAccuracyUnit(robotData.accuracy.unit || "cm");
          }
          
          // Range
          if (robotData.range) {
            setRange(robotData.range.value || "");
            setRangeUnit(robotData.range.unit || "km");
          }
          
          // Operating temperature
          if (robotData.operatingTemperature) {
            setOperatingTemperatureMin(robotData.operatingTemperature.min || "");
            setOperatingTemperatureMax(robotData.operatingTemperature.max || "");
            setOperatingTemperatureUnit(robotData.operatingTemperature.unit || "°C");
          }
          
          // Charging time
          if (robotData.chargingTime) {
            setChargingTime(robotData.chargingTime.value || robotData.chargingTime || "");
            setChargingTimeUnit(robotData.chargingTime.unit || "h");
          }

          // Additional fields from add form
          setFeature(robotData.capabilities?.features?.[0] || "");
          setInteroperability(robotData.capabilities?.interoperability?.[0] || "");
          setAttachments(robotData.payloadsAndAttachments?.attachments?.[0] || "");
          setAccessoryPorts(robotData.payloadsAndAttachments?.accessoryPorts?.[0] || "");
          setOperatingSystem(robotData.sensorsAndSoftware?.operatingSystem || "");
          setFirmwareVersion(robotData.sensorsAndSoftware?.firmwareVersion || "");
          setSecurityFeatures(robotData.sensorsAndSoftware?.securityFeatures?.[0] || "");
          setApplications(robotData.operationalEnvironmentAndApplications?.applications?.[0] || "");
          setEnduranceExtremeConditions(robotData.operationalEnvironmentAndApplications?.enduranceExtremeConditions?.[0] || "");
          setDeploymentLogistics(robotData.operationalEnvironmentAndApplications?.deploymentLogistics?.[0] || "");

          // Data logging
          if (robotData.sensorsAndSoftware?.dataLogging?.storageCapacity) {
            setStorageCapacity(robotData.sensorsAndSoftware.dataLogging.storageCapacity.value || "");
            setStorageCapacityUnit(robotData.sensorsAndSoftware.dataLogging.storageCapacity.unit || "B");
          }
          if (robotData.sensorsAndSoftware?.dataLogging?.loggingInterval) {
            setLoggingInterval(robotData.sensorsAndSoftware.dataLogging.loggingInterval.value || "");
            setLoggingIntervalUnit(robotData.sensorsAndSoftware.dataLogging.loggingInterval.unit || "s");
          }

          // Mobility constraints
          if (robotData.operationalEnvironmentAndApplications?.mobilityConstraints?.maxSlope) {
            setMaxSlope(robotData.operationalEnvironmentAndApplications.mobilityConstraints.maxSlope.value || "");
            setMaxSlopeUnit(robotData.operationalEnvironmentAndApplications.mobilityConstraints.maxSlope.unit || "°");
          }
          if (robotData.operationalEnvironmentAndApplications?.mobilityConstraints?.maxStepHeight) {
            setMaxStepHeight(robotData.operationalEnvironmentAndApplications.mobilityConstraints.maxStepHeight.value || "");
            setMaxStepHeightUnit(robotData.operationalEnvironmentAndApplications.mobilityConstraints.maxStepHeight.unit || "cm");
          }
          if (robotData.operationalEnvironmentAndApplications?.mobilityConstraints?.maxWaterDepth) {
            setMaxWaterDepth(robotData.operationalEnvironmentAndApplications.mobilityConstraints.maxWaterDepth.value || "");
            setMaxWaterDepthUnit(robotData.operationalEnvironmentAndApplications.mobilityConstraints.maxWaterDepth.unit || "m");
          }

          // Additional specifications
          if (robotData.specifications?.noiseLevel) {
            setNoiseLevel(robotData.specifications.noiseLevel.value || "");
            setNoiseLevelUnit(robotData.specifications.noiseLevel.unit || "dB");
          }
          if (robotData.specifications?.energyConsumption) {
            setEnergyConsumption(robotData.specifications.energyConsumption.value || "");
            setEnergyConsumptionUnit(robotData.specifications.energyConsumption.unit || "Wh");
          }
          if (robotData.specifications?.dimensions?.wingspan) {
            setWingspan(robotData.specifications.dimensions.wingspan.value || "");
            setWingspanUnit(robotData.specifications.dimensions.wingspan.unit || "cm");
          }

          // Durability
          setIpRating(robotData.specifications?.durability?.ipRating || "");
          setMilStdCompliance(robotData.specifications?.durability?.milStdCompliance || "");
          setRadiationShielding(robotData.specifications?.durability?.radiationShielding || "");

          // Maintenance info
          if (robotData.specifications?.maintenanceInfo?.mtbf) {
            setMtbf(robotData.specifications.maintenanceInfo.mtbf.value || "");
            setMtbfUnit(robotData.specifications.maintenanceInfo.mtbf.unit || "h");
          }
          if (robotData.specifications?.maintenanceInfo?.maintenanceInterval) {
            setMaintenanceInterval(robotData.specifications.maintenanceInfo.maintenanceInterval.value || "");
            setMaintenanceIntervalUnit(robotData.specifications.maintenanceInfo.maintenanceInterval.unit || "h");
          }

          // Load handling
          if (robotData.capabilities?.loadHandling?.grippingStrength) {
            setGrippingStrength(robotData.capabilities.loadHandling.grippingStrength.value || "");
            setGrippingStrengthUnit(robotData.capabilities.loadHandling.grippingStrength.unit || "kg");
          }
          if (robotData.capabilities?.loadHandling?.articulationPrecision) {
            setArticulationPrecision(robotData.capabilities.loadHandling.articulationPrecision.value || "");
            setArticulationPrecisionUnit(robotData.capabilities.loadHandling.articulationPrecision.unit || "°");
          }

          // Communication range
          if (robotData.capabilities?.communicationRange) {
            setCommunicationRange(robotData.capabilities.communicationRange.value || "");
            setCommunicationRangeUnit(robotData.capabilities.communicationRange.unit || "m");
          }

          // Hot swappable
          setHotSwappable(robotData.payloadsAndAttachments?.hotSwappable || false);
          
          // Multi-select fields - extract IDs from objects or use direct IDs
          setSelectedColors(robotData.color?.map(c => c._id || c) || []);
          setSelectedMaterials(robotData.material?.map(m => m._id || m) || []);
          setSelectedNavigationType(robotData.navigationType?.map(n => n._id || n) || []);
          setSelectedSensor(robotData.sensors?.map(s => s._id || s) || []);
          setSelectedAISoftwareFeature(robotData.aiSoftwareFeatures?.map(a => a._id || a) || []);
          setSelectedTerrainCapability(robotData.terrainCapability?.map(t => t._id || t) || []);
          setSelectedCommunicationMethod(robotData.communicationMethod?.map(c => c._id || c) || []);
          setSelectedPayloadType(robotData.payloadTypesSupported?.map(p => p._id || p) || []);
          
          // Single select fields
          setSelectedPrimaryFunction(robotData.primaryFunction?._id || robotData.primaryFunction || "");
          setSelectedOperatingEnvironment(robotData.operatingEnvironment?._id || robotData.operatingEnvironment || "");
          setSelectedAutonomyLevel(robotData.autonomyLevel?._id || robotData.autonomyLevel || "");
          
          // Media
          setVideoEmbedCode(robotData.videoEmbedCode || "");
          setExistingFeaturedImage(robotData.featuredimage || "");
          setExistingImages(robotData.images || []);
          
          // Debug image data
          console.log("Robot image data:", robotData.images);
          console.log("Featured image data:", robotData.featuredimage);
          
          // Meta information
          setMetatitle(robotData.metaTitle || "");
          setMetaDescription(robotData.metaDescription || "");
          
          // Status
          setStatus(robotData.status !== undefined ? robotData.status : true);
          
          // If category is selected, load subcategories
          if (robotData.category?._id || robotData.category) {
            const categoryId = robotData.category?._id || robotData.category;
            try {
              const subs = await getSubCategoriesAPI(categoryId);
              setSubCategories(Array.isArray(subs) ? subs : []);
            } catch (err) {
              console.error("Error loading subcategories:", err);
            }
          }
        }
      } catch (err) {
        console.error("Error loading robot data:", err);
        toast.error("Failed to load robot data");
      } finally {
        setLoading(false);
      }
    };

    loadRobotData();
  }, [isEditMode, robotId, router]);
  

  // Load initial dropdown data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const filter = { limit: 1000, page: 1 };

        const [
          countryRes,
          parentCats,
          manufacturerRes,
          powerRes,
          colorRes,
          materialRes,
          navTypeRes,
          sensorRes,
          aiRes,
          primaryFuncRes,
          opEnvRes,
          autonomyRes,
          payloadRes,
          terrainRes,
          commMethodRes,
        ] = await Promise.all([
          getCountryTableData(),
          getParentCategoriesAPI(),
          getManufacturerTableData(filter),
          getPowerSourceTableData(),
          getColorTableData(),
          getMaterialTableData(),
          getNavigationTypeTableData(),
          getSensorTableData(),
          getAISoftwareFeatureTableData(),
          getPrimaryFunctionTableData(),
          getOperatingEnvironmentTableData(),
          getAutonomyLevelTableData(),
          getPayloadTypeTableData(),
          getTerrainCapabilityTableData(),
          getCommunicationMethodTableData(),
        ]);

        setCountries(countryRes || []);
        setCategories(Array.isArray(parentCats) ? parentCats : []);
        setManufacturers(
          Array.isArray(manufacturerRes?.items)
            ? manufacturerRes.items
            : Array.isArray(manufacturerRes)
              ? manufacturerRes
              : []
        );
        setPower(Array.isArray(powerRes) ? powerRes : powerRes?.data || []);
        setColors(Array.isArray(colorRes) ? colorRes : colorRes?.data || []);
        setMaterials(Array.isArray(materialRes) ? materialRes : materialRes?.data || []);
        setNavigationType(Array.isArray(navTypeRes) ? navTypeRes : navTypeRes?.data || []);
        setSensors(Array.isArray(sensorRes) ? sensorRes : sensorRes?.data || []);
        setAISoftwareFeatures(Array.isArray(aiRes) ? aiRes : aiRes?.data || []);
        setPrimaryFunction(Array.isArray(primaryFuncRes) ? primaryFuncRes : primaryFuncRes?.data || []);
        setOperatingEnvironment(Array.isArray(opEnvRes) ? opEnvRes : opEnvRes?.data || []);
        setAutonomyLevel(Array.isArray(autonomyRes) ? autonomyRes : autonomyRes?.data || []);
        setPayloadTypes(Array.isArray(payloadRes) ? payloadRes : payloadRes?.data || []);
        setTerrainCapabilities(Array.isArray(terrainRes) ? terrainRes : terrainRes?.data || []);
        setCommunicationMethods(Array.isArray(commMethodRes) ? commMethodRes : commMethodRes?.data || []);
      } catch (err) {
        console.error("Error loading initial data:", err);
      }
    };

    fetchData();
  }, []);

  // Generate slug from title
  const generateSlug = (titleText) => {
    if (!titleText) return "";
    return titleText
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  // Auto-generate slug from title - Updated logic for both create and edit modes
  useEffect(() => {
    if (title) {
      // Always generate slug when title changes (both create and edit modes)
      const generatedSlug = generateSlug(title);
      setSlug(generatedSlug);
    }
  }, [title]);

  // --- Handlers ---
  const handleCountryChange = async (e) => {
    const value = e.target.value;
    setSelectedCountry(value);
    try {
      const res = await getCountryTableData(value);
      setStates(res.data || []);
    } catch (err) {
      console.error("Error fetching states:", err);
    }
  };

  const handleCategoryChange = async (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setSelectedSubCategory("");
    if (!value) {
      setSubCategories([]);
      return;
    }
    try {
      const subs = await getSubCategoriesAPI(value);
      setSubCategories(Array.isArray(subs) ? subs : []);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
      setSubCategories([]);
    }
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  const handleManufacturerChange = (e) => {
    setSelectedManufacturer(e.target.value);
  };

  const handlePowerChange = (e) => {
    setSelectedPower(e.target.value);
  };

  const handlePrimaryFunctionChange = (e) => {
    setSelectedPrimaryFunction(e.target.value);
  };

  const handleOperatingEnvironmentChange = (e) => {
    setSelectedOperatingEnvironment(e.target.value);
  };

  const handleAutonomyLevelChange = (e) => {
    setSelectedAutonomyLevel(e.target.value);
  };

  const handleColorChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedColors(values);
  };

  const handleNavigationTypeChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedNavigationType(values);
  };

  const handleSensorChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedSensor(values);
  };

  const handleAISoftwareFeatureChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedAISoftwareFeature(values);
  };

  const handleTerrainCapabilityChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedTerrainCapability(values);
  };

  const handleCommunicationMethodChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedCommunicationMethod(values);
  };

  const handlePayloadTypeChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedPayloadType(values);
  };

  const handleMaterialChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedMaterials(values);
  };

  // Upload profile
  const uploadFeaturedImage = (e) => {
    setFeaturedImage(e.target.files[0]);
  };

  // Multiple image select
  const multipleImage = (e) => {
    const isExist = robotSelectedImgs?.some((file1) =>
      selectedFiles(e)?.some((file2) => file1.name === file2.name)
    );

    if (!isExist) {
      setRobotSelectedImgs((old) => [...old, ...selectedFiles(e)]);
    } else {
      alert("You have selected one image already!");
    }
  };

  // Delete new image
  const deleteImage = (name) => {
    const deleted = robotSelectedImgs?.filter((file) => file.name !== name);
    setRobotSelectedImgs(deleted);
  };

  // Delete existing image
  const deleteExistingImage = (index) => {
    const updated = existingImages.filter((_, i) => i !== index);
    setExistingImages(updated);
  };

  // --- Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Always generate slug from title to ensure consistency
    let finalSlug = title?.trim() ? generateSlug(title) : "";
    if (finalSlug !== slug) {
      setSlug(finalSlug);
    }

    // Validation list - Only essential fields are required
    const requiredFields = [
      { key: "title", value: title, name: "Title" },
      { key: "description", value: description, name: "Description" },
    ];

    // Check for empty required fields
    requiredFields.forEach((field) => {
      if (!field.value || (typeof field.value === "string" && !field.value.trim())) {
        newErrors[field.key] = `${field.name} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const token = userData?.token;
      if (!token) {
        toast.error("User not authenticated");
        return;
      }

      setLoading(true);

      const formData = new FormData();

      // Append basic fields - Make sure slug is included
      formData.append("title", title?.trim() || "");
      formData.append("slug", finalSlug || "");
      formData.append("description", description?.trim() || "");
      formData.append("status", status ? "true" : "false");
      formData.append("totalPrice", price?.toString() || "");
      formData.append("countryOfOrigin", selectedCountry || "");
      // Use subcategory ID if selected, otherwise use parent category ID
      const categoryToSave = selectedSubCategory || selectedCategory;
      formData.append("category", categoryToSave || "");
      formData.append("subcategoryid", selectedSubCategory || "");
      formData.append("manufacturer", selectedManufacturer || "");
      formData.append("launchYear", launchYear?.toString() || "");
      if (version) formData.append("version", version);
      formData.append("specifications.powerSource", selectedPower || "");
      formData.append("videoEmbedCode", videoembedcode?.trim() || "");
      formData.append("capabilities.primaryFunction", selectedPrimaryFunction || "");
      formData.append("operationalEnvironmentAndApplications.operatingEnvironment", selectedOperatingEnvironment || "");
      formData.append("capabilities.autonomyLevel", selectedAutonomyLevel || "");
      if (metatitle) formData.append("metaTitle", metatitle);
      if (metadescription) formData.append("metaDescription", metadescription);

      // Featured image
      if (featuredimage) {
        formData.append("featuredimage", featuredimage);
      }

      // Append multi-selects
      selectedColors.forEach((color) => formData.append("specifications.color", color));
      selectedMaterials.forEach((material) => formData.append("specifications.materials", material));
      selectedNavigationType.forEach((nav) => formData.append("capabilities.navigationTypes", nav));
      selectedSensor.forEach((s) => formData.append("sensorsAndSoftware.sensors", s));
      selectedAISoftwareFeature.forEach((a) => formData.append("sensorsAndSoftware.aiSoftwareFeatures", a));
      selectedTerrainCapability.forEach((t) => formData.append("operationalEnvironmentAndApplications.terrainCapabilities", t));
      selectedCommunicationMethod.forEach((c) => formData.append("capabilities.communicationMethods", c));
      selectedPayloadType.forEach((p) => formData.append("payloadsAndAttachments.payloadTypes", p));

      // Append nested unit/value fields
      if (length) formData.append("specifications.dimensions.length.value", String(length));
      if (lengthUnit) formData.append("specifications.dimensions.length.unit", String(lengthUnit));
      if (width) formData.append("specifications.dimensions.width.value", String(width));
      if (widthUnit) formData.append("specifications.dimensions.width.unit", String(widthUnit));
      if (height) formData.append("specifications.dimensions.height.value", String(height));
      if (heightUnit) formData.append("specifications.dimensions.height.unit", String(heightUnit));

      if (weight) formData.append("specifications.weight.value", String(weight));
      if (weightUnit) formData.append("specifications.weight.unit", String(weightUnit));

      if (batteryCapacity) formData.append("specifications.batteryCapacity.value", String(batteryCapacity));
      if (batteryCapacityUnit) formData.append("specifications.batteryCapacity.unit", String(batteryCapacityUnit));

      if (loadCapacity) formData.append("specifications.loadCapacity.value", String(loadCapacity));
      if (loadCapacityUnit) formData.append("specifications.loadCapacity.unit", String(loadCapacityUnit));

      if (runtime) formData.append("specifications.runtime.value", String(runtime));
      if (runtimeUnit) formData.append("specifications.runtime.unit", String(runtimeUnit));

      if (speed) formData.append("specifications.speed.value", String(speed));
      if (speedUnit) formData.append("specifications.speed.unit", String(speedUnit));

      if (accuracy) formData.append("specifications.accuracy.value", String(accuracy));
      if (accuracyUnit) formData.append("specifications.accuracy.unit", String(accuracyUnit));

      if (range) formData.append("specifications.range.value", String(range));
      if (rangeUnit) formData.append("specifications.range.unit", String(rangeUnit));

      if (operatingTemperatureMin) formData.append("specifications.operatingTemperature.min", String(operatingTemperatureMin));
      if (operatingTemperatureMax) formData.append("specifications.operatingTemperature.max", String(operatingTemperatureMax));
      if (operatingTemperatureUnit) formData.append("specifications.operatingTemperature.unit", String(operatingTemperatureUnit));

      if (chargingTime) {
        formData.append("specifications.batteryChargeTime.value", String(chargingTime));
        formData.append("specifications.batteryChargeTime.unit", String(chargingTimeUnit));
      }

      // Additional fields from add form
      if (feature) formData.append("capabilities.features", feature.trim());
      if (interoperability) formData.append("capabilities.interoperability", interoperability.trim());
      if (attachments) formData.append("payloadsAndAttachments.attachments", attachments.trim());
      if (accessoryPorts) formData.append("payloadsAndAttachments.accessoryPorts", accessoryPorts.trim());
      if (operatingSystem) formData.append("sensorsAndSoftware.operatingSystem", operatingSystem.trim());
      if (firmwareVersion) formData.append("sensorsAndSoftware.firmwareVersion", firmwareVersion.trim());
      if (securityFeatures) formData.append("sensorsAndSoftware.securityFeatures", securityFeatures.trim());
      if (applications) formData.append("operationalEnvironmentAndApplications.applications", applications.trim());
      if (enduranceExtremeConditions) formData.append("operationalEnvironmentAndApplications.enduranceExtremeConditions", enduranceExtremeConditions.trim());
      if (deploymentLogistics) formData.append("operationalEnvironmentAndApplications.deploymentLogistics", deploymentLogistics.trim());

      // Data logging fields
      if (storageCapacity) {
        formData.append("sensorsAndSoftware.dataLogging.storageCapacity.value", String(storageCapacity));
        formData.append("sensorsAndSoftware.dataLogging.storageCapacity.unit", storageCapacityUnit);
      }
      if (loggingInterval) {
        formData.append("sensorsAndSoftware.dataLogging.loggingInterval.value", String(loggingInterval));
        formData.append("sensorsAndSoftware.dataLogging.loggingInterval.unit", loggingIntervalUnit);
      }

      // Mobility constraints
      if (maxSlope) {
        formData.append("operationalEnvironmentAndApplications.mobilityConstraints.maxSlope.value", String(maxSlope));
        formData.append("operationalEnvironmentAndApplications.mobilityConstraints.maxSlope.unit", maxSlopeUnit);
      }
      if (maxStepHeight) {
        formData.append("operationalEnvironmentAndApplications.mobilityConstraints.maxStepHeight.value", String(maxStepHeight));
        formData.append("operationalEnvironmentAndApplications.mobilityConstraints.maxStepHeight.unit", maxStepHeightUnit);
      }
      if (maxWaterDepth) {
        formData.append("operationalEnvironmentAndApplications.mobilityConstraints.maxWaterDepth.value", String(maxWaterDepth));
        formData.append("operationalEnvironmentAndApplications.mobilityConstraints.maxWaterDepth.unit", maxWaterDepthUnit);
      }

      // Additional specifications
      if (noiseLevel) {
        formData.append("specifications.noiseLevel.value", String(noiseLevel));
        formData.append("specifications.noiseLevel.unit", noiseLevelUnit);
      }
      if (energyConsumption) {
        formData.append("specifications.energyConsumption.value", String(energyConsumption));
        formData.append("specifications.energyConsumption.unit", energyConsumptionUnit);
      }
      if (wingspan) {
        formData.append("specifications.dimensions.wingspan.value", String(wingspan));
        formData.append("specifications.dimensions.wingspan.unit", wingspanUnit);
      }

      // Durability fields
      if (ipRating) formData.append("specifications.durability.ipRating", ipRating.trim());
      if (milStdCompliance) formData.append("specifications.durability.milStdCompliance", milStdCompliance.trim());
      if (radiationShielding) formData.append("specifications.durability.radiationShielding", radiationShielding.trim());

      // Maintenance info
      if (mtbf) {
        formData.append("specifications.maintenanceInfo.mtbf.value", String(mtbf));
        formData.append("specifications.maintenanceInfo.mtbf.unit", mtbfUnit);
      }
      if (maintenanceInterval) {
        formData.append("specifications.maintenanceInfo.maintenanceInterval.value", String(maintenanceInterval));
        formData.append("specifications.maintenanceInfo.maintenanceInterval.unit", maintenanceIntervalUnit);
      }

      // Load handling
      if (grippingStrength) {
        formData.append("capabilities.loadHandling.grippingStrength.value", String(grippingStrength));
        formData.append("capabilities.loadHandling.grippingStrength.unit", grippingStrengthUnit);
      }
      if (articulationPrecision) {
        formData.append("capabilities.loadHandling.articulationPrecision.value", String(articulationPrecision));
        formData.append("capabilities.loadHandling.articulationPrecision.unit", articulationPrecisionUnit);
      }

      // Communication range
      if (communicationRange) {
        formData.append("capabilities.communicationRange.value", String(communicationRange));
        formData.append("capabilities.communicationRange.unit", communicationRangeUnit);
      }

      // Hot swappable
      formData.append("payloadsAndAttachments.hotSwappable", hotSwappable ? "true" : "false");

      // Append new images
      robotSelectedImgs.forEach((file) => {
        formData.append("images", file);
      });

      // In edit mode, append existing images that should be kept
      if (isEditMode && existingImages.length > 0) {
        formData.append("existingImages", JSON.stringify(existingImages));
      }
      
      // In edit mode, append existing featured image if no new one is selected
      if (isEditMode && existingFeaturedImage && !featuredimage) {
        formData.append("existingFeaturedImage", existingFeaturedImage);
      }

      // Debug: Log what's being sent
      console.log("FormData contents:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      let res;
      if (isEditMode) {
        res = await updateRobotAPI(robotId, formData, token);
      } else {
        res = await createRobot(formData, token);
      }

      toast.success(res.message || `Robot ${isEditMode ? 'updated' : 'created'} successfully!`);
      router.push("/cmsroboticlife/my-robot");
      setError({});
    } catch (err) {
      console.error(err);
      setError({ general: err.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading robot data...</p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="row">
        {/* Robot title start */}
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="roboTitle">Robot Title *</label>
            <input
              type="text"
              className="form-control"
              id="roboTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter robot Title"
            />
            {error.title && <span className="text-danger">{error.title}</span>}
          </div>
        </div>

        {/* Robot slug start */}
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="roboSlug">Robot Slug <span className="text-muted">(Auto-generated)</span></label>
            <input
              type="text"
              className="form-control"
              id="roboSlug"
              value={slug}

              placeholder="Auto-generated slug"
              disabled={true}
              style={{ backgroundColor: '#f8f9fa', cursor: 'not-allowed' }}
            />
            <small className="text-muted">Slug is automatically generated from the title</small>
            {error.slug && <span className="text-danger">{error.slug}</span>}
          </div>
        </div>

        {/* Robot description start */}
        <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="roboDescription">Description *</label>
            <textarea
              id="roboDescription"
              className="form-control"
              rows="7"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter robo description"
            ></textarea>
            {error.description && (
              <span className="text-danger">{error.description}</span>
            )}
          </div>
        </div>

        {/* Robot status start */}
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="roboStatus">Status</label>
            <select
              id="roboStatus"
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value === 'true')}
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
            {error.status && <span className="text-danger">{error.status}</span>}
          </div>
        </div>

        {/* Robot category start */}
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label>Category</label>
            <select
              id="categorySelect"
              className="selectpicker form-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name || cat.title}
                </option>
              ))}
            </select>
            {error.categoryid && (
              <span className="text-danger">{error.categoryid}</span>
            )}
          </div>
        </div>

        {/* Sub Category Field */}
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label>Sub Category</label>
            <select
              id="subCategorySelect"
              className="selectpicker form-select"
              value={selectedSubCategory}
              onChange={handleSubCategoryChange}
              data-live-search="true"
              data-width="100%"
              disabled={!selectedCategory || subCategories.length === 0}
            >
              <option value="">-- Select Sub Category --</option>
              {subCategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name || sub.title}
                </option>
              ))}
            </select>
            {error.subcategoryid && (
              <span className="text-danger">{error.subcategoryid}</span>
            )}
          </div>
        </div>

        {/* Robot manufacturer start */}
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label>Manufacturer</label>
            <select
              id="manufacturerSelect"
              className="selectpicker form-select"
              value={selectedManufacturer}
              onChange={handleManufacturerChange}
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select Manufacturer --</option>
              {manufacturers.map((manufacturer) => (
                <option key={manufacturer._id} value={manufacturer._id}>
                  {manufacturer.name || manufacturer.title}
                </option>
              ))}
            </select>
            {error.manufacturerid && (
              <span className="text-danger">{error.manufacturerid}</span>
            )}
          </div>
        </div>

        {/* Robot country start */}
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label htmlFor="countrySelect">Country of Origin *</label>
            <select
              id="countrySelect"
              className="selectpicker form-select"
              value={selectedCountry}
              onChange={handleCountryChange}
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select Country --</option>
              {countries.map((country) => (
                <option key={country._id} value={country._id}>
                  {country.title}
                </option>
              ))}
            </select>
            {error.countryid && (
              <span className="text-danger">{error.countryid}</span>
            )}
          </div>
        </div>

        {/* Robot launch year start */}
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="launchYear">Launch Year *</label>
            <select
              id="launchYear"
              className="form-control"
              value={launchYear}
              onChange={(e) => setLaunchYear(e.target.value)}
            >
              <option value="">-- Select Year --</option>
              {Array.from({ length: 101 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
            {error.launchYear && (
              <span className="text-danger">{error.launchYear}</span>
            )}
          </div>
        </div>

        {/* Robot price start */}
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="roboPrice">Total Price</label>
            <input
              type="text"
              className="form-control"
              id="roboPrice"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter Robot Price"
            />
            {error.price && <span className="text-danger">{error.price}</span>}
          </div>
        </div>

        {/* Robot version start */}
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="version">Version</label>
            <input
              type="text"
              className="form-control"
              id="version"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="Enter Version"
            />
          </div>
        </div>

        {/* Specifications start */}
        <div className="mt30">
          <div className="col-lg-12">
            <h3 className="mb30">Specifications</h3>
          </div>
          <div className="row">
            {/* Dimensions Start */}
            <div className="col-lg-12">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="dimensions">Dimensions</label>
                {/* Dimension row start */}
                <div className="row">
                  {/* Length start */}
                  <div className="col-lg-6 position-relative mb-2">
                    <input
                      type="number"
                      className="form-control pe-5"
                      placeholder="Enter Robot Length *"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                    />
                    <select
                      className="form-select position-absolute end-0 border-0 bg-transparent"
                      style={{
                        width: "auto",
                        height: "auto",
                        top: "50%",
                        transform: "translateY(-50%)",
                        paddingRight: "30px",
                        paddingLeft: "8px",
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                      }}
                      value={lengthUnit}
                      onChange={(e) => setLengthUnit(e.target.value)}
                    >
                      <option value="cm">cm</option>
                      <option value="mm">mm</option>
                      <option value="inch">inch</option>
                      <option value="ft">ft</option>
                    </select>
                  </div>

                  {/* Width start */}
                  <div className="col-lg-6 position-relative mb-2">
                    <input
                      type="number"
                      className="form-control pe-5"
                      placeholder="Enter Robot Width *"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                    />
                    <select
                      className="form-select position-absolute end-0 border-0 bg-transparent"
                      style={{
                        width: "auto",
                        height: "auto",
                        top: "50%",
                        transform: "translateY(-50%)",
                        paddingRight: "30px",
                        paddingLeft: "8px",
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                      }}
                      value={widthUnit}
                      onChange={(e) => setWidthUnit(e.target.value)}
                    >
                      <option value="cm">cm</option>
                      <option value="mm">mm</option>
                      <option value="inch">inch</option>
                      <option value="ft">ft</option>
                    </select>
                  </div>

                  {/* Height start */}
                  <div className="col-lg-6 position-relative mb-2">
                    <input
                      type="number"
                      className="form-control pe-5"
                      placeholder="Enter Robot Height *"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                    <select
                      className="form-select position-absolute end-0 border-0 bg-transparent"
                      style={{
                        width: "auto",
                        height: "auto",
                        top: "50%",
                        transform: "translateY(-50%)",
                        paddingRight: "30px",
                        paddingLeft: "8px",
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                      }}
                      value={heightUnit}
                      onChange={(e) => setHeightUnit(e.target.value)}
                    >
                      <option value="cm">cm</option>
                      <option value="m">m</option>
                      <option value="inch">inch</option>
                      <option value="ft">ft</option>
                    </select>
                  </div>
                </div>

                {/* Another row starts */}
                <div className="row">
                  {/* Weight start */}
                  <div className="col-lg-6 mb-2">
                    <label htmlFor="weight">Weight</label>
                    <div className="position-relative">
                      <input
                        type="number"
                        className="form-control pe-5"
                        placeholder="Enter Robot Weight *"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                      <select
                        className="form-select position-absolute end-0 border-0 bg-transparent"
                        style={{
                          width: "auto",
                          height: "auto",
                          top: "50%",
                          transform: "translateY(-50%)",
                          paddingRight: "30px",
                          paddingLeft: "8px",
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                        }}
                        value={weightUnit}
                        onChange={(e) => setWeightUnit(e.target.value)}
                      >
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                        <option value="lb">lb</option>
                      </select>
                    </div>
                  </div>

                  {/* Power Source start */}
                  <div className="col-lg-6 col-xl-6">
                    <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label htmlFor="powerSelect">Power Source</label>
                      <select
                        id="powerSelect"
                        className="selectpicker form-select"
                        value={selectedPower}
                        onChange={handlePowerChange}
                        data-live-search="true"
                        data-width="100%"
                      >
                        <option value="">-- Select Power Source --</option>
                        {power.map((powerSource) => (
                          <option key={powerSource._id} value={powerSource._id}>
                            {powerSource.name || powerSource.title}
                          </option>
                        ))}
                      </select>
                      {error.selectedPower && (
                        <span className="text-danger">{error.selectedPower}</span>
                      )}
                    </div>
                  </div>

                  {/* Battery Capacity start */}
                  <div className="col-lg-6 mb-2">
                    <label htmlFor="batteryCapacity">Battery Capacity</label>
                    <div className="position-relative">
                      <input
                        type="number"
                        className="form-control pe-5"
                        placeholder="Enter Battery Capacity *"
                        value={batteryCapacity}
                        onChange={(e) => setBatteryCapacity(e.target.value)}
                      />
                      <select
                        className="form-select position-absolute end-0 border-0 bg-transparent"
                        style={{
                          width: "auto",
                          height: "auto",
                          top: "50%",
                          transform: "translateY(-50%)",
                          paddingRight: "30px",
                          paddingLeft: "8px",
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                        }}
                        value={batteryCapacityUnit}
                        onChange={(e) => setBatteryCapacityUnit(e.target.value)}
                      >
                        <option value="mAh">mAh</option>
                        <option value="Ah">Ah</option>
                        <option value="Wh">Wh</option>
                      </select>
                    </div>
                  </div>

                  {/* Battery Chargetime start */}
                  <div className="col-lg-6 mb-2">
                    <label htmlFor="chargingTime">Battery Charging Time</label>
                    <div className="position-relative">
                      <input
                        type="number"
                        className="form-control pe-5"
                        placeholder="Enter Robot Battery Charging Time"
                        value={chargingTime}
                        onChange={(e) => setChargingTime(e.target.value)}
                      />
                      <select
                        className="form-select position-absolute end-0 border-0 bg-transparent"
                        style={{
                          width: "auto",
                          height: "auto",
                          top: "50%",
                          transform: "translateY(-50%)",
                          paddingRight: "30px",
                          paddingLeft: "8px",
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                        }}
                        value={chargingTimeUnit}
                        onChange={(e) => setChargingTimeUnit(e.target.value)}
                      >
                        <option value="h">h</option>
                        <option value="min">min</option>
                      </select>
                    </div>
                  </div>

                  {/* Runtime start */}
                  <div className="col-lg-6 mb-2">
                    <label htmlFor="runtime">Runtime</label>
                    <div className="position-relative">
                      <input
                        type="number"
                        className="form-control pe-5"
                        placeholder="Enter Robot Runtime *"
                        value={runtime}
                        onChange={(e) => setRuntime(e.target.value)}
                      />
                      <select
                        className="form-select position-absolute end-0 border-0 bg-transparent"
                        style={{
                          width: "auto",
                          height: "auto",
                          top: "50%",
                          transform: "translateY(-50%)",
                          paddingRight: "30px",
                          paddingLeft: "8px",
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                        }}
                        value={runtimeUnit}
                        onChange={(e) => setRuntimeUnit(e.target.value)}
                      >
                        <option value="h">h</option>
                        <option value="min">min</option>
                      </select>
                    </div>
                  </div>

                  {/* Load Capacity start */}
                  <div className="col-lg-6 position-relative mb-2">
                    <label htmlFor="loadCapacity">Load Capacity</label>
                    <div className="position-relative">
                      <input
                        type="number"
                        className="form-control pe-5"
                        placeholder="Enter Load Capacity"
                        value={loadCapacity}
                        onChange={(e) => setLoadCapacity(e.target.value)}
                      />
                      <select
                        className="form-select position-absolute end-0 border-0 bg-transparent"
                        style={{
                          width: "auto",
                          height: "auto",
                          top: "50%",
                          transform: "translateY(-50%)",
                          paddingRight: "30px",
                          paddingLeft: "8px",
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                        }}
                        value={loadCapacityUnit}
                        onChange={(e) => setLoadCapacityUnit(e.target.value)}
                      >
                        <option value="kg">kg</option>
                        <option value="g">g</option>
                        <option value="lb">lb</option>
                        <option value="t">t</option>
                      </select>
                    </div>
                  </div>

                  {/* Speed start */}
                  <div className="col-lg-6 mb-2">
                    <label htmlFor="speed">Speed</label>
                    <div className="position-relative">
                      <input
                        type="number"
                        className="form-control pe-5"
                        placeholder="Enter Robot Speed *"
                        value={speed}
                        onChange={(e) => setSpeed(e.target.value)}
                      />
                      <select
                        className="form-select position-absolute end-0 border-0 bg-transparent"
                        style={{
                          width: "auto",
                          height: "auto",
                          top: "50%",
                          transform: "translateY(-50%)",
                          paddingRight: "30px",
                          paddingLeft: "8px",
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                        }}
                        value={speedUnit}
                        onChange={(e) => setSpeedUnit(e.target.value)}
                      >
                        <option value="m/s">m/s</option>
                        <option value="km/h">km/h</option>
                        <option value="mph">mph</option>
                      </select>
                    </div>
                  </div>

                  {/* Operating Temperature start */}
                  <div className="col-lg-6 mb-2">
                    <label>Operating Temperature</label>
                    <div className="d-flex gap-2">
                      <div className="position-relative flex-fill">
                        <input
                          type="number"
                          className="form-control pe-5"
                          placeholder="Min"
                          value={operatingTemperatureMin}
                          onChange={(e) => setOperatingTemperatureMin(e.target.value)}
                        />
                      </div>
                      <div className="position-relative flex-fill">
                        <input
                          type="number"
                          className="form-control pe-5"
                          placeholder="Max"
                          value={operatingTemperatureMax}
                          onChange={(e) => setOperatingTemperatureMax(e.target.value)}
                        />
                      </div>
                      <div className="position-relative" style={{ minWidth: "80px" }}>
                        <select
                          className="form-select border-0 bg-transparent"
                          style={{
                            height: "100%",
                            appearance: "none",
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                          }}
                          value={operatingTemperatureUnit}
                          onChange={(e) => setOperatingTemperatureUnit(e.target.value)}
                        >
                          <option value="°C">°C</option>
                          <option value="°F">°F</option>
                          <option value="K">K</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Accuracy start */}
                  <div className="col-lg-6 mb-2">
                    <label htmlFor="accuracy">Accuracy</label>
                    <div className="position-relative">
                      <input
                        type="number"
                        className="form-control pe-5"
                        placeholder="Enter Robot Accuracy *"
                        value={accuracy}
                        onChange={(e) => setAccuracy(e.target.value)}
                      />
                      <select
                        className="form-select position-absolute end-0 border-0 bg-transparent"
                        style={{
                          width: "auto",
                          height: "auto",
                          top: "50%",
                          transform: "translateY(-50%)",
                          paddingRight: "30px",
                          paddingLeft: "8px",
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                        }}
                        value={accuracyUnit}
                        onChange={(e) => setAccuracyUnit(e.target.value)}
                      >
                        <option value="mm">mm</option>
                        <option value="cm">cm</option>
                      </select>
                    </div>
                  </div>

                  {/* Range start */}
                  <div className="col-lg-6 mb-2">
                    <label htmlFor="range">Range</label>
                    <div className="position-relative">
                      <input
                        type="number"
                        className="form-control pe-5"
                        placeholder="Enter Robot Range"
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                      />
                      <select
                        className="form-select position-absolute end-0 border-0 bg-transparent"
                        style={{
                          width: "auto",
                          height: "auto",
                          top: "50%",
                          transform: "translateY(-50%)",
                          paddingRight: "30px",
                          paddingLeft: "8px",
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                        }}
                        value={rangeUnit}
                        onChange={(e) => setRangeUnit(e.target.value)}
                      >
                        <option value="m">m</option>
                        <option value="km">km</option>
                        <option value="mi">mi</option>
                      </select>
                    </div>
                  </div>

                  {/* Color start */}
                  <div className="col-lg-6 col-xl-6">
                    <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label htmlFor="colorSelect">Color</label>
                      <div className="position-relative">
                        <select
                          id="colorSelect"
                          className="selectpicker form-select color-select"
                          value="placeholder"
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value !== "placeholder" && !selectedColors.includes(value)) {
                              setSelectedColors([...selectedColors, value]);
                            }
                            e.target.blur();
                          }}
                          data-live-search="true"
                          data-width="100%"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            height: "45px",
                          }}
                        >
                          <option value="placeholder" disabled>
                            &nbsp;
                          </option>
                          {colors.map((color) => (
                            <option key={color._id} value={color._id}>
                              {color.name}
                            </option>
                          ))}
                        </select>

                        <div
                          className="form-control position-absolute top-0 start-0 h-100 w-100 d-flex align-items-center px-3 pe-5"
                          style={{
                            background: "transparent",
                            pointerEvents: "none",
                          }}
                        >
                          <div
                            className="d-flex align-items-center flex-nowrap"
                            style={{
                              gap: "0.25rem",
                              overflowX: "auto",
                              whiteSpace: "nowrap",
                              scrollbarWidth: "thin",
                              maxWidth: "100%",
                              pointerEvents: "auto",
                            }}
                            onMouseDown={(e) => e.stopPropagation()}
                          >
                            {selectedColors.length === 0 ? (
                              <span className="text-muted">-- Select Colors --</span>
                            ) : (
                              <>
                                {colors
                                  .filter((c) => selectedColors.includes(c._id))
                                  .map((c) => (
                                    <span
                                      key={c._id}
                                      className="badge bg-light text-dark border d-flex align-items-center"
                                      style={{ pointerEvents: "auto" }}
                                    >
                                      {c.name}
                                      <button
                                        type="button"
                                        className="btn-close btn-sm ms-1"
                                        aria-label="Remove"
                                        style={{ fontSize: "0.65rem" }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedColors(
                                            selectedColors.filter((id) => id !== c._id)
                                          );
                                        }}
                                      />
                                    </span>
                                  ))}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Material Select start */}
                  <div className="col-lg-6 col-xl-6">
                    <div className="my_profile_setting_input ui_kit_select_search form-group">
                      <label htmlFor="materialSelect">Material</label>
                      <div className="position-relative">
                        <select
                          id="materialSelect"
                          className="selectpicker form-select material-select"
                          value="placeholder"
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value !== "placeholder" && !selectedMaterials.includes(value)) {
                              setSelectedMaterials([...selectedMaterials, value]);
                            }
                            e.target.blur();
                          }}
                          data-live-search="true"
                          data-width="100%"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            height: "45px",
                          }}
                        >
                          <option value="placeholder" disabled>
                            &nbsp;
                          </option>
                          {materials.map((material) => (
                            <option key={material._id} value={material._id}>
                              {material.name || material.title}
                            </option>
                          ))}
                        </select>

                        <div
                          className="form-control position-absolute top-0 start-0 h-100 w-100 d-flex align-items-center px-3 pe-5"
                          style={{
                            background: "transparent",
                            pointerEvents: "none",
                          }}
                        >
                          <div
                            className="d-flex align-items-center flex-nowrap"
                            style={{
                              gap: "0.25rem",
                              overflowX: "auto",
                              whiteSpace: "nowrap",
                              scrollbarWidth: "thin",
                              maxWidth: "100%",
                              pointerEvents: "auto",
                            }}
                            onMouseDown={(e) => e.stopPropagation()}
                          >
                            {selectedMaterials.length === 0 ? (
                              <span className="text-muted">-- Select Materials --</span>
                            ) : (
                              <>
                                {materials
                                  .filter((m) => selectedMaterials.includes(m._id))
                                  .map((m) => (
                                    <span
                                      key={m._id}
                                      className="badge bg-light text-dark border d-flex align-items-center"
                                      style={{ pointerEvents: "auto" }}
                                    >
                                      {m.name || m.title}
                                      <button
                                        type="button"
                                        className="btn-close btn-sm ms-1"
                                        aria-label="Remove"
                                        style={{ fontSize: "0.65rem" }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedMaterials(
                                            selectedMaterials.filter((id) => id !== m._id)
                                          );
                                        }}
                                      />
                                    </span>
                                  ))}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Capabilities section */}
            <div className="row">
              <div className="col-lg-12">
                <h3 className="mb30">Capabilities</h3>
              </div>

              {/* Navigation Types start */}
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label htmlFor="navigationTypeSelect">Navigation Type</label>
                  <div className="position-relative">
                    <select
                      id="navigationTypeSelect"
                      className="selectpicker form-select navigation-select"
                      value="placeholder"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value !== "placeholder" && !selectedNavigationType.includes(value)) {
                          setSelectedNavigationType([...selectedNavigationType, value]);
                        }
                        e.target.blur();
                      }}
                      data-live-search="true"
                      data-width="100%"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "45px",
                      }}
                    >
                      <option value="placeholder" disabled>
                        &nbsp;
                      </option>
                      {navigationType.map((navType) => (
                        <option key={navType._id} value={navType._id}>
                          {navType.name || navType.title}
                        </option>
                      ))}
                    </select>

                    <div
                      className="form-control position-absolute top-0 start-0 h-100 w-100 d-flex align-items-center px-3 pe-5"
                      style={{
                        background: "transparent",
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        className="d-flex align-items-center flex-nowrap"
                        style={{
                          gap: "0.25rem",
                          overflowX: "auto",
                          whiteSpace: "nowrap",
                          scrollbarWidth: "thin",
                          maxWidth: "100%",
                          pointerEvents: "auto",
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        {selectedNavigationType.length === 0 ? (
                          <span className="text-muted">-- Select Navigation Types --</span>
                        ) : (
                          <>
                            {navigationType
                              .filter((n) => selectedNavigationType.includes(n._id))
                              .map((n) => (
                                <span
                                  key={n._id}
                                  className="badge bg-light text-dark border d-flex align-items-center"
                                  style={{ pointerEvents: "auto" }}
                                >
                                  {n.name || n.title}
                                  <button
                                    type="button"
                                    className="btn-close btn-sm ms-1"
                                    aria-label="Remove"
                                    style={{ fontSize: "0.65rem" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedNavigationType(
                                        selectedNavigationType.filter((id) => id !== n._id)
                                      );
                                    }}
                                  />
                                </span>
                              ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {error.navigationTypes && (
                    <span className="text-danger">{error.navigationTypes}</span>
                  )}
                </div>
              </div>

              {/* Sensors start */}
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label htmlFor="sensorSelect">Sensors</label>
                  <div className="position-relative">
                    <select
                      id="sensorSelect"
                      className="selectpicker form-select sensor-select"
                      value="placeholder"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value !== "placeholder" && !selectedSensor.includes(value)) {
                          setSelectedSensor([...selectedSensor, value]);
                        }
                        e.target.blur();
                      }}
                      data-live-search="true"
                      data-width="100%"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "45px",
                      }}
                    >
                      <option value="placeholder" disabled>
                        &nbsp;
                      </option>
                      {sensors.map((sensor) => (
                        <option key={sensor._id} value={sensor._id}>
                          {sensor.name || sensor.title}
                        </option>
                      ))}
                    </select>

                    <div
                      className="form-control position-absolute top-0 start-0 h-100 w-100 d-flex align-items-center px-3 pe-5"
                      style={{
                        background: "transparent",
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        className="d-flex align-items-center flex-nowrap"
                        style={{
                          gap: "0.25rem",
                          overflowX: "auto",
                          whiteSpace: "nowrap",
                          scrollbarWidth: "thin",
                          maxWidth: "100%",
                          pointerEvents: "auto",
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        {selectedSensor.length === 0 ? (
                          <span className="text-muted">-- Select Sensors --</span>
                        ) : (
                          <>
                            {sensors
                              .filter((s) => selectedSensor.includes(s._id))
                              .map((s) => (
                                <span
                                  key={s._id}
                                  className="badge bg-light text-dark border d-flex align-items-center"
                                  style={{ pointerEvents: "auto" }}
                                >
                                  {s.name || s.title}
                                  <button
                                    type="button"
                                    className="btn-close btn-sm ms-1"
                                    aria-label="Remove"
                                    style={{ fontSize: "0.65rem" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedSensor(
                                        selectedSensor.filter((id) => id !== s._id)
                                      );
                                    }}
                                  />
                                </span>
                              ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {error.sensors && (
                    <span className="text-danger">{error.sensors}</span>
                  )}
                </div>
              </div>

              {/* AI Software Features start */}
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label htmlFor="aiSoftwareSelect">AI Software Features</label>
                  <div className="position-relative">
                    <select
                      id="aiSoftwareSelect"
                      className="selectpicker form-select ai-select"
                      value="placeholder"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value !== "placeholder" && !selectedAISoftwareFeature.includes(value)) {
                          setSelectedAISoftwareFeature([...selectedAISoftwareFeature, value]);
                        }
                        e.target.blur();
                      }}
                      data-live-search="true"
                      data-width="100%"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "45px",
                      }}
                    >
                      <option value="placeholder" disabled>
                        &nbsp;
                      </option>
                      {aiSoftwareFeatures.map((aiFeature) => (
                        <option key={aiFeature._id} value={aiFeature._id}>
                          {aiFeature.name || aiFeature.title}
                        </option>
                      ))}
                    </select>

                    <div
                      className="form-control position-absolute top-0 start-0 h-100 w-100 d-flex align-items-center px-3 pe-5"
                      style={{
                        background: "transparent",
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        className="d-flex align-items-center flex-nowrap"
                        style={{
                          gap: "0.25rem",
                          overflowX: "auto",
                          whiteSpace: "nowrap",
                          scrollbarWidth: "thin",
                          maxWidth: "100%",
                          pointerEvents: "auto",
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        {selectedAISoftwareFeature.length === 0 ? (
                          <span className="text-muted">-- Select AI Features --</span>
                        ) : (
                          <>
                            {aiSoftwareFeatures
                              .filter((a) => selectedAISoftwareFeature.includes(a._id))
                              .map((a) => (
                                <span
                                  key={a._id}
                                  className="badge bg-light text-dark border d-flex align-items-center"
                                  style={{ pointerEvents: "auto" }}
                                >
                                  {a.name || a.title}
                                  <button
                                    type="button"
                                    className="btn-close btn-sm ms-1"
                                    aria-label="Remove"
                                    style={{ fontSize: "0.65rem" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedAISoftwareFeature(
                                        selectedAISoftwareFeature.filter((id) => id !== a._id)
                                      );
                                    }}
                                  />
                                </span>
                              ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {error.aiSoftwareFeatures && (
                    <span className="text-danger">{error.aiSoftwareFeatures}</span>
                  )}
                </div>
              </div>

              {/* Primary Function start */}
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label htmlFor="primaryFunctionSelect">Primary Function</label>
                  <select
                    id="primaryFunctionSelect"
                    className="selectpicker form-select"
                    value={selectedPrimaryFunction}
                    onChange={handlePrimaryFunctionChange}
                    data-live-search="true"
                    data-width="100%"
                  >
                    <option value="">-- Select Primary Function --</option>
                    {primaryFunction.map((func) => (
                      <option key={func._id} value={func._id}>
                        {func.name || func.title}
                      </option>
                    ))}
                  </select>
                  {error.selectedPrimaryFunction && (
                    <span className="text-danger">{error.selectedPrimaryFunction}</span>
                  )}
                </div>
              </div>

              {/* Operating Environment start */}
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label htmlFor="operatingEnvironmentSelect">Operating Environment</label>
                  <select
                    id="operatingEnvironmentSelect"
                    className="selectpicker form-select"
                    value={selectedOperatingEnvironment}
                    onChange={handleOperatingEnvironmentChange}
                    data-live-search="true"
                    data-width="100%"
                  >
                    <option value="">-- Select Operating Environment --</option>
                    {operatingEnvironment.map((env) => (
                      <option key={env._id} value={env._id}>
                        {env.name || env.title}
                      </option>
                    ))}
                  </select>
                  {error.selectedOperatingEnvironment && (
                    <span className="text-danger">{error.selectedOperatingEnvironment}</span>
                  )}
                </div>
              </div>

              {/* Autonomy Level start */}
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label htmlFor="autonomyLevelSelect">Autonomy Level</label>
                  <select
                    id="autonomyLevelSelect"
                    className="selectpicker form-select"
                    value={selectedAutonomyLevel}
                    onChange={handleAutonomyLevelChange}
                    data-live-search="true"
                    data-width="100%"
                  >
                    <option value="">-- Select Autonomy Level --</option>
                    {autonomyLevel.map((level) => (
                      <option key={level._id} value={level._id}>
                        {level.name || level.title}
                      </option>
                    ))}
                  </select>
                  {error.selectedAutonomyLevel && (
                    <span className="text-danger">{error.selectedAutonomyLevel}</span>
                  )}
                </div>
              </div>

              {/* Terrain Capability start */}
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label htmlFor="terrainCapabilitySelect">Terrain Capability</label>
                  <div className="position-relative">
                    <select
                      id="terrainCapabilitySelect"
                      className="selectpicker form-select terrain-select"
                      value="placeholder"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value !== "placeholder" && !selectedTerrainCapability.includes(value)) {
                          setSelectedTerrainCapability([...selectedTerrainCapability, value]);
                        }
                        e.target.blur();
                      }}
                      data-live-search="true"
                      data-width="100%"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "45px",
                      }}
                    >
                      <option value="placeholder" disabled>
                        &nbsp;
                      </option>
                      {terrainCapabilities.map((terrain) => (
                        <option key={terrain._id} value={terrain._id}>
                          {terrain.name || terrain.title}
                        </option>
                      ))}
                    </select>

                    <div
                      className="form-control position-absolute top-0 start-0 h-100 w-100 d-flex align-items-center px-3 pe-5"
                      style={{
                        background: "transparent",
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        className="d-flex align-items-center flex-nowrap"
                        style={{
                          gap: "0.25rem",
                          overflowX: "auto",
                          whiteSpace: "nowrap",
                          scrollbarWidth: "thin",
                          maxWidth: "100%",
                          pointerEvents: "auto",
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        {selectedTerrainCapability.length === 0 ? (
                          <span className="text-muted">-- Select Terrain Capabilities --</span>
                        ) : (
                          <>
                            {terrainCapabilities
                              .filter((t) => selectedTerrainCapability.includes(t._id))
                              .map((t) => (
                                <span
                                  key={t._id}
                                  className="badge bg-light text-dark border d-flex align-items-center"
                                  style={{ pointerEvents: "auto" }}
                                >
                                  {t.name || t.title}
                                  <button
                                    type="button"
                                    className="btn-close btn-sm ms-1"
                                    aria-label="Remove"
                                    style={{ fontSize: "0.65rem" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedTerrainCapability(
                                        selectedTerrainCapability.filter((id) => id !== t._id)
                                      );
                                    }}
                                  />
                                </span>
                              ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {error.terrainCapability && (
                    <span className="text-danger">{error.terrainCapability}</span>
                  )}
                </div>
              </div>

              {/* Communication Method start */}
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label htmlFor="communicationMethodSelect">Communication Method</label>
                  <div className="position-relative">
                    <select
                      id="communicationMethodSelect"
                      className="selectpicker form-select communication-select"
                      value="placeholder"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value !== "placeholder" && !selectedCommunicationMethod.includes(value)) {
                          setSelectedCommunicationMethod([...selectedCommunicationMethod, value]);
                        }
                        e.target.blur();
                      }}
                      data-live-search="true"
                      data-width="100%"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "45px",
                      }}
                    >
                      <option value="placeholder" disabled>
                        &nbsp;
                      </option>
                      {communicationMethods.map((method) => (
                        <option key={method._id} value={method._id}>
                          {method.name || method.title}
                        </option>
                      ))}
                    </select>

                    <div
                      className="form-control position-absolute top-0 start-0 h-100 w-100 d-flex align-items-center px-3 pe-5"
                      style={{
                        background: "transparent",
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        className="d-flex align-items-center flex-nowrap"
                        style={{
                          gap: "0.25rem",
                          overflowX: "auto",
                          whiteSpace: "nowrap",
                          scrollbarWidth: "thin",
                          maxWidth: "100%",
                          pointerEvents: "auto",
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        {selectedCommunicationMethod.length === 0 ? (
                          <span className="text-muted">-- Select Communication Methods --</span>
                        ) : (
                          <>
                            {communicationMethods
                              .filter((c) => selectedCommunicationMethod.includes(c._id))
                              .map((c) => (
                                <span
                                  key={c._id}
                                  className="badge bg-light text-dark border d-flex align-items-center"
                                  style={{ pointerEvents: "auto" }}
                                >
                                  {c.name || c.title}
                                  <button
                                    type="button"
                                    className="btn-close btn-sm ms-1"
                                    aria-label="Remove"
                                    style={{ fontSize: "0.65rem" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedCommunicationMethod(
                                        selectedCommunicationMethod.filter((id) => id !== c._id)
                                      );
                                    }}
                                  />
                                </span>
                              ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {error.communicationMethod && (
                    <span className="text-danger">{error.communicationMethod}</span>
                  )}
                </div>
              </div>

              {/* Payload Type start */}
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label htmlFor="payloadTypeSelect">Payload Type</label>
                  <div className="position-relative">
                    <select
                      id="payloadTypeSelect"
                      className="selectpicker form-select payload-select"
                      value="placeholder"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value !== "placeholder" && !selectedPayloadType.includes(value)) {
                          setSelectedPayloadType([...selectedPayloadType, value]);
                        }
                        e.target.blur();
                      }}
                      data-live-search="true"
                      data-width="100%"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "45px",
                      }}
                    >
                      <option value="placeholder" disabled>
                        &nbsp;
                      </option>
                      {payloadTypes.map((payload) => (
                        <option key={payload._id} value={payload._id}>
                          {payload.name || payload.title}
                        </option>
                      ))}
                    </select>

                    <div
                      className="form-control position-absolute top-0 start-0 h-100 w-100 d-flex align-items-center px-3 pe-5"
                      style={{
                        background: "transparent",
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        className="d-flex align-items-center flex-nowrap"
                        style={{
                          gap: "0.25rem",
                          overflowX: "auto",
                          whiteSpace: "nowrap",
                          scrollbarWidth: "thin",
                          maxWidth: "100%",
                          pointerEvents: "auto",
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        {selectedPayloadType.length === 0 ? (
                          <span className="text-muted">-- Select Payload Types --</span>
                        ) : (
                          <>
                            {payloadTypes
                              .filter((p) => selectedPayloadType.includes(p._id))
                              .map((p) => (
                                <span
                                  key={p._id}
                                  className="badge bg-light text-dark border d-flex align-items-center"
                                  style={{ pointerEvents: "auto" }}
                                >
                                  {p.name || p.title}
                                  <button
                                    type="button"
                                    className="btn-close btn-sm ms-1"
                                    aria-label="Remove"
                                    style={{ fontSize: "0.65rem" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedPayloadType(
                                        selectedPayloadType.filter((id) => id !== p._id)
                                      );
                                    }}
                                  />
                                </span>
                              ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {error.payloadType && (
                    <span className="text-danger">{error.payloadType}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video embed code start */}
        <div className="col-lg-12">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="videoEmbedCode">Video Embed Code</label>
            <textarea
              id="videoEmbedCode"
              className="form-control"
              rows="4"
              value={videoembedcode}
              onChange={(e) => setVideoEmbedCode(e.target.value)}
              placeholder="Enter video embed code"
            ></textarea>
            {error.videoembedcode && (
              <span className="text-danger">{error.videoembedcode}</span>
            )}
          </div>
        </div>

        {/* Meta title start */}
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="metaTitle">Meta Title</label>
            <input
              type="text"
              className="form-control"
              id="metaTitle"
              value={metatitle}
              onChange={(e) => setMetatitle(e.target.value)}
              placeholder="Enter meta title"
            />
          </div>
        </div>

        {/* Meta description start */}
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="metaDescription">Meta Description</label>
            <textarea
              id="metaDescription"
              className="form-control"
              rows="3"
              value={metadescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Enter meta description"
            ></textarea>
          </div>
        </div>

        {/* Featured image start */}
        <div className="col-lg-12">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="featuredImage">Featured Image</label>
            <input
              type="file"
              className="form-control"
              id="featuredImage"
              onChange={uploadFeaturedImage}
              accept="image/*"
            />
            {existingFeaturedImage && !featuredimage && (
              <div className="mt-2">
                <p>Current featured image:</p>
                <img
                  src={normalizeImagePath(existingFeaturedImage)}
                  alt="Featured"
                  style={{ 
                    width: '200px', 
                    height: '150px', 
                    objectFit: "cover", 
                    borderRadius: "8px",
                    border: '1px solid #ddd'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const container = e.target.parentElement;
                    if (container) {
                      container.innerHTML = `
                        <div style="text-align: center; color: #6c757d; padding: 20px; border: 1px solid #ddd; border-radius: 8px; width: 200px; height: 150px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                          <i class="fas fa-image" style="font-size: 24px; margin-bottom: 8px;"></i>
                          <div style="font-size: 12px;">Featured image not found</div>
                          <div style="font-size: 10px; color: #adb5bd; word-break: break-all;">${existingFeaturedImage}</div>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
            )}
            {featuredimage && (
              <div className="mt-2">
                <p>New featured image selected: {featuredimage.name}</p>
              </div>
            )}
          </div>
        </div>

        {/* Multiple images start */}
        <div className="col-lg-12">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="robotImages">Robot Images</label>
            <input
              type="file"
              className="form-control"
              id="robotImages"
              onChange={multipleImage}
              multiple
              accept="image/*"
            />
            
            {/* Display existing images */}
            {existingImages.length > 0 && (
              <div className="mt-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <h6 className="mb-0">Existing Images:</h6>
                    <small className="text-muted">Images showing "Image not found" are missing from the server</small>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to remove all existing images? This will delete them from the database.")) {
                        setExistingImages([]);
                      }
                    }}
                  >
                    <i className="fas fa-trash me-1"></i>Clear All
                  </button>
                </div>
                <div className="row">
                  {existingImages.map((img, index) => {
                    const imagePath = normalizeImagePath(img);
                    return (
                    <div key={index} className="col-md-3 mb-3">
                      <div className="position-relative">
                        <div className="image-container" style={{ width: '200px', height: '150px', border: '1px solid #ddd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
                          <img
                            src={imagePath}
                            alt={`Existing ${index}`}
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: "cover", 
                              borderRadius: "8px",
                              display: 'block'
                            }}
                            onError={(e) => {
                              // Replace with placeholder content
                              e.target.style.display = 'none';
                              const container = e.target.parentElement;
                              if (container) {
                                container.innerHTML = `
                                  <div style="text-align: center; color: #6c757d; padding: 20px; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                                    <i class="fas fa-image" style="font-size: 24px; margin-bottom: 8px;"></i>
                                    <div style="font-size: 12px;">Image not found</div>
                                    <div style="font-size: 10px; color: #adb5bd; word-break: break-all;">${img}</div>
                                  </div>
                                `;
                              }
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                          onClick={() => deleteExistingImage(index)}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Display new selected images */}
            {robotSelectedImgs.length > 0 && (
              <div className="mt-3">
                <h6>New Images Selected:</h6>
                <div className="row">
                  {robotSelectedImgs.map((file, index) => (
                    <div key={index} className="col-md-3 mb-3">
                      <div className="position-relative">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          width={200}
                          height={150}
                          style={{ objectFit: "cover", borderRadius: "8px" }}
                          className="w-100"
                        />
                        <button
                          type="button"
                          className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                          onClick={() => deleteImage(file.name)}
                        >
                          ×
                        </button>
                        <p className="mt-1 text-sm text-truncate">{file.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit button start */}
        <div className="col-lg-12">
          <div className="my_profile_setting_input">
            {error.general && (
              <div className="alert alert-danger" role="alert">
                {error.general}
              </div>
            )}
            <button
              className="btn btn1 float-start"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {isEditMode ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                isEditMode ? 'Update Robot' : 'Create Robot'
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditList;