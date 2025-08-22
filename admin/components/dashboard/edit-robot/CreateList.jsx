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

  const [featuredimage, setFeaturedImage] = useState(null);
  const [existingFeaturedImage, setExistingFeaturedImage] = useState("");
  const [robotSelectedImgs, setRobotSelectedImgs] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const normalizeImagePath = (path) => {
  if (!path) return "";
  return path.startsWith("http")
    ? path
    : "/" + path.replace(/^public\//, "");
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
          setVideoEmbedCode(robotData.videoembedcode || "");
          setExistingFeaturedImage(robotData.featuredimage || "");
          setExistingImages(robotData.images || []);
          
          // Meta information
          setMetatitle(robotData.metatitle || "");
          setMetaDescription(robotData.metadescription || "");
          
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

  // Auto-generate slug from title - Updated logic
  useEffect(() => {
    if (!isEditMode && title) {
      // Only auto-generate in create mode
      const generatedSlug = generateSlug(title);
      setSlug(generatedSlug);
    }
  }, [title, isEditMode]);

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

    // Ensure slug is generated if empty
    let finalSlug = slug?.trim();
    if (!finalSlug && title?.trim()) {
      finalSlug = generateSlug(title);
      setSlug(finalSlug);
    }

    // Validation list
    const requiredFields = [
      { key: "title", value: title, name: "Title" },
      { key: "slug", value: finalSlug, name: "Slug" },
      { key: "description", value: description, name: "Description" },
      { key: "price", value: price, name: "Total Price" },
      { key: "countryid", value: selectedCountry, name: "Country of Origin" },
      { key: "categoryid", value: selectedCategory, name: "Category" },
      { key: "subcategoryid", value: selectedSubCategory, name: "Sub Category" },
      { key: "manufacturerid", value: selectedManufacturer, name: "Manufacturer" },
      { key: "launchYear", value: launchYear, name: "Launch Year" },
      { key: "length", value: length, name: "Length" },
      { key: "width", value: width, name: "Width" },
      { key: "height", value: height, name: "Height" },
      { key: "weight", value: weight, name: "Weight" },
      { key: "batteryCapacity", value: batteryCapacity, name: "Battery Capacity" },
      { key: "runtime", value: runtime, name: "Runtime" },
      { key: "speed", value: speed, name: "Speed" },
      { key: "accuracy", value: accuracy, name: "Accuracy" },
      { key: "selectedPower", value: selectedPower, name: "Power Source" },
      { key: "videoembedcode", value: videoembedcode, name: "Video Embed Code" },
      { key: "selectedPrimaryFunction", value: selectedPrimaryFunction, name: "Primary Function" },
      { key: "selectedOperatingEnvironment", value: selectedOperatingEnvironment, name: "Operating Environment" },
      { key: "selectedAutonomyLevel", value: selectedAutonomyLevel, name: "Autonomy Level" },
      { key: "colors", value: selectedColors.length > 0 ? selectedColors : null, name: "Colors" },
      { key: "materials", value: selectedMaterials.length > 0 ? selectedMaterials : null, name: "Materials" },
      { key: "navigationTypes", value: selectedNavigationType.length > 0 ? selectedNavigationType : null, name: "Navigation Types" },
      { key: "sensors", value: selectedSensor.length > 0 ? selectedSensor : null, name: "Sensors" },
      { key: "aiSoftwareFeatures", value: selectedAISoftwareFeature.length > 0 ? selectedAISoftwareFeature : null, name: "AI Software Features" },
      { key: "terrainCapability", value: selectedTerrainCapability.length > 0 ? selectedTerrainCapability : null, name: "Terrain Capability" },
      { key: "communicationMethod", value: selectedCommunicationMethod.length > 0 ? selectedCommunicationMethod : null, name: "Communication Method" },
      { key: "payloadType", value: selectedPayloadType.length > 0 ? selectedPayloadType : null, name: "Payload Type" },
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
      formData.append("totalPrice", price?.toString() || "");
      formData.append("countryOfOrigin", selectedCountry || "");
      formData.append("category", selectedCategory || "");
      formData.append("subcategoryid", selectedSubCategory || "");
      formData.append("manufacturer", selectedManufacturer || "");
      formData.append("launchYear", launchYear?.toString() || "");
      if (version) formData.append("version", version);
      formData.append("powerSource", selectedPower || "");
      formData.append("videoembedcode", videoembedcode?.trim() || "");
      formData.append("primaryFunction", selectedPrimaryFunction || "");
      formData.append("operatingEnvironment", selectedOperatingEnvironment || "");
      formData.append("autonomyLevel", selectedAutonomyLevel || "");
      if (metatitle) formData.append("metatitle", metatitle);
      if (metadescription) formData.append("metadescription", metadescription);

      // Featured image
      if (featuredimage) {
        formData.append("featuredimage", featuredimage);
      }

      // Append multi-selects
      selectedColors.forEach((color) => formData.append("color[]", color));
      selectedMaterials.forEach((material) => formData.append("material[]", material));
      selectedNavigationType.forEach((nav) => formData.append("navigationType[]", nav));
      selectedSensor.forEach((s) => formData.append("sensors[]", s));
      selectedAISoftwareFeature.forEach((a) => formData.append("aiSoftwareFeatures[]", a));
      selectedTerrainCapability.forEach((t) => formData.append("terrainCapability[]", t));
      selectedCommunicationMethod.forEach((c) => formData.append("communicationMethod[]", c));
      selectedPayloadType.forEach((p) => formData.append("payloadTypesSupported[]", p));

      // Append nested unit/value fields
      if (length) formData.append("dimensions.length.value", String(length));
      if (lengthUnit) formData.append("dimensions.length.unit", String(lengthUnit));
      if (width) formData.append("dimensions.width.value", String(width));
      if (widthUnit) formData.append("dimensions.width.unit", String(widthUnit));
      if (height) formData.append("dimensions.height.value", String(height));
      if (heightUnit) formData.append("dimensions.height.unit", String(heightUnit));

      if (weight) formData.append("weight.value", String(weight));
      if (weightUnit) formData.append("weight.unit", String(weightUnit));

      if (batteryCapacity) formData.append("batteryCapacity.value", String(batteryCapacity));
      if (batteryCapacityUnit) formData.append("batteryCapacity.unit", String(batteryCapacityUnit));

      if (loadCapacity) formData.append("loadCapacity.value", String(loadCapacity));
      if (loadCapacityUnit) formData.append("loadCapacity.unit", String(loadCapacityUnit));

      if (runtime) formData.append("runtime.value", String(runtime));
      if (runtimeUnit) formData.append("runtime.unit", String(runtimeUnit));

      if (speed) formData.append("speed.value", String(speed));
      if (speedUnit) formData.append("speed.unit", String(speedUnit));

      if (accuracy) formData.append("accuracy.value", String(accuracy));
      if (accuracyUnit) formData.append("accuracy.unit", String(accuracyUnit));

      if (range) formData.append("range.value", String(range));
      if (rangeUnit) formData.append("range.unit", String(rangeUnit));

      if (operatingTemperatureMin) formData.append("operatingTemperature.min", String(operatingTemperatureMin));
      if (operatingTemperatureMax) formData.append("operatingTemperature.max", String(operatingTemperatureMax));
      if (operatingTemperatureUnit) formData.append("operatingTemperature.unit", String(operatingTemperatureUnit));

      if (chargingTime) {
        formData.append("chargingTime.value", String(chargingTime));
        formData.append("chargingTime.unit", String(chargingTimeUnit));
      }

      // Append new images
      robotSelectedImgs.forEach((file) => {
        formData.append("images", file);
      });

      // In edit mode, append existing images that should be kept
      if (isEditMode) {
        existingImages.forEach((img, index) => {
          formData.append(`existingImages[${index}]`, img);
        });
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
            <label htmlFor="roboTitle">Robot Title</label>
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
            <label htmlFor="roboSlug">Robot Slug</label>
            <input
              type="text"
              className="form-control"
              id="roboSlug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Auto-generated slug"
            />
            {error.slug && <span className="text-danger">{error.slug}</span>}
          </div>
        </div>

        {/* Robot description start */}
        <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="roboDescription">Description</label>
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
            <label htmlFor="countrySelect">Country of Origin</label>
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
            <label htmlFor="launchYear">Launch Year</label>
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
                      placeholder="Enter Robot Length"
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
                      placeholder="Enter Robot Width"
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
                      placeholder="Enter Robot Height"
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
                        placeholder="Enter Robot Weight"
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
                        placeholder="Enter Battery Capacity"
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
                        placeholder="Enter Robot Runtime"
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
                        placeholder="Enter Robot Speed"
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
                        placeholder="Enter Robot Accuracy"
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
        {/* <div className="col-lg-12">
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
                <Image
                  src={normalizeImagePath(existingFeaturedImage)}
                  alt="Featured"
                  width={200}
                  height={150}
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                />
              </div>
            )}
            {featuredimage && (
              <div className="mt-2">
                <p>New featured image selected: {featuredimage.name}</p>
              </div>
            )}
          </div>
        </div> */}

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
            {/* {existingImages.length > 0 && (
              <div className="mt-3">
                <h6>Existing Images:</h6>
                <div className="row">
                  {existingImages.map((img, index) => (
                    <div key={index} className="col-md-3 mb-3">
                      <div className="position-relative">
                        <Image
                          src={normalizeImagePath(img)}
                          alt={`Existing ${index}`}
                          width={200}
                          height={150}
                          style={{ objectFit: "cover", borderRadius: "8px" }}
                          className="w-100"
                        />
                        <button
                          type="button"
                          className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                          onClick={() => deleteExistingImage(index)}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

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