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
  // const [pdffile, setPDFFile] = useState(null);
  // --- State Hooks ---
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

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
  const [rangeUnit, setRangeUnit] = useState("km/h");
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

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [manufacturers, setManufacturers] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState("");

  const [videoembedcode, setVideoEmbedCode] = useState([]);
  const [nearby, setNearBy] = useState([]);
  const [specifications, setSpecifications] = useState([]);

  const [metatitle, setMetatitle] = useState([]);
  const [metadescription, setMetaDescription] = useState([]);

  const [featuredimage, setFeaturedImage] = useState(null);

  const handleBedroomChange = (e) => {
    setBedRooms(e.target.value);

    // Clear custom input if not "Custom"
    if (e.target.value !== "Custom") {
      setCustomBedroom("");
    }
  };

  // upload profile
  const uploadFeaturedImage = (e) => {
    setFeaturedImage(e.target.files[0]);
  };

  const [propertySelectedImgs, setPropertySelectedImgs] = useState([]);

  // multiple image select
  const multipleImage = (e) => {
    // checking is same file matched with old stored array
    const isExist = propertySelectedImgs?.some((file1) =>
      selectedFiles(e)?.some((file2) => file1.name === file2.name)
    );

    if (!isExist) {
      setPropertySelectedImgs((old) => [...old, ...selectedFiles(e)]);
    } else {
      alert("You have selected one image already!");
    }
  };

  // delete image
  const deleteImage = (name) => {
    const deleted = propertySelectedImgs?.filter((file) => file.name !== name);
    setPropertySelectedImgs(deleted);
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

  // For unit dropdowns (hardcoded options)
  const handleLengthUnitChange = (e) => {
    setLengthUnit(e.target.value);
  };

  const handleWidthUnitChange = (e) => {
    setWidthUnit(e.target.value);
  };

  const handleHeightUnitChange = (e) => {
    setHeightUnit(e.target.value);
  };

  const handleWeightUnitChange = (e) => {
    setWeightUnit(e.target.value);
  };

  // --- Submit ---
  const addRobo = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation list
    const requiredFields = [
      { key: "title", value: title, name: "Title" },
      { key: "slug", value: slug, name: "Slug" },
      { key: "description", value: description, name: "Description" },
      { key: "price", value: price, name: "Total Price" },
      { key: "countryid", value: selectedCountry, name: "Country of Origin" },
      { key: "categoryid", value: selectedCategory, name: "Category" },
      {
        key: "subcategoryid",
        value: selectedSubCategory,
        name: "Sub Category",
      },
      {
        key: "manufacturerid",
        value: selectedManufacturer,
        name: "Manufacturer",
      },
      { key: "launchYear", value: launchYear, name: "Launch Year" },
      { key: "length", value: length, name: "Length" },
      { key: "width", value: width, name: "Width" },
      { key: "height", value: height, name: "Height" },
      { key: "weight", value: weight, name: "Weight" },
      {
        key: "batteryCapacity",
        value: batteryCapacity,
        name: "Battery Capacity",
      },
      { key: "runtime", value: runtime, name: "Runtime" },
      { key: "speed", value: speed, name: "Speed" },
      { key: "accuracy", value: accuracy, name: "Accuracy" },
      { key: "selectedPower", value: selectedPower, name: "Power Source" },
      {
        key: "videoembedcode",
        value: videoembedcode,
        name: "Video Embed Code",
      },
      {
        key: "selectedPrimaryFunction",
        value: selectedPrimaryFunction,
        name: "Primary Function",
      },
      {
        key: "selectedOperatingEnvironment",
        value: selectedOperatingEnvironment,
        name: "Operating Environment",
      },
      {
        key: "selectedAutonomyLevel",
        value: selectedAutonomyLevel,
        name: "Autonomy Level",
      },
      {
        key: "colors",
        value: selectedColors.length > 0 ? selectedColors : null,
        name: "Colors",
      },
      {
        key: "materials",
        value: selectedMaterials.length > 0 ? selectedMaterials : null,
        name: "Materials",
      },
      {
        key: "navigationTypes",
        value:
          selectedNavigationType.length > 0 ? selectedNavigationType : null,
        name: "Navigation Types",
      },
      {
        key: "sensors",
        value: selectedSensor.length > 0 ? selectedSensor : null,
        name: "Sensors",
      },
      {
        key: "aiSoftwareFeatures",
        value:
          selectedAISoftwareFeature.length > 0
            ? selectedAISoftwareFeature
            : null,
        name: "AI Software Features",
      },
      {
        key: "terrainCapability",
        value:
          selectedTerrainCapability.length > 0
            ? selectedTerrainCapability
            : null,
        name: "Terrain Capability",
      },
      {
        key: "communicationMethod",
        value:
          selectedCommunicationMethod.length > 0
            ? selectedCommunicationMethod
            : null,
        name: "Communication Method",
      },
      {
        key: "payloadType",
        value: selectedPayloadType.length > 0 ? selectedPayloadType : null,
        name: "Payload Type",
      },
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

    if (Object.keys(newErrors).length > 0) {
      return setError(newErrors);
    }

    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const token = userData?.token;
      if (!token) {
        toast.error("User not authenticated");
        return;
      }

      const payload = {
        title,
        slug,
        description,
        totalPrice: price,
        countryOfOrigin: selectedCountry,
        category: selectedCategory,
        subcategoryid: selectedSubCategory,
        manufacturer: selectedManufacturer,
        launchYear,
        version,
        length,
        lengthUnit,
        width,
        widthUnit,
        height,
        heightUnit,
        weight,
        weightUnit,
        batteryCapacity,
        chargingTime,
        loadCapacity,
        runtime,
        speed,
        accuracy,
        // operatingTemperature can be constructed on backend if needed
        range,
        rangeUnit,
        powerSource: selectedPower,
        videoembedcode,
        primaryFunction: selectedPrimaryFunction,
        operatingEnvironment: selectedOperatingEnvironment,
        autonomyLevel: selectedAutonomyLevel,
        metatitle,
        metadescription,
        featuredimage,
      };

      const formData = new FormData();

      // Append normal fields
      for (const key in payload) {
        if (payload[key] !== undefined && payload[key] !== null) {
          formData.append(key, payload[key]);
        }
      }

      // Append multi-selects
      selectedColors.forEach((color) => formData.append("color[]", color));
      selectedMaterials.forEach((material) =>
        formData.append("material[]", material)
      );
      selectedNavigationType.forEach((nav) =>
        formData.append("navigationType[]", nav)
      );
      selectedSensor.forEach((s) => formData.append("sensors[]", s));
      selectedAISoftwareFeature.forEach((a) =>
        formData.append("aiSoftwareFeatures[]", a)
      );
      selectedTerrainCapability.forEach((t) =>
        formData.append("terrainCapability[]", t)
      );
      selectedCommunicationMethod.forEach((c) =>
        formData.append("communicationMethod[]", c)
      );
      selectedPayloadType.forEach((p) =>
        formData.append("payloadTypesSupported[]", p)
      );

      // Append nested unit/value fields to match backend schema
      if (length) formData.append("dimensions.length.value", String(length));
      if (lengthUnit)
        formData.append("dimensions.length.unit", String(lengthUnit));
      if (width) formData.append("dimensions.width.value", String(width));
      if (widthUnit)
        formData.append("dimensions.width.unit", String(widthUnit));
      if (height) formData.append("dimensions.height.value", String(height));
      if (heightUnit)
        formData.append("dimensions.height.unit", String(heightUnit));

      if (weight) formData.append("weight.value", String(weight));
      if (weightUnit) formData.append("weight.unit", String(weightUnit));

      if (batteryCapacity)
        formData.append("batteryCapacity.value", String(batteryCapacity));
      if (batteryCapacityUnit)
        formData.append("batteryCapacity.unit", String(batteryCapacityUnit));

      if (loadCapacity)
        formData.append("loadCapacity.value", String(loadCapacity));
      if (loadCapacityUnit)
        formData.append("loadCapacity.unit", String(loadCapacityUnit));

      if (runtime) formData.append("runtime.value", String(runtime));
      if (runtimeUnit) formData.append("runtime.unit", String(runtimeUnit));

      if (speed) formData.append("speed.value", String(speed));
      if (speedUnit) formData.append("speed.unit", String(speedUnit));

      if (accuracy) formData.append("accuracy.value", String(accuracy));
      if (accuracyUnit) formData.append("accuracy.unit", String(accuracyUnit));

      if (range) formData.append("range.value", String(range));
      if (rangeUnit) formData.append("range.unit", String(rangeUnit));

      if (operatingTemperatureMin)
        formData.append(
          "operatingTemperature.min",
          String(operatingTemperatureMin)
        );
      if (operatingTemperatureMax)
        formData.append(
          "operatingTemperature.max",
          String(operatingTemperatureMax)
        );
      if (operatingTemperatureUnit)
        formData.append(
          "operatingTemperature.unit",
          String(operatingTemperatureUnit)
        );

      // Append images
      propertySelectedImgs.forEach((file) => {
        formData.append("images", file);
      });

      // API call
      const res = await createRobot(formData, token);

      toast.success(res.message || "Robot created successfully!");
   
        router.push("/cmsroboticlife/my-properties");

      setError({});
    } catch (err) {
      console.error(err);
      setError({ general: err.message || "Something went wrong" });
    }
  };

  return (
    <>
      <form onSubmit={addRobo} className="row">
        {/* robot title start */}
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
            {error.slug && <span className="text-danger">{error.slug}</span>}
          </div>
        </div>
        {/* robot slug ends */}

        {/* robot description start */}
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
        {/* robot description ends */}

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
            {error.selectedCategory && (
              <span className="text-danger">{error.selectedCategory}</span>
            )}
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
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              data-live-search="true"
              data-width="100%"
              disabled={!selectedCategory || subCategories.length === 0} // Disable if no category is selected
            >
              <option value="">-- Select Sub Category --</option>
              {subCategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name || sub.title}
                </option>
              ))}
            </select>
            {error.selectedSubCategory && (
              <span className="text-danger">{error.selectedSubCategory}</span>
            )}
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
            {error.selectedManufacturer && (
              <span className="text-danger">{error.selectedManufacturer}</span>
            )}
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
            {error.price && <span className="text-danger">{error.price}</span>}
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
            {error.version && (
              <span className="text-danger">{error.version}</span>
            )}
          </div>
        </div>
        {/* robot version ends */}

        {/* <div className="col-lg-6">
          <div className="my_profile_setting_textarea">
            <label htmlFor="patentNumber">Patent Number(s)</label>
            <input
              type="text"
              className="form-control"
              id="patentNumber"
              value={patentNumber}
              onChange={(e) => setPatentNumber(e.target.value)}
              placeholder="Enter Patent Number"
            />
            {error.patentNumber && <span className="text-danger">{error.patentNumber}</span>}
          </div>
        </div> */}

        {/* specifications start */}
        <div className=" mt30 ">
          <div className="col-lg-12">
            <h3 className="mb30">Specifications</h3>
          </div>
          <div className="row">
            {/* <div className="col-lg-12">
              <div className="my_profile_setting_textarea">
                <label htmlFor="nearBy">Near By </label>
                <textarea
                  id="nearBy"
                  className="form-control"
                  rows="7"
                  value={nearby}
                  onChange={(e) => setNearBy(e.target.value)}
                  placeholder="Enter Near By"
                ></textarea>
              </div>
            </div> */}
            {/*------ Dimensions Start ------*/}
            <div className="col-lg-12">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="dimensions">Dimensions</label>
                {/* dimension row start */}
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
                    {/* {error.title && <span className="text-danger">{error.title}</span>} */}
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
                    {/* {error.width && <span className="text-danger">{error.width}</span>} */}
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
                    {/* {error.height && <span className="text-danger">{error.height}</span>} */}
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
                </div>
                {/* dimension row ends */}

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
                      {/* {error.weight && <span className="text-danger">{error.weight}</span>} */}
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
                      {/* {error.batteryCapacity && <span className="text-danger">{error.batteryCapacity}</span>} */}
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
                        <option value="cm">mAh</option>
                        <option value="m">Ah</option>
                        <option value="inch">Wh</option>
                        {/* <option value="ft">ft</option> */}
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
                      {/* {error.batteryCapacity && <span className="text-danger">{error.batteryCapacity}</span>} */}
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
                        <option value="cm">h</option>
                        <option value="m">min</option>
                        {/* <option value="inch">Wh</option> */}
                        {/* <option value="ft">ft</option> */}
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
                      {/* {error.batteryCapacity && <span className="text-danger">{error.batteryCapacity}</span>} */}
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
                        <option value="cm">h</option>
                        <option value="m">min</option>
                        {/* <option value="inch">Wh</option> */}
                        {/* <option value="ft">ft</option> */}
                      </select>
                    </div>
                  </div>
                  {/* Runtime start */}

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
                      {/* {error.loadCapacity && <span className="text-danger">{error.loadCapacity}</span>} */}
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
                        <option value="cm">kg</option>
                        <option value="m">g</option>
                        <option value="inch">lb</option>
                        <option value="ft">t</option>
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
                      {/* {error.batteryCapacity && <span className="text-danger">{error.batteryCapacity}</span>} */}
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
                        <option value="cm">m/s</option>
                        <option value="m">km/h</option>
                        <option value="inch">mph</option>
                        {/* <option value="ft">ft</option> */}
                      </select>
                    </div>
                  </div>
                  {/* Speed ends */}

                  {/* Operating Temperature start */}
                  {/* <div className="col-lg-6 mb-2">
                    <label htmlFor="operatingTemperature">
                      Operating Temperature
                    </label>
                    <div className="position-relative">
                      <input
                        type="number"
                        className="form-control pe-5"
                        placeholder="Enter Operating Temperature"
                        value={operatingTemperature}
                        onChange={(e) =>
                          setOperatingTemperature(e.target.value)
                        }
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
                        value={operatingTemperatureUnit}
                        onChange={(e) =>
                          setOperatingTemperatureUnit(e.target.value)
                        }
                      >
                        <option value="cm">°C</option>
                        <option value="m">°F</option>
                        <option value="inch">K</option>
                      </select>
                    </div>
                  </div> */}
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
                          <option value="C">°C</option>
                          <option value="F">°F</option>
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
                      {/* {error.batteryCapacity && <span className="text-danger">{error.batteryCapacity}</span>} */}
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
                        <option value="cm">mm</option>
                        <option value="m">cm</option>
                        {/* <option value="inch">mph</option> */}
                        {/* <option value="ft">ft</option> */}
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
                      {/* {error.batteryCapacity && <span className="text-danger">{error.batteryCapacity}</span>} */}
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
                        <option value="cm">m</option>
                        <option value="m">km</option>
                        <option value="inch">mi</option>
                        {/* <option value="ft">ft</option> */}
                      </select>
                    </div>
                  </div>
                  {/* Range ends */}

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

                        {/* Overlay UI with scroll */}
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

              {/* Sensor start */}
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label htmlFor="sensorSelect">Sensor</label>

                  <div className="position-relative">
                    <select
                      id="sensorSelect"
                      className="selectpicker form-select sensor  -select"
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

            <div className="row">
              <div className="col-lg-12">
                <h3 className="mb30">Property media</h3>
              </div>
              {/* End .col */}
              <div className="col-lg-12">
                <div className="my_profile_setting_textarea">
                  <label htmlFor="videoEmbedCode">Video Embed code </label>
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
                    // accept="image/png, image/gif, image/jpeg"
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
                  {propertySelectedImgs.length > 0
                    ? propertySelectedImgs?.map((item, index) => (
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
                    // accept="image/png, image/gif, image/jpeg"
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
                    {error.metadescription && (
                      <span className="text-danger">
                        {error.metadescription}
                      </span>
                    )}
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
              onClick={() => (window.location.href = "/cmsroboticlife/my-dashboard")}
            >
              Back
            </button>
            <button className="btn btn2 float-end" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;
