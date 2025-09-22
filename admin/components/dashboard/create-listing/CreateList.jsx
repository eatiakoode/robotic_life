"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getManufacturerTableData } from "../../../api/manufacturer";
import { addRobotAPI as createRobot } from "../../../api/robot";
// import { getSellerTableData } from "@/api/seller";
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
import { getStateByCountryTableData } from "../../../api/state";

import selectedFiles from "../../../utils/selectedFiles";
import Image from "next/image";
import { toast } from "react-toastify";

const CreateList = () => {
  const router = useRouter();

  // --- State Hooks ---

  // --- Basic Information ---
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [version, setVersion] = useState("");
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [launchYear, setLaunchYear] = useState("");
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

  const [power, setPower] = useState([]);
  const [selectedPower, setSelectedPower] = useState("");

  const [noiseLevel, setNoiseLevel] = useState("");
  const [noiseLevelUnit, setNoiseLevelUnit] = useState("dB");
  const [energyConsumption, setEnergyConsumption] = useState("");
  const [energyConsumptionUnit, setEnergyConsumptionUnit] = useState("Wh");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("g");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [length, setLength] = useState("");
  const [lengthUnit, setLengthUnit] = useState("cm");
  const [width, setWidth] = useState("");
  const [widthUnit, setWidthUnit] = useState("cm");
  const [wingspan, setWingspan] = useState("");
  const [wingspanUnit, setWingspanUnit] = useState("cm");
  const [reach, setReach] = useState("");
  const [reachUnit, setReachUnit] = useState("cm");
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
  const [articulationPrecisionUnit, setArticulationPrecisionUnit] =
    useState("°");
  const [communicationRange, setCommunicationRange] = useState("");
  const [communicationRangeUnit, setCommunicationRangeUnit] = useState("m");
  const [hotSwappable, setHotSwappable] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

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
  const [operatingTemperatureUnit, setOperatingTemperatureUnit] =
    useState("°C");
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
  const [selectedAISoftwareFeature, setSelectedAISoftwareFeature] = useState(
    []
  );
  const [aiSoftwareFeatures, setAISoftwareFeatures] = useState([]);
  const [primaryFunctions, setPrimaryFunctions] = useState([]);
  const [primaryFunction, setPrimaryFunction] = useState([]);
  const [selectedPrimaryFunction, setSelectedPrimaryFunction] = useState("");
  const [operatingEnvironment, setOperatingEnvironment] = useState([]);
  const [selectedOperatingEnvironment, setSelectedOperatingEnvironment] =
    useState("");
  const [terrainCapabilities, setTerrainCapabilities] = useState([]);
  const [selectedTerrainCapability, setSelectedTerrainCapability] = useState(
    []
  );
  const [communicationMethods, setCommunicationMethods] = useState([]);
  const [selectedCommunicationMethod, setSelectedCommunicationMethod] =
    useState([]);
  const [autonomyLevel, setAutonomyLevel] = useState([]);
  const [selectedAutonomyLevel, setSelectedAutonomyLevel] = useState("");
  const [payloadTypes, setPayloadTypes] = useState([]);
  const [selectedPayloadType, setSelectedPayloadType] = useState([]);
  const [maxPayloadWeight, setMaxPayloadWeight] = useState("");
  const [maxPayloadWeightUnit, setMaxPayloadWeightUnit] = useState("kg");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [videoembedcode, setVideoEmbedCode] = useState("");
  const [nearby, setNearBy] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [metatitle, setMetatitle] = useState("");
  const [metadescription, setMetaDescription] = useState("");
  const [status, setStatus] = useState(true); // true = Active, false = Inactive
  const [featuredimage, setFeaturedImage] = useState(null);
  const [robotSelectedImgs, setRobotSelectedImgs] = useState([]);

  // upload profile
  const uploadFeaturedImage = (e) => {
    setFeaturedImage(e.target.files[0]);
  };

  // multiple image select
  const multipleImage = (e) => {
    // checking is same file matched with old stored array
    const isExist = robotSelectedImgs?.some((file1) =>
      selectedFiles(e)?.some((file2) => file1.name === file2.name)
    );

    if (!isExist) {
      setRobotSelectedImgs((old) => [...old, ...selectedFiles(e)]);
    } else {
      alert("You have selected one image already!");
    }
  };

  // delete image
  const deleteImage = (name) => {
    const deleted = robotSelectedImgs?.filter((file) => file.name !== name);
    setRobotSelectedImgs(deleted);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filter = {
          limit: 1000,
          page: 1,
        };

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
        setMaterials(
          Array.isArray(materialRes) ? materialRes : materialRes?.data || []
        );
        setNavigationType(
          Array.isArray(navTypeRes) ? navTypeRes : navTypeRes?.data || []
        );
        setSensors(
          Array.isArray(sensorRes) ? sensorRes : sensorRes?.data || []
        );
        setAISoftwareFeatures(Array.isArray(aiRes) ? aiRes : aiRes?.data || []);
        setPrimaryFunction(
          Array.isArray(primaryFuncRes)
            ? primaryFuncRes
            : primaryFuncRes?.data || []
        );
        setOperatingEnvironment(
          Array.isArray(opEnvRes) ? opEnvRes : opEnvRes?.data || []
        );
        setAutonomyLevel(
          Array.isArray(autonomyRes) ? autonomyRes : autonomyRes?.data || []
        );
        setPayloadTypes(
          Array.isArray(payloadRes) ? payloadRes : payloadRes?.data || []
        );
        setTerrainCapabilities(
          Array.isArray(terrainRes) ? terrainRes : terrainRes?.data || []
        );
        setCommunicationMethods(
          Array.isArray(commMethodRes)
            ? commMethodRes
            : commMethodRes?.data || []
        );
      } catch (err) {
        console.error("Error loading initial data:", err);
        toast.error("Failed to load form data. Please refresh the page.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      setSlug(generatedSlug);
    } else {
      setSlug("");
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
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedColors(values);
  };

  const handleNavigationTypeChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedNavigationType(values);
  };

  const handleSensorChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedSensor(values);
  };

  const handleAISoftwareFeatureChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedAISoftwareFeature(values);
  };

  const handleTerrainCapabilityChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedTerrainCapability(values);
  };

  const handleCommunicationMethodChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedCommunicationMethod(values);
  };

  const handlePayloadTypeChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedPayloadType(values);
  };

  const handleMaterialChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedMaterials(values);
  };

  // --- Submit ---
  const addRobo = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      console.log("Already submitting, please wait...");
      return;
    }

    console.log("Starting form submission...");
    setIsSubmitting(true);
    setError({});

    const newErrors = {};

    // Updated validation - only essential fields are required
    const requiredFields = [
      { key: "title", value: title, name: "Title" },
      { key: "description", value: description, name: "Description" },
    ];

    // Check for empty required fields
    requiredFields.forEach((field) => {
      if (
        !field.value ||
        (typeof field.value === "string" && !field.value.trim())
      ) {
        newErrors[field.key] = `${field.name} is required`;
      }
    });


    // Validate slug only if it's provided and too short
    if (slug && slug !== "" && slug.length < 3) {
      newErrors.slug = "Slug must be at least 3 characters long";
    }

    // Only validate price if it's provided and not a valid positive number
    if (price && price !== "" && (isNaN(price) || price <= 0)) {
      newErrors.price = "Price must be a positive number";
    }

    // Only validate launch year if it's provided and not a valid year
    if (launchYear && launchYear !== "" && (isNaN(launchYear) || launchYear < 1900 || launchYear > new Date().getFullYear() + 5)) {
      newErrors.launchYear = "Launch year must be between 1900 and " + (new Date().getFullYear() + 5);
    }

    if (Object.keys(newErrors).length > 0) {
      console.log("Validation errors found:", newErrors);
      console.log("Error keys:", Object.keys(newErrors));
      setError(newErrors);
      setIsSubmitting(false);
      toast.error("Please check the form for errors");
      return;
    }

    console.log("No validation errors found, proceeding with submission...");
    console.log("Form state before submission:");
    console.log("title:", title);
    console.log("description:", description);
    console.log("selectedCountry:", selectedCountry);
    console.log("selectedCategory:", selectedCategory);
    console.log("selectedManufacturer:", selectedManufacturer);
    console.log("selectedPower:", selectedPower);
    console.log("selectedPrimaryFunction:", selectedPrimaryFunction);
    console.log("selectedOperatingEnvironment:", selectedOperatingEnvironment);
    console.log("selectedAutonomyLevel:", selectedAutonomyLevel);

    try {
      console.log("Getting user data from localStorage...");
      const userData = JSON.parse(localStorage.getItem("user"));
      const token = userData?.token;

      if (!token) {
        toast.error("User not authenticated. Please login again.");
        setIsSubmitting(false);
        return;
      }

      console.log("Creating FormData...");
      const formData = new FormData();

      // Append basic fields
      formData.append("title", title.trim());
      formData.append("slug", slug);
      formData.append("description", description.trim());
      formData.append("status", status ? "true" : "false");

      // Only append fields that have values to avoid ObjectId validation errors
      if (price && price !== "" && !isNaN(price)) formData.append("totalPrice", price);
      if (selectedCountry && selectedCountry !== "") formData.append("countryOfOrigin", selectedCountry);
      if ((selectedSubCategory && selectedSubCategory !== "") || (selectedCategory && selectedCategory !== "")) {
        const categoryToSave = selectedSubCategory || selectedCategory;
        formData.append("category", categoryToSave);
      }
      if (selectedSubCategory && selectedSubCategory !== "") formData.append("subcategoryid", selectedSubCategory);
      if (selectedManufacturer && selectedManufacturer !== "") formData.append("manufacturer", selectedManufacturer);
      if (launchYear && launchYear !== "" && !isNaN(launchYear)) formData.append("launchYear", launchYear);
      if (selectedPower && selectedPower !== "") formData.append("specifications.powerSource", selectedPower);
      if (videoembedcode && videoembedcode.trim() !== "") formData.append("videoEmbedCode", videoembedcode.trim());
      if (selectedPrimaryFunction && selectedPrimaryFunction !== "") formData.append("capabilities.primaryFunction", selectedPrimaryFunction);
      if (selectedOperatingEnvironment && selectedOperatingEnvironment !== "") formData.append("operationalEnvironmentAndApplications.operatingEnvironment", selectedOperatingEnvironment);
      if (selectedAutonomyLevel && selectedAutonomyLevel !== "") formData.append("capabilities.autonomyLevel", selectedAutonomyLevel);

      // Optional fields
      if (version && version.trim() !== "") formData.append("version", version.trim());
      if (metatitle && metatitle.trim() !== "") formData.append("metaTitle", metatitle.trim());
      if (metadescription && metadescription.trim() !== "")
        formData.append("metaDescription", metadescription.trim());

      // Handle array fields - always send as arrays, even if empty
      // Safely handle feature field
      const safeFeature = typeof feature === 'string' ? feature : (Array.isArray(feature) ? feature.join(", ") : "");
      if (safeFeature && safeFeature.trim() !== "") {
        formData.append("capabilities.features", safeFeature.trim());
      } else {
        formData.append("capabilities.features", "");
      }
      
      // Safely handle interoperability field
      const safeInteroperability = typeof interoperability === 'string' ? interoperability : (Array.isArray(interoperability) ? interoperability.join(", ") : "");
      if (safeInteroperability && safeInteroperability.trim() !== "") {
        formData.append("capabilities.interoperability", safeInteroperability.trim());
      } else {
        formData.append("capabilities.interoperability", "");
      }
      
      // Safely handle attachments field
      const safeAttachments = typeof attachments === 'string' ? attachments : (Array.isArray(attachments) ? attachments.join(", ") : "");
      if (safeAttachments && safeAttachments.trim() !== "") {
        formData.append("payloadsAndAttachments.attachments", safeAttachments.trim());
      } else {
        formData.append("payloadsAndAttachments.attachments", "");
      }
      
      // Safely handle accessoryPorts field
      const safeAccessoryPorts = typeof accessoryPorts === 'string' ? accessoryPorts : (Array.isArray(accessoryPorts) ? accessoryPorts.join(", ") : "");
      if (safeAccessoryPorts && safeAccessoryPorts.trim() !== "") {
        formData.append("payloadsAndAttachments.accessoryPorts", safeAccessoryPorts.trim());
      } else {
        formData.append("payloadsAndAttachments.accessoryPorts", "");
      }
      if (operatingSystem && operatingSystem.trim() !== "") formData.append("sensorsAndSoftware.operatingSystem", operatingSystem.trim());
      if (firmwareVersion && firmwareVersion.trim() !== "") formData.append("sensorsAndSoftware.firmwareVersion", firmwareVersion.trim());
      // Handle array fields - always send as arrays, even if empty
      // Safely handle securityFeatures field
      const safeSecurityFeatures = typeof securityFeatures === 'string' ? securityFeatures : (Array.isArray(securityFeatures) ? securityFeatures.join(", ") : "");
      if (safeSecurityFeatures && safeSecurityFeatures.trim() !== "") {
        formData.append("sensorsAndSoftware.securityFeatures", safeSecurityFeatures.trim());
      } else {
        formData.append("sensorsAndSoftware.securityFeatures", "");
      }
      
      // Safely handle applications field
      const safeApplications = typeof applications === 'string' ? applications : (Array.isArray(applications) ? applications.join(", ") : "");
      if (safeApplications && safeApplications.trim() !== "") {
        formData.append("operationalEnvironmentAndApplications.applications", safeApplications.trim());
      } else {
        formData.append("operationalEnvironmentAndApplications.applications", "");
      }
      
      // Safely handle enduranceExtremeConditions field
      const safeEnduranceExtremeConditions = typeof enduranceExtremeConditions === 'string' ? enduranceExtremeConditions : (Array.isArray(enduranceExtremeConditions) ? enduranceExtremeConditions.join(", ") : "");
      if (safeEnduranceExtremeConditions && safeEnduranceExtremeConditions.trim() !== "") {
        formData.append("operationalEnvironmentAndApplications.enduranceExtremeConditions", safeEnduranceExtremeConditions.trim());
      } else {
        formData.append("operationalEnvironmentAndApplications.enduranceExtremeConditions", "");
      }
      
      // Safely handle deploymentLogistics field
      const safeDeploymentLogistics = typeof deploymentLogistics === 'string' ? deploymentLogistics : (Array.isArray(deploymentLogistics) ? deploymentLogistics.join(", ") : "");
      if (safeDeploymentLogistics && safeDeploymentLogistics.trim() !== "") {
        formData.append("operationalEnvironmentAndApplications.deploymentLogistics", safeDeploymentLogistics.trim());
      } else {
        formData.append("operationalEnvironmentAndApplications.deploymentLogistics", "");
      }

      // Dimensions with validation
      if (length && length !== "" && !isNaN(length)) {
        formData.append("specifications.dimensions.length.value", String(length));
        formData.append("specifications.dimensions.length.unit", lengthUnit);
      }
      if (width && width !== "" && !isNaN(width)) {
        formData.append("specifications.dimensions.width.value", String(width));
        formData.append("specifications.dimensions.width.unit", widthUnit);
      }
      if (height && height !== "" && !isNaN(height)) {
        formData.append("specifications.dimensions.height.value", String(height));
        formData.append("specifications.dimensions.height.unit", heightUnit);
      }

      // Wingspan and Reach (dimensions)
      if (wingspan && wingspan !== "" && !isNaN(wingspan)) {
        formData.append("specifications.dimensions.wingspan.value", String(wingspan));
        formData.append("specifications.dimensions.wingspan.unit", wingspanUnit);
      }
      if (reach && reach !== "" && !isNaN(reach)) {
        formData.append("specifications.dimensions.reach.value", String(reach));
        formData.append("specifications.dimensions.reach.unit", reachUnit);
      }

      // Weight
      if (weight && weight !== "" && !isNaN(weight)) {
        formData.append("specifications.weight.value", String(weight));
        formData.append("specifications.weight.unit", weightUnit);
      }

      // noiseLevel
      if (noiseLevel && noiseLevel !== "" && !isNaN(noiseLevel)) {
        formData.append("specifications.noiseLevel.value", String(noiseLevel));
        formData.append("specifications.noiseLevel.unit", noiseLevelUnit);
      }

      // energyConsumption
      if (energyConsumption && energyConsumption !== "" && !isNaN(energyConsumption)) {
        formData.append("specifications.energyConsumption.value", String(energyConsumption));
        formData.append("specifications.energyConsumption.unit", energyConsumptionUnit);
      }

      // mtbf
      if (mtbf && mtbf !== "" && !isNaN(mtbf)) {
        formData.append("specifications.maintenanceInfo.mtbf.value", String(mtbf));
        formData.append("specifications.maintenanceInfo.mtbf.unit", mtbfUnit);
      }

      // maintenance Interval
      if (maintenanceInterval && maintenanceInterval !== "" && !isNaN(maintenanceInterval)) {
        formData.append(
          "specifications.maintenanceInfo.maintenanceInterval.value",
          String(maintenanceInterval)
        );
        formData.append("specifications.maintenanceInfo.maintenanceInterval.unit", maintenanceIntervalUnit);
      }

      // gripping Strength
      if (grippingStrength && grippingStrength !== "" && !isNaN(grippingStrength)) {
        formData.append("capabilities.loadHandling.grippingStrength.value", String(grippingStrength));
        formData.append("capabilities.loadHandling.grippingStrength.unit", grippingStrengthUnit);
      }

      // articulation Precision
      if (articulationPrecision && articulationPrecision !== "" && !isNaN(articulationPrecision)) {
        formData.append("capabilities.loadHandling.articulationPrecision.value", String(articulationPrecision));
        formData.append("capabilities.loadHandling.articulationPrecision.unit", articulationPrecisionUnit);
      }

      // communicationRange
      if (communicationRange && communicationRange !== "" && !isNaN(communicationRange)) {
        formData.append("capabilities.communicationRange.value", String(communicationRange));
        formData.append("capabilities.communicationRange.unit", communicationRangeUnit);
      }

      // hotSwappable
      formData.append("payloadsAndAttachments.hotSwappable", hotSwappable ? "true" : "false");

      // isFeatured
      formData.append("isFeatured", isFeatured ? "true" : "false");

      // Other specifications (optional)
      if (batteryCapacity && batteryCapacity !== "" && !isNaN(batteryCapacity)) {
        formData.append("specifications.batteryCapacity.value", String(batteryCapacity));
        formData.append("specifications.batteryCapacity.unit", batteryCapacityUnit);
      }
      if (loadCapacity && loadCapacity !== "" && !isNaN(loadCapacity)) {
        formData.append("specifications.loadCapacity.value", String(loadCapacity));
        formData.append("specifications.loadCapacity.unit", loadCapacityUnit);
      }
      if (runtime && runtime !== "" && !isNaN(runtime)) {
        formData.append("specifications.runtime.value", String(runtime));
        formData.append("specifications.runtime.unit", runtimeUnit);
      }
      if (speed && speed !== "" && !isNaN(speed)) {
        formData.append("specifications.speed.value", String(speed));
        formData.append("specifications.speed.unit", speedUnit);
      }
      if (accuracy && accuracy !== "" && !isNaN(accuracy)) {
        formData.append("specifications.accuracy.value", String(accuracy));
        formData.append("specifications.accuracy.unit", accuracyUnit);
      }
      if (range && range !== "" && !isNaN(range)) {
        formData.append("specifications.range.value", String(range));
        formData.append("specifications.range.unit", rangeUnit);
      }
      if (chargingTime && chargingTime !== "" && !isNaN(chargingTime)) {
        formData.append("specifications.batteryChargeTime.value", String(chargingTime));
        formData.append("specifications.batteryChargeTime.unit", chargingTimeUnit);
      }

      // Operating Temperature
      if (operatingTemperatureMin && operatingTemperatureMin !== "" && !isNaN(operatingTemperatureMin)) {
        formData.append(
          "specifications.operatingTemperature.min",
          String(operatingTemperatureMin)
        );
      }
      if (operatingTemperatureMax && operatingTemperatureMax !== "" && !isNaN(operatingTemperatureMax)) {
        formData.append(
          "specifications.operatingTemperature.max",
          String(operatingTemperatureMax)
        );
      }
      if ((operatingTemperatureMin && operatingTemperatureMin !== "" && !isNaN(operatingTemperatureMin)) || (operatingTemperatureMax && operatingTemperatureMax !== "" && !isNaN(operatingTemperatureMax))) {
        formData.append("specifications.operatingTemperature.unit", operatingTemperatureUnit);
      }

      // Durability fields
      if (ipRating && ipRating.trim() !== "") formData.append("specifications.durability.ipRating", ipRating.trim());
      if (milStdCompliance && milStdCompliance.trim() !== "") formData.append("specifications.durability.milStdCompliance", milStdCompliance.trim());
      if (radiationShielding && radiationShielding.trim() !== "") formData.append("specifications.durability.radiationShielding", radiationShielding.trim());

      // Data logging fields
      if (storageCapacity && storageCapacity !== "" && !isNaN(storageCapacity)) {
        formData.append("sensorsAndSoftware.dataLogging.storageCapacity.value", String(storageCapacity));
        formData.append("sensorsAndSoftware.dataLogging.storageCapacity.unit", storageCapacityUnit);
      }
      if (loggingInterval && loggingInterval !== "" && !isNaN(loggingInterval)) {
        formData.append("sensorsAndSoftware.dataLogging.loggingInterval.value", String(loggingInterval));
        formData.append("sensorsAndSoftware.dataLogging.loggingInterval.unit", loggingIntervalUnit);
      }

      // Mobility constraints
      if (maxSlope && maxSlope !== "" && !isNaN(maxSlope)) {
        formData.append("operationalEnvironmentAndApplications.mobilityConstraints.maxSlope.value", String(maxSlope));
        formData.append("operationalEnvironmentAndApplications.mobilityConstraints.maxSlope.unit", maxSlopeUnit);
      }
      if (maxStepHeight && maxStepHeight !== "" && !isNaN(maxStepHeight)) {
        formData.append("operationalEnvironmentAndApplications.mobilityConstraints.maxStepHeight.value", String(maxStepHeight));
        formData.append("operationalEnvironmentAndApplications.mobilityConstraints.maxStepHeight.unit", maxStepHeightUnit);
      }
      if (maxWaterDepth && maxWaterDepth !== "" && !isNaN(maxWaterDepth)) {
        formData.append("operationalEnvironmentAndApplications.mobilityConstraints.maxWaterDepth.value", String(maxWaterDepth));
        formData.append("operationalEnvironmentAndApplications.mobilityConstraints.maxWaterDepth.unit", maxWaterDepthUnit);
      }

      // Multi-select fields (only if they have selections)
      if (selectedColors.length > 0) {
        selectedColors.forEach((color) => formData.append("specifications.color", color));
      }
      if (selectedMaterials.length > 0) {
        selectedMaterials.forEach((material) =>
          formData.append("specifications.materials", material)
        );
      }
      if (selectedNavigationType.length > 0) {
        selectedNavigationType.forEach((nav) =>
          formData.append("capabilities.navigationTypes", nav)
        );
      }
      if (selectedSensor.length > 0) {
        selectedSensor.forEach((s) => formData.append("sensorsAndSoftware.sensors", s));
      }
      if (selectedAISoftwareFeature.length > 0) {
        selectedAISoftwareFeature.forEach((a) =>
          formData.append("sensorsAndSoftware.aiSoftwareFeatures", a)
        );
      }
      if (selectedTerrainCapability.length > 0) {
        selectedTerrainCapability.forEach((t) =>
          formData.append("operationalEnvironmentAndApplications.terrainCapabilities", t)
        );
      }
      if (selectedCommunicationMethod.length > 0) {
        selectedCommunicationMethod.forEach((c) =>
          formData.append("capabilities.communicationMethods", c)
        );
      }
      if (selectedPayloadType.length > 0) {
        selectedPayloadType.forEach((p) =>
          formData.append("payloadsAndAttachments.payloadTypes", p)
        );
      }

      // Images
      if (featuredimage) {
        console.log("Adding featured image:", featuredimage.name);
        formData.append("images", featuredimage);
      }

      robotSelectedImgs.forEach((file, index) => {
        console.log(`Adding additional image ${index + 1}:`, file.name);
        formData.append("images", file);
      });

      console.log("Calling API...");
      console.log("FormData entries:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      // Debug: Check for empty strings that might cause ObjectId errors
      console.log("Checking for potential ObjectId fields:");
      console.log("selectedCountry:", selectedCountry);
      console.log("selectedCategory:", selectedCategory);
      console.log("selectedSubCategory:", selectedSubCategory);
      console.log("selectedManufacturer:", selectedManufacturer);
      console.log("selectedPower:", selectedPower);
      console.log("selectedPrimaryFunction:", selectedPrimaryFunction);
      console.log("selectedOperatingEnvironment:", selectedOperatingEnvironment);
      console.log("selectedAutonomyLevel:", selectedAutonomyLevel);

      // Add timeout and retry logic
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timeout. Please try again.")),
          30000
        )
      );

      const apiPromise = createRobot(formData);
      const res = await Promise.race([apiPromise, timeoutPromise]);
      console.log("API Response:", res);

      toast.success(res.message || "Robot created successfully!");
      router.push("/cmsroboticlife/my-robot");
      setError({});
    } catch (err) {
      console.error("Submission error:", err);
      console.error("Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });

      let errorMessage = "Something went wrong";

      // Handle different error formats
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      // Provide more specific error messages for common issues
      if (errorMessage.includes("validation")) {
        errorMessage = "Please check the form for errors and try again.";
      } else if (
        errorMessage.includes("duplicate") ||
        errorMessage.includes("unique")
      ) {
        errorMessage =
          "A robot with this title already exists. Please use a different title.";
      } else if (
        errorMessage.includes("authentication") ||
        errorMessage.includes("unauthorized")
      ) {
        errorMessage = "Authentication failed. Please login again.";
      }

      setError({ general: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={addRobo} className="row">
        {/* Show general error if exists */}
        {error.general && (
          <div className="col-12 mb-3">
            <div className="alert alert-danger">{error.general}</div>
          </div>
        )}

        {/* robot title start */}
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="roboTitle">Robot Title *</label>
            <input
              type="text"
              className={`form-control ${error.title ? "is-invalid" : ""}`}
              id="roboTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter robot Title"
              required
            />
            {error.title && <span className="text-danger">{error.title}</span>}
          </div>
        </div>
        {/* robot title ends*/}

        {/* robot slug start */}
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="roboSlug">Robot Slug</label>
            <input
              type="text"
              className="form-control"
              id="roboSlug"
              value={slug}
              placeholder="Auto-generated slug"
              disabled
            />
          </div>
        </div>
        {/* robot slug ends */}

        {/* robot description start */}
        <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="roboDescription">Description *</label>
            <textarea
              id="roboDescription"
              className={`form-control ${error.description ? "is-invalid" : ""
                }`}
              rows="7"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter robo description"
              required
            ></textarea>
            {error.description && (
              <span className="text-danger">{error.description}</span>
            )}
          </div>
        </div>
        {/* robot description ends */}

        {/* robot status start */}
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="roboStatus">Status</label>
            <select
              id="roboStatus"
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value === "true")}
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>
        </div>
        {/* robot status ends */}

        {/* robot category start */}
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
          </div>
        </div>
        {/* robot category ends */}

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
          </div>
        </div>
        {/* robot sub category ends */}

        {/* robot manufacturer start */}
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
          </div>
        </div>
        {/* robot manufacturer ends */}

        {/* robot country start */}
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
          </div>
        </div>
        {/* robot country ends */}

        {/* robot launch year start */}
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
          </div>
        </div>
        {/* robot launch year ends */}

        {/* robot price start */}
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
          </div>
        </div>
        {/* robot price ends */}

        {/* robot version start */}
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
        {/* robot version ends */}

        {/* robot isFeatured start */}
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label>IsFeatured</label>
            <div className="d-flex gap-3 mt-2">
              {/* True Option */}
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="isFeaturedTrue"
                  name="isFeatured"
                  checked={isFeatured === true}
                  onChange={() => setIsFeatured(true)}
                />
                <label className="form-check-label" htmlFor="isFeaturedTrue">
                  True
                </label>
              </div>

              {/* False Option */}
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="isFeaturedFalse"
                  name="isFeatured"
                  checked={isFeatured === false}
                  onChange={() => setIsFeatured(false)}
                />
                <label className="form-check-label" htmlFor="isFeaturedFalse">
                  False
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* robot isFeatured ends */}

        {/* --- specifications start--- */}

        <div className=" mt30 ">
          <div className="col-lg-12">
            <h3 className="mb30">Specifications</h3>
          </div>
          <div className="row">
            {/*------ Dimensions Start ------*/}
            <div className="col-lg-12">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="dimensions">Dimensions</label>

                {/* --- dimension row start --- */}

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
                      <option value="m">m</option>
                      <option value="inch">inch</option>
                      <option value="ft">ft</option>
                    </select>
                  </div>
                  {/* Length ends */}

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
                      <option value="m">m</option>
                      <option value="inch">inch</option>
                      <option value="ft">ft</option>
                    </select>
                  </div>
                  {/* Width ends */}

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
                  {/* Height ends */}

                  {/* wingspan start */}
                  <div className="col-lg-6 position-relative mb-2">
                    <input
                      type="number"
                      className="form-control pe-5"
                      placeholder="Enter Robot Wingspan"
                      value={wingspan}
                      onChange={(e) => setWingspan(e.target.value)}
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
                      <option value="m">m</option>
                    </select>
                  </div>
                  {/* wingspan ends */}

                  {/* reach start */}
                  <div className="col-lg-6 position-relative mb-2">
                    <input
                      type="number"
                      className="form-control pe-5"
                      placeholder="Enter Robot Reach"
                      value={reach}
                      onChange={(e) => setReach(e.target.value)}
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
                      value={reachUnit}
                      onChange={(e) => setReachUnit(e.target.value)}
                    >
                      <option value="cm">cm</option>
                      <option value="m">m</option>
                    </select>
                  </div>
                  {/* reach ends */}
                </div>

                {/* --- dimension row ends --- */}

                {/* --- durability row starts --- */}

                <label htmlFor="durability">Durability</label>

                <div className="row">
                  {/* ipRating start */}
                  <div className="col-lg-6 position-relative mb-2">
                    <input
                      type="text"
                      className="form-control pe-5"
                      placeholder="Enter Robot IP Rating"
                      value={ipRating}
                      onChange={(e) => setIpRating(e.target.value)}
                    />
                  </div>
                  {/* ipRating ends */}

                  {/* milStdCompliance start */}
                  <div className="col-lg-6 position-relative mb-2">
                    <input
                      type="text"
                      className="form-control pe-5"
                      placeholder="Enter Robot MIL-STD Compliance"
                      value={milStdCompliance}
                      onChange={(e) => setMilStdCompliance(e.target.value)}
                    />
                  </div>
                  {/* milStdCompliance ends */}

                  {/* radiationShielding start */}
                  <div className="col-lg-6 position-relative mb-2">
                    <input
                      type="text"
                      className="form-control pe-5"
                      placeholder="Enter Robot Radiation Shielding"
                      value={radiationShielding}
                      onChange={(e) => setRadiationShielding(e.target.value)}
                    />
                  </div>
                  {/* radiationShielding ends */}
                </div>

                {/* --- durability row ends --- */}

                {/* --- maintenance row starts --- */}

                <label htmlFor="maintenanceInfo">Maintenance Information</label>

                <div className="row">
                  {/* mtbf start */}
                  <div className="col-lg-6 position-relative mb-2">
                    <input
                      type="text"
                      className="form-control pe-5"
                      placeholder="Enter Robot Mean Time Between Failures (MTBF)"
                      value={mtbf}
                      onChange={(e) => setMtbf(e.target.value)}
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
                      value={mtbfUnit}
                      onChange={(e) => setMtbfUnit(e.target.value)}
                    >
                      <option value="h">h</option>
                    </select>
                  </div>
                  {/* mtbf ends */}

                  {/* maintenance Interval start */}
                  <div className="col-lg-6 position-relative mb-2">
                    <input
                      type="text"
                      className="form-control pe-5"
                      placeholder="Enter Robot Maintenance Interval"
                      value={maintenanceInterval}
                      onChange={(e) => setMaintenanceInterval(e.target.value)}
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
                      value={maintenanceIntervalUnit}
                      onChange={(e) =>
                        setMaintenanceIntervalUnit(e.target.value)
                      }
                    >
                      <option value="h">h</option>
                      <option value="days">days</option>
                      <option value="months">months</option>
                    </select>
                  </div>
                  {/* maintenance Interval ends */}
                </div>

                {/* --- maintenance row ends --- */}

                {/* another row starts */}
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
                  {/* Weight ends */}

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
                    </div>
                  </div>
                  {/* Power Source ends */}

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
                  {/* Battery Capacity ends */}

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
                  {/* Battery Chargetime ends */}

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
                  {/* Runtime ends */}

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
                  {/* Load Capacity ends */}

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
                  {/* Speed ends */}

                  {/* Operating Temperature start */}
                  <div className="col-lg-6 mb-2">
                    <label>Operating Temperature</label>
                    <div className="d-flex gap-2">
                      {/* Min Temperature */}
                      <div className="position-relative flex-fill">
                        <input
                          type="number"
                          className="form-control pe-5"
                          placeholder="Min"
                          value={operatingTemperatureMin}
                          onChange={(e) =>
                            setOperatingTemperatureMin(e.target.value)
                          }
                        />
                      </div>

                      {/* Max Temperature */}
                      <div className="position-relative flex-fill">
                        <input
                          type="number"
                          className="form-control pe-5"
                          placeholder="Max"
                          value={operatingTemperatureMax}
                          onChange={(e) =>
                            setOperatingTemperatureMax(e.target.value)
                          }
                        />
                      </div>

                      {/* Unit Selector */}
                      <div
                        className="position-relative"
                        style={{ minWidth: "80px" }}
                      >
                        <select
                          className="form-select border-0 bg-transparent"
                          style={{
                            height: "100%",
                            appearance: "none",
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                          }}
                          value={operatingTemperatureUnit}
                          onChange={(e) =>
                            setOperatingTemperatureUnit(e.target.value)
                          }
                        >
                          <option value="°C">°C</option>
                          <option value="°F">°F</option>
                          <option value="K">K</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* Operating Temperature ends */}

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
                  {/* Accuracy ends */}

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
                      </select>
                    </div>
                  </div>
                  {/* Range ends */}

                  {/* noise level start */}
                  <div className="col-lg-6 mb-2">
                    <label htmlFor="noiseLevel">Noise Level</label>
                    <div className="position-relative">
                      <input
                        type="number"
                        className="form-control pe-5"
                        placeholder="Enter Robot Noise Level"
                        value={noiseLevel}
                        onChange={(e) => setNoiseLevel(e.target.value)}
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
                        value={noiseLevelUnit}
                        onChange={(e) => setNoiseLevelUnit(e.target.value)}
                      >
                        <option value="dB">dB</option>
                        <option value="dB(A)">dB(A)</option>
                      </select>
                    </div>
                  </div>
                  {/* noise level ends */}

                  {/* energy consumption start */}
                  <div className="col-lg-6 mb-2">
                    <label htmlFor="energyConsumption">Energy Consumption</label>
                    <div className="position-relative">
                      <input
                        type="number"
                        className="form-control pe-5"
                        placeholder="Enter Robot Energy Consumption"
                        value={energyConsumption}
                        onChange={(e) => setEnergyConsumption(e.target.value)}
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
                        value={energyConsumptionUnit}
                        onChange={(e) =>
                          setEnergyConsumptionUnit(e.target.value)
                        }
                      >
                        <option value="W">W</option>
                        <option value="kW">kW</option>
                      </select>
                    </div>
                  </div>
                  {/* energy consumption ends */}

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
                            if (
                              value !== "placeholder" &&
                              !selectedColors.includes(value)
                            ) {
                              setSelectedColors([...selectedColors, value]);
                            }
                            e.target.blur(); // dropdown band ho jaye select ke baad
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

                        {/* Overlay UI */}
                        <div
                          className="form-control position-absolute top-0 start-0 h-100 w-100 d-flex align-items-center px-3 pe-5"
                          style={{
                            background: "transparent",
                            pointerEvents: "none", // block all by default
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
                              pointerEvents: "auto", // enable only here
                            }}
                            onMouseDown={(e) => e.stopPropagation()} // stop dropdown opening on scroll
                          >
                            {selectedColors.length === 0 ? (
                              <span className="text-muted">
                                -- Select Colors --
                              </span>
                            ) : (
                              <>
                                {colors
                                  .filter((c) => selectedColors.includes(c._id))
                                  .map((c) => (
                                    <span
                                      key={c._id}
                                      className="badge bg-light text-dark border d-flex align-items-center"
                                      style={{
                                        pointerEvents: "auto",
                                      }}
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
                                            selectedColors.filter(
                                              (id) => id !== c._id
                                            )
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
                  {/* Color ends */}

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
                            if (
                              value !== "placeholder" &&
                              !selectedMaterials.includes(value)
                            ) {
                              setSelectedMaterials([
                                ...selectedMaterials,
                                value,
                              ]);
                            }
                            e.target.blur(); // close dropdown after each select
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

                        {/* Overlay UI */}
                        <div
                          className="form-control position-absolute top-0 start-0 h-100 w-100 d-flex align-items-center px-3 pe-5"
                          style={{
                            background: "transparent",
                            pointerEvents: "none", // disable by default
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
                              pointerEvents: "auto", // enable scroll here
                            }}
                            onMouseDown={(e) => e.stopPropagation()} // stop dropdown from opening while scroll
                          >
                            {selectedMaterials.length === 0 ? (
                              <span className="text-muted">
                                -- Select Materials --
                              </span>
                            ) : (
                              <>
                                {materials
                                  .filter((m) =>
                                    selectedMaterials.includes(m._id)
                                  )
                                  .map((m) => (
                                    <span
                                      key={m._id}
                                      className="badge bg-light text-dark border d-flex align-items-center"
                                      style={{
                                        pointerEvents: "auto",
                                      }}
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
                                            selectedMaterials.filter(
                                              (id) => id !== m._id
                                            )
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
                  {/* Material Select ends */}
                </div>
                {/* another row ends */}
              </div>
            </div>

            {/* -------- Capabilities Start-------- */}

            <div className="row">
              <div className="col-lg-12">
                <h3 className="mb30">Capabilities</h3>
              </div>
              {/* robot feature start */}
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="feature">Feature</label>
                  <input
                    type="text"
                    className="form-control"
                    id="feature"
                    value={feature}
                    onChange={(e) => setFeature(e.target.value)}
                    placeholder="Enter Feature"
                  />
                </div>
              </div>
              {/* robot feature ends */}

              {/* robot interoperability start */}
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="interoperability">Interoperability</label>
                  <input
                    type="text"
                    className="form-control"
                    id="interoperability"
                    value={interoperability}
                    onChange={(e) => setInteroperability(e.target.value)}
                    placeholder="Enter Interoperability"
                  />
                </div>
              </div>
              {/* robot interoperability ends */}

              {/* communication Range start */}
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="communicationRange">Communication Range</label>
                  <div className="position-relative">
                    <input
                      type="number"
                      className="form-control pe-5"
                      placeholder="Enter Robot Communication Range"
                      value={communicationRange}
                      onChange={(e) => setCommunicationRange(e.target.value)}
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
                      value={communicationRangeUnit}
                      onChange={(e) =>
                        setCommunicationRangeUnit(e.target.value)
                      }
                    >
                      <option value="m">m</option>
                      <option value="kWh">kWh</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* energy consumption ends */}

              {/* Load Handling start */}
              <div className="my_profile_setting_input form-group">
                <label htmlFor="loadHandling">Load Handling</label>
                {/* mtbf start */}
                <div className="row">
                  <div className="col-lg-6 col-xl-6 position-relative mb-2">
                    <input
                      type="text"
                      className="form-control pe-5"
                      placeholder="Enter Robot Gripping Strength"
                      value={grippingStrength}
                      onChange={(e) => setGrippingStrength(e.target.value)}
                    />
                    <select
                      className="form-select position-absolute end-0 border-0 bg-transparent"
                      style={{
                        width: "auto",
                        height: "auto",
                        top: "50%",
                        transform: "translateY(-50%)",
                        paddingRight: "45px",
                        paddingLeft: "8px",
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                      }}
                      value={grippingStrengthUnit}
                      onChange={(e) => setGrippingStrengthUnit(e.target.value)}
                    >
                      <option value="h">h</option>
                    </select>
                  </div>
                  {/* mtbf ends */}

                  {/* maintenance Interval start */}
                  <div className="col-lg-6 col-xl-6 position-relative mb-2">
                    <input
                      type="text"
                      className="form-control pe-5"
                      placeholder="Enter Robot Articulation Precision"
                      value={articulationPrecision}
                      onChange={(e) => setArticulationPrecision(e.target.value)}
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
                      value={articulationPrecisionUnit}
                      onChange={(e) =>
                        setArticulationPrecisionUnit(e.target.value)
                      }
                    >
                      <option value="mm">mm</option>
                      <option value="µm">µm</option>
                      <option value="degree">°</option>
                      <option value="rad">rad</option>
                    </select>
                  </div>
                  {/* maintenance Interval ends */}
                </div>
              </div>
              {/* Load Handling ends */}

              {/* Navigation Types start */}
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label htmlFor="navigationTypeSelect">Navigation Type</label>

                  <div className="position-relative">
                    <select
                      id="navigationTypeSelect"
                      className="selectpicker form-select navigationType-select"
                      value="placeholder"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          value !== "placeholder" &&
                          !selectedNavigationType.includes(value)
                        ) {
                          setSelectedNavigationType([
                            ...selectedNavigationType,
                            value,
                          ]);
                        }
                        e.target.blur(); // close dropdown after each select
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
                      {navigationType.map((navigationType) => (
                        <option
                          key={navigationType._id}
                          value={navigationType._id}
                        >
                          {navigationType.name || navigationType.title}
                        </option>
                      ))}
                    </select>

                    {/* Overlay UI */}
                    <div
                      className="form-control position-absolute top-0 start-0 h-100 w-100 d-flex align-items-center px-3 pe-5"
                      style={{
                        background: "transparent",
                        pointerEvents: "none", // disable by default
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
                          pointerEvents: "auto", // enable scroll here
                        }}
                        onMouseDown={(e) => e.stopPropagation()} // stop dropdown from opening while scroll
                      >
                        {selectedNavigationType.length === 0 ? (
                          <span className="text-muted">
                            -- Select Navigation Types --
                          </span>
                        ) : (
                          <>
                            {navigationType
                              .filter((m) =>
                                selectedNavigationType.includes(m._id)
                              )
                              .map((m) => (
                                <span
                                  key={m._id}
                                  className="badge bg-light text-dark border d-flex align-items-center"
                                  style={{
                                    pointerEvents: "auto",
                                  }}
                                >
                                  {m.name || m.title}
                                  <button
                                    type="button"
                                    className="btn-close btn-sm ms-1"
                                    aria-label="Remove"
                                    style={{ fontSize: "0.65rem" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedNavigationType(
                                        selectedNavigationType.filter(
                                          (id) => id !== m._id
                                        )
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
              {/* Navigation Types ends */}

              {/* Communication Method start */}
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label htmlFor="communicationMethodSelect">
                    Communication Method Type
                  </label>

                  <div className="position-relative">
                    <select
                      id="communicationMethodSelect"
                      className="selectpicker form-select communicationMethod-select"
                      value="placeholder"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          value !== "placeholder" &&
                          !selectedCommunicationMethod.includes(value)
                        ) {
                          setSelectedCommunicationMethod([
                            ...selectedCommunicationMethod,
                            value,
                          ]);
                        }
                        e.target.blur(); // close dropdown after each select
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
                      {communicationMethods.map((communicationMethod) => (
                        <option
                          key={communicationMethod._id}
                          value={communicationMethod._id}
                        >
                          {communicationMethod.name ||
                            communicationMethod.title}
                        </option>
                      ))}
                    </select>

                    {/* Overlay UI */}
                    <div
                      className="form-control position-absolute top-0 start-0 h-100 w-100 d-flex align-items-center px-3 pe-5"
                      style={{
                        background: "transparent",
                        pointerEvents: "none", // disable by default
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
                          pointerEvents: "auto", // enable scroll here
                        }}
                        onMouseDown={(e) => e.stopPropagation()} // stop dropdown from opening while scroll
                      >
                        {selectedCommunicationMethod.length === 0 ? (
                          <span className="text-muted">
                            -- Select Communication Methods --
                          </span>
                        ) : (
                          <>
                            {communicationMethods
                              .filter((m) =>
                                selectedCommunicationMethod.includes(m._id)
                              )
                              .map((m) => (
                                <span
                                  key={m._id}
                                  className="badge bg-light text-dark border d-flex align-items-center"
                                  style={{
                                    pointerEvents: "auto",
                                  }}
                                >
                                  {m.name || m.title}
                                  <button
                                    type="button"
                                    className="btn-close btn-sm ms-1"
                                    aria-label="Remove"
                                    style={{ fontSize: "0.65rem" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedCommunicationMethod(
                                        selectedCommunicationMethod.filter(
                                          (id) => id !== m._id
                                        )
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
              {/* Communication Method ends */}

              {/* Primary Function start */}
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label htmlFor="primaryFunction">Primary Function</label>
                  <select
                    id="primaryFunction"
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
                </div>
              </div>
              {/* Primary Function ends */}

              {/* Autonomy Level start */}
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label htmlFor="autonomyLevel">Autonomy Level</label>
                  <select
                    id="autonomyLevel"
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
                </div>
              </div>
              {/* Autonomy Level ends */}
            </div>

            {/* -------- Payloads & Attachments -------- */}
            <div className="row">
              <div className="col-lg-12">
                <h3 className="mb30">Payloads & Attachments</h3>
              </div>

              {/* Max Payload Weight start */}
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="maxPayloadWeight">Max Payload Weight</label>
                  <div className="position-relative">
                    <input
                      type="number"
                      className="form-control pe-5"
                      id="maxPayloadWeight"
                      value={maxPayloadWeight}
                      onChange={(e) => setMaxPayloadWeight(e.target.value)}
                      placeholder="Enter Max Payload Weight"
                    />
                    <select
                      className="form-select position-absolute end-0 border-0 bg-transparent"
                      style={{
                        width: "auto",
                        height: "100%",
                        top: "0",
                        paddingRight: "30px",
                        paddingLeft: "8px",
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                      }}
                      value={maxPayloadWeightUnit}
                      onChange={(e) => setMaxPayloadWeightUnit(e.target.value)}
                    >
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                      <option value="lb">lb</option>
                      <option value="t">t</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* Max Payload Weight ends */}

              {/* Payload Type start */}
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label htmlFor="payloadTypeSelect">Payload Type</label>
                  <div className="position-relative">
                    <select
                      id="payloadTypeSelect"
                      className="selectpicker form-select payloadType-select"
                      value="placeholder"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          value !== "placeholder" &&
                          !selectedPayloadType.includes(value)
                        ) {
                          setSelectedPayloadType([
                            ...selectedPayloadType,
                            value,
                          ]);
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
                      {payloadTypes.map((payloadType) => (
                        <option key={payloadType._id} value={payloadType._id}>
                          {payloadType.name || payloadType.title}
                        </option>
                      ))}
                    </select>

                    {/* Overlay UI */}
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
                          <span className="text-muted">
                            -- Select Payload Types --
                          </span>
                        ) : (
                          <>
                            {payloadTypes
                              .filter((m) =>
                                selectedPayloadType.includes(m._id)
                              )
                              .map((m) => (
                                <span
                                  key={m._id}
                                  className="badge bg-light text-dark border d-flex align-items-center"
                                  style={{
                                    pointerEvents: "auto",
                                  }}
                                >
                                  {m.name || m.title}
                                  <button
                                    type="button"
                                    className="btn-close btn-sm ms-1"
                                    aria-label="Remove"
                                    style={{ fontSize: "0.65rem" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedPayloadType(
                                        selectedPayloadType.filter(
                                          (id) => id !== m._id
                                        )
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
              {/* Payload Type ends */}

              {/* robot attachments start */}
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="attachments">Attachments</label>
                  <input
                    type="text"
                    className="form-control"
                    id="attachments"
                    value={attachments}
                    onChange={(e) => setAttachments(e.target.value)}
                    placeholder="Enter Attachments"
                  />
                </div>
              </div>
              {/* robot attachments ends */}

              {/* robot accessory ports start */}
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="accessoryPorts">Accessory Ports</label>
                  <input
                    type="text"
                    className="form-control"
                    id="accessoryPorts"
                    value={accessoryPorts}
                    onChange={(e) => setAccessoryPorts(e.target.value)}
                    placeholder="Enter Accessory Ports"
                  />
                </div>
              </div>
              {/* robot accessory ports ends */}

              {/* robot hot swappable start */}
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label>Hot Swappable</label>
                  <div className="d-flex gap-3 mt-2">
                    {/* True Option */}
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="hotSwappableTrue"
                        name="hotSwappable"
                        checked={hotSwappable === true}
                        onChange={() => setHotSwappable(true)}
                      />
                      <label className="form-check-label" htmlFor="hotSwappableTrue">
                        True
                      </label>
                    </div>

                    {/* False Option */}
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="hotSwappableFalse"
                        name="hotSwappable"
                        checked={hotSwappable === false}
                        onChange={() => setHotSwappable(false)}
                      />
                      <label className="form-check-label" htmlFor="hotSwappableFalse">
                        False
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* robot hot swappable ends */}

            </div>

            {/* -------- Sensors & Software --------  */}
            <div className="row">
              <div className="col-lg-12">
                <h3 className="mb-30">Sensors & Software</h3>
              </div>
              {/* Sensor start */}
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label htmlFor="sensorSelect">Sensor</label>

                  <div className="position-relative">
                    <select
                      id="sensorSelect"
                      className="selectpicker form-select sensor-select"
                      value="placeholder"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          value !== "placeholder" &&
                          !selectedSensor.includes(value)
                        ) {
                          setSelectedSensor([...selectedSensor, value]);
                        }
                        e.target.blur(); // close dropdown after each select
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

                    {/* Overlay UI */}
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
                          pointerEvents: "auto", // enable scroll here
                        }}
                        onMouseDown={(e) => e.stopPropagation()} // stop dropdown from opening while scroll
                      >
                        {selectedSensor.length === 0 ? (
                          <span className="text-muted">
                            -- Select Sensor --
                          </span>
                        ) : (
                          <>
                            {sensors
                              .filter((m) => selectedSensor.includes(m._id))
                              .map((m) => (
                                <span
                                  key={m._id}
                                  className="badge bg-light text-dark border d-flex align-items-center"
                                  style={{
                                    pointerEvents: "auto",
                                  }}
                                >
                                  {m.name || m.title}
                                  <button
                                    type="button"
                                    className="btn-close btn-sm ms-1"
                                    aria-label="Remove"
                                    style={{ fontSize: "0.65rem" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedSensor(
                                        selectedSensor.filter(
                                          (id) => id !== m._id
                                        )
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
              {/* Sensor ends */}

              {/* Ai Software Features start */}
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label htmlFor="aiSoftwareFeatureSelect">
                    AI/Software Feature Type
                  </label>

                  <div className="position-relative">
                    <select
                      id="aiSoftwareFeatureSelect"
                      className="selectpicker form-select aiSoftwareFeature-select"
                      value="placeholder"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          value !== "placeholder" &&
                          !selectedAISoftwareFeature.includes(value)
                        ) {
                          setSelectedAISoftwareFeature([
                            ...selectedAISoftwareFeature,
                            value,
                          ]);
                        }
                        e.target.blur(); // close dropdown after each select
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
                      {aiSoftwareFeatures.map((aiSoftwareFeature) => (
                        <option
                          key={aiSoftwareFeature._id}
                          value={aiSoftwareFeature._id}
                        >
                          {aiSoftwareFeature.name || aiSoftwareFeature.title}
                        </option>
                      ))}
                    </select>

                    {/* Overlay UI */}
                    <div
                      className="form-control position-absolute top-0 start-0 h-100 w-100 d-flex align-items-center px-3 pe-5"
                      style={{
                        background: "transparent",
                        pointerEvents: "none", // disable by default
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
                          pointerEvents: "auto", // enable scroll here
                        }}
                        onMouseDown={(e) => e.stopPropagation()} // stop dropdown from opening while scroll
                      >
                        {selectedAISoftwareFeature.length === 0 ? (
                          <span className="text-muted">
                            -- Select AI/Software Features --
                          </span>
                        ) : (
                          <>
                            {aiSoftwareFeatures
                              .filter((m) =>
                                selectedAISoftwareFeature.includes(m._id)
                              )
                              .map((m) => (
                                <span
                                  key={m._id}
                                  className="badge bg-light text-dark border d-flex align-items-center"
                                  style={{
                                    pointerEvents: "auto",
                                  }}
                                >
                                  {m.name || m.title}
                                  <button
                                    type="button"
                                    className="btn-close btn-sm ms-1"
                                    aria-label="Remove"
                                    style={{ fontSize: "0.65rem" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedAISoftwareFeature(
                                        selectedAISoftwareFeature.filter(
                                          (id) => id !== m._id
                                        )
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
              {/* Ai Software Features ends */}

              {/* robot Operating System start */}
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="operatingSystem">Operating System</label>
                  <input
                    type="text"
                    className="form-control"
                    id="operatingSystem"
                    value={operatingSystem}
                    onChange={(e) => setOperatingSystem(e.target.value)}
                    placeholder="Enter Operating System"
                  />
                </div>
              </div>
              {/* robot Operating System ends */}

              {/* robot firmware Version start */}
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="firmwareVersion">Firmware Version</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firmwareVersion"
                    value={firmwareVersion}
                    onChange={(e) => setFirmwareVersion(e.target.value)}
                    placeholder="Enter Firmware Version"
                  />
                </div>
              </div>
              {/* robot firmware Version ends */}

              {/* robot Security Features start */}
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="securityFeatures">Security Features</label>
                  <input
                    type="text"
                    className="form-control"
                    id="securityFeatures"
                    value={securityFeatures}
                    onChange={(e) => setSecurityFeatures(e.target.value)}
                    placeholder="Enter Security Features"
                  />
                </div>
              </div>
              {/* robot Security Features ends */}

              {/* Data Logging start */}
              <div className="my_profile_setting_input form-group">
                <label htmlFor="dataLogging">Data Logging</label>
                {/* storageCapacity start */}
                <div className="row">
                  <div className="col-lg-6 col-xl-6 position-relative mb-2">
                    <input
                      type="text"
                      className="form-control pe-5"
                      placeholder="Enter Robot Storage Capacity"
                      value={storageCapacity}
                      onChange={(e) => setStorageCapacity(e.target.value)}
                    />
                    <select
                      className="form-select position-absolute end-0 border-0 bg-transparent"
                      style={{
                        width: "auto",
                        height: "auto",
                        top: "50%",
                        transform: "translateY(-50%)",
                        paddingRight: "45px",
                        paddingLeft: "8px",
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                      }}
                      value={storageCapacityUnit}
                      onChange={(e) => setStorageCapacityUnit(e.target.value)}
                    >
                      <option value="b">B</option>
                      <option value="kb">KB</option>
                      <option value="mb">MB</option>
                      <option value="gb">GB</option>
                      <option value="tb">TB</option>
                      <option value="l">L</option>
                      <option value="m³">m³</option>
                    </select>
                  </div>
                  {/* storageCapacity ends */}

                  {/* logging Interval start */}
                  <div className="col-lg-6 col-xl-6 position-relative mb-2">
                    <input
                      type="text"
                      className="form-control pe-5"
                      placeholder="Enter Robot Logging Interval"
                      value={loggingInterval}
                      onChange={(e) => setLoggingInterval(e.target.value)}
                    />
                    <select
                      className="form-select position-absolute end-0 border-0 bg-transparent"
                      style={{
                        width: "auto",
                        height: "auto",
                        top: "50%",
                        transform: "translateY(-50%)",
                        paddingRight: "25px",
                        paddingLeft: "8px",
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                      }}
                      value={loggingIntervalUnit}
                      onChange={(e) =>
                        setLoggingIntervalUnit(e.target.value)
                      }
                    >
                      <option value="s">s</option>
                      <option value="min">min</option>
                      <option value="h">h</option>
                    </select>
                  </div>
                  {/* logging Interval ends */}
                </div>
              </div>
              {/* Data Logging ends */}
            </div>

            {/* -------- Operational Environment & Applications --------  */}

            <div className="row">
              <div className="col_lg-12">
                <h3 className="mb-30">Operational Environment & Applications</h3>
              </div>
              {/* Operating Environment start */}
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label htmlFor="operatingEnvironment">
                    Operating Environment
                  </label>
                  <select
                    id="operatingEnvironment"
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
                </div>
              </div>
              {/* Operating Environment ends */}

              {/* Terrain Capability start */}
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label htmlFor="terrainCapabilitySelect">
                    Terrain Capability Type
                  </label>

                  <div className="position-relative">
                    <select
                      id="terrainCapabilitySelect"
                      className="selectpicker form-select terrainCapability-select"
                      value="placeholder"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          value !== "placeholder" &&
                          !selectedTerrainCapability.includes(value)
                        ) {
                          setSelectedTerrainCapability([
                            ...selectedTerrainCapability,
                            value,
                          ]);
                        }
                        e.target.blur(); // close dropdown after each select
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
                      {terrainCapabilities.map((terrainCapability) => (
                        <option
                          key={terrainCapability._id}
                          value={terrainCapability._id}
                        >
                          {terrainCapability.name || terrainCapability.title}
                        </option>
                      ))}
                    </select>

                    {/* Overlay UI */}
                    <div
                      className="form-control position-absolute top-0 start-0 h-100 w-100 d-flex align-items-center px-3 pe-5"
                      style={{
                        background: "transparent",
                        pointerEvents: "none", // disable by default
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
                          pointerEvents: "auto", // enable scroll here
                        }}
                        onMouseDown={(e) => e.stopPropagation()} // stop dropdown from opening while scroll
                      >
                        {selectedTerrainCapability.length === 0 ? (
                          <span className="text-muted">
                            -- Select Terrain Capabilities --
                          </span>
                        ) : (
                          <>
                            {terrainCapabilities
                              .filter((m) =>
                                selectedTerrainCapability.includes(m._id)
                              )
                              .map((m) => (
                                <span
                                  key={m._id}
                                  className="badge bg-light text-dark border d-flex align-items-center"
                                  style={{
                                    pointerEvents: "auto",
                                  }}
                                >
                                  {m.name || m.title}
                                  <button
                                    type="button"
                                    className="btn-close btn-sm ms-1"
                                    aria-label="Remove"
                                    style={{ fontSize: "0.65rem" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedTerrainCapability(
                                        selectedTerrainCapability.filter(
                                          (id) => id !== m._id
                                        )
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
              {/* Terrain Capability ends */}

              {/* robot Applications start */}
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="applications">Applications</label>
                  <input
                    type="text"
                    className="form-control"
                    id="applications"
                    value={applications}
                    onChange={(e) => setApplications(e.target.value)}
                    placeholder="Enter Applications"
                  />
                </div>
              </div>
              {/* robot Applications ends */}

              {/* robot Endurance in Extreme Conditions start */}
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="enduranceExtremeConditions">Endurance in Extreme Conditions</label>
                  <input
                    type="text"
                    className="form-control"
                    id="enduranceExtremeConditions"
                    value={enduranceExtremeConditions}
                    onChange={(e) => setEnduranceExtremeConditions(e.target.value)}
                    placeholder="Enter Endurance in Extreme Conditions"
                  />
                </div>
              </div>
              {/* robot Endurance in Extreme Conditions ends */}

              {/* robot Deployment Logistics start */}
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="deploymentLogistics">Deployment Logistics</label>
                  <input
                    type="text"
                    className="form-control"
                    id="deploymentLogistics"
                    value={deploymentLogistics}
                    onChange={(e) => setDeploymentLogistics(e.target.value)}
                    placeholder="Enter Deployment Logistics"
                  />
                </div>
              </div>
              {/* robot Deployment Logistics ends */}

              {/* mobilityConstraints start */}
              <div className="my_profile_setting_input form-group">
                <label htmlFor="mobilityConstraints">Mobility Constraints</label>
                <div className="row">
                  {/* maxSlope start */}
                  <div className="col-lg-6 col-xl-6 position-relative mb-2">
                    <input
                      type="text"
                      className="form-control pe-5"
                      placeholder="Enter Robot Max Slope"
                      value={maxSlope}
                      onChange={(e) => setMaxSlope(e.target.value)}
                    />
                    <select
                      className="form-select position-absolute end-0 border-0 bg-transparent"
                      style={{
                        width: "auto",
                        height: "auto",
                        top: "50%",
                        transform: "translateY(-50%)",
                        paddingRight: "45px",
                        paddingLeft: "8px",
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                      }}
                      value={maxSlopeUnit}
                      onChange={(e) => setMaxSlopeUnit(e.target.value)}
                    >
                      <option value="degree">°</option>
                      <option value="percentage">%</option>
                    </select>
                  </div>
                  {/* maxSlope ends */}

                  {/* maxStepHeight start */}
                  <div className="col-lg-6 col-xl-6 position-relative mb-2">
                    <input
                      type="text"
                      className="form-control pe-5"
                      placeholder="Enter Robot Max Step Height"
                      value={maxStepHeight}
                      onChange={(e) => setMaxStepHeight(e.target.value)}
                    />
                    <select
                      className="form-select position-absolute end-0 border-0 bg-transparent"
                      style={{
                        width: "auto",
                        height: "auto",
                        top: "50%",
                        transform: "translateY(-50%)",
                        paddingRight: "25px",
                        paddingLeft: "8px",
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                      }}
                      value={maxStepHeightUnit}
                      onChange={(e) => setMaxStepHeightUnit(e.target.value)}
                    >
                      <option value="mm">mm</option>
                      <option value="cm">cm</option>
                    </select>
                  </div>
                  {/* maxStepHeight ends */}

                  {/* maxWaterDepth start */}
                  <div className="col-lg-6 col-xl-6 position-relative mb-2">
                    <input
                      type="text"
                      className="form-control pe-5"
                      placeholder="Enter Robot Max Water Depth"
                      value={maxWaterDepth}
                      onChange={(e) => setMaxWaterDepth(e.target.value)}
                    />
                    <select
                      className="form-select position-absolute end-0 border-0 bg-transparent"
                      style={{
                        width: "auto",
                        height: "auto",
                        top: "50%",
                        transform: "translateY(-50%)",
                        paddingRight: "25px",
                        paddingLeft: "8px",
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                      }}
                      value={maxWaterDepthUnit}
                      onChange={(e) => setMaxWaterDepthUnit(e.target.value)}
                    >
                      <option value="m">m</option>
                      <option value="cm">cm</option>
                      <option value="ft">ft</option>
                    </select>
                  </div>
                  {/* maxWaterDepth ends */}
                </div>
              </div>
              {/* mobilityConstraints ends */}
            </div>

            <div className="row">
              <div className="col-lg-12">
                <h3 className="mb30">Property media</h3>
              </div>
              {/* End .col */}
              <div className="col-lg-12">
                <div className="my_profile_setting_textarea">
                  <label htmlFor="videoEmbedCode">Video Embed code</label>
                  <textarea
                    id="videoEmbedCode"
                    className="form-control"
                    rows="7"
                    value={videoembedcode}
                    onChange={(e) => setVideoEmbedCode(e.target.value)}
                    placeholder="Enter Video Embed code"
                  ></textarea>
                </div>
              </div>
              {/* End .col */}
              <div className="col-lg-6">
                <div htmlFor="featuredimage">Featured Image</div>
                <div className="wrap-custom-file">
                  <input
                    type="file"
                    id="featuredimage"
                    accept="image/png, image/gif, image/jpeg, image/svg+xml, image/svg, image/webp, image/avif"
                    onChange={uploadFeaturedImage}
                  />
                  <label
                    style={
                      featuredimage !== null
                        ? {
                          backgroundImage: `url(${URL.createObjectURL(
                            featuredimage
                          )})`,
                        }
                        : undefined
                    }
                    htmlFor="featuredimage"
                  >
                    <span>
                      <i className="flaticon-download"></i> Upload featured
                      image{" "}
                    </span>
                  </label>
                </div>
                <p>*minimum 260px x 260px</p>
              </div>
              <div className="col-lg-12">
                <ul className="mb-0">
                  {robotSelectedImgs.length > 0
                    ? robotSelectedImgs?.map((item, index) => (
                      <li key={index} className="list-inline-item">
                        <div className="portfolio_item">
                          <Image
                            width={200}
                            height={200}
                            className="img-fluid cover"
                            src={URL.createObjectURL(item)}
                            alt="fp1.jpg"
                          />
                          <div
                            className="edu_stats_list"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Delete"
                            data-original-title="Delete"
                          >
                            <a onClick={() => deleteImage(item.name)}>
                              <span className="flaticon-garbage"></span>
                            </a>
                          </div>
                        </div>
                      </li>
                    ))
                    : undefined}
                  {/* End li */}
                </ul>
              </div>
              <div className="col-lg-12">
                <div className="portfolio_upload">
                  <input
                    type="file"
                    onChange={multipleImage}
                    multiple
                    accept="image/png, image/gif, image/jpeg, image/svg+xml, image/svg, image/webp, image/avif"
                  />
                  <div className="icon">
                    <span className="flaticon-download"></span>
                  </div>
                  <p>Drag and drop images here</p>
                </div>
              </div>
              {/* End .col */}
            </div>
            {/* End .col */}
            <div className=" mt30 ">
              <div className="col-lg-12">
                <h3 className="mb30">Meta Information</h3>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="propertyMetatitle">Meta Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="propertyMetatitle"
                      value={metatitle}
                      onChange={(e) => setMetatitle(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="my_profile_setting_textarea form-group">
                    <label htmlFor="propertyMetaDescription">
                      Meta Description
                    </label>
                    <textarea
                      id="propertyMetaDescription"
                      className="form-control"
                      rows="7"
                      value={metadescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      placeholder="Enter meta description"
                    ></textarea>
                  </div>
                </div>
                {/* End .col */}
              </div>
            </div>
          </div>
        </div>
        {/* specifications ends */}

        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            <button
              className="btn btn1 float-start"
              type="button"
              onClick={() =>
                (window.location.href = "/cmsroboticlife/my-dashboard")
              }
            >
              Back
            </button>
            <button
              className="btn btn2 float-end"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;
