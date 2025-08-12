"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
// import { getCityByStateTableData } from "../../../api/city";
// import { getStateByCountryTableData } from "../../../api/state";
// import { getLocationByCityTableData } from "../../../api/location";
// import { getAmenityTableData } from "../../../api/amenity";
// import { getBuilderTableData } from "../../../api/builder";
// import { getConstructionstatusTableData } from "../../../api/constructionstatus";
// import { getFurnishingstatusTableData } from "../../../api/furnishingstatus";
// import { addPropertyAPI } from "../../../api/property";
// import { getSellerTableData } from "@/api/seller";

import { getCountryTableData } from "../../../api/country";
import { getCategoryTableData } from "../../../api/category";
import { getPropertytypeByCategoryTableData } from "../../../api/propertytype";
// import { addRobotAPI } from "../../../api/property";

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
  // const [highlights, setHighlights] = useState("");

  const [price, setPrice] = useState("");
  // const [pricesqft, setPriceSqft] = useState("");
  // const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  // const [states, setStates] = useState([]);
  // const [selectedState, setSelectedState] = useState("");

  // const [cities, setCities] = useState([]);
  // const [selectedCity, setSelectedCity] = useState("");

  // const [locations, setLocations] = useState([]);
  // const [selectedLocation, setSelectedLocation] = useState("");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // const [propertytypes, setPropertytypes] = useState([]);
  // const [selectedPropertytype, setSelectedPropertytype] = useState("");

  // const [builders, setBuilders] = useState([]);
  // const [selectedBuilder, setSelectedBuilder] = useState("");

  // const [amenities, setAmenities] = useState([]);
  // const [selectedAmenity, setSelectedAmenity] = useState("");

  // const [constructionstatus, setConstructionstatus] = useState([]);
  // const [selectedConstructionstatus, setSelectedConstructionstatus] =
  //   useState("");
  // const [furnishingstatus, setFurnishingstatus] = useState([]);
  // const [selectedFurnishingstatus, setSelectedFurnishingstatus] = useState("");

  // const [featuredproperties, setFeaturedProperties] = useState([]);
  // const [selectedFeaturedProperty, setSelectedFeaturedProperty] = useState("");

  // const [hotproperties, setHotProperties] = useState([]);
  // const [selectedHotProperty, setSelectedHotProperty] = useState("");

  // const [reraapproved, setReraApproved] = useState([]);
  // const [selectedReraApproved, setSelectedReraApproved] = useState("");

  // const [propertyid, setPropertyid] = useState([]);
  // const [areasize, setAreasize] = useState([]);
  // const [sizeprefix, setSizePrefix] = useState([]);
  // const [bedrooms, setBedRooms] = useState([]);
  // const [bathrooms, setBathRooms] = useState([]);
  // const [garages, setGarages] = useState([]);
  // const [garagessize, setGaragesSize] = useState([]);
  // const [yearbuild, setYearBuild] = useState([]);

  // const [foodcourt, setFoodcourt] = useState([]);
  // const [paymentplan, setPaymentPlan] = useState([]);
  // const [multiplex, setMultiplex] = useState([]);

  // const [mapembedcode, setMapEmbedCode] = useState([]);
  // const [videoembedcode, setVideoEmbedCode] = useState([]);
  // const [nearby, setNearBy] = useState([]);
  const [specifications, setSpecifications] = useState([]);

  // const [sellername, setSellerName] = useState([]);
  // const [selleremail, setSellerEmail] = useState([]);
  // const [sellerphone, setSellerPhone] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState("");

  // const [zipcode, setZipCode] = useState([]);
  // const [reranumber, setReraNumber] = useState([]);

  const [metatitle, setMetatitle] = useState([]);
  const [metadescription, setMetaDescription] = useState([]);

  const [featuredimage, setFeaturedImage] = useState(null);
  // const [siteplan, setSitePlan] = useState(null);
  // const [masterplan, setMasterPlan] = useState(null);
  // const [roomtext, setRoomText] = useState("Bedrooms");
  // const [customBedroom, setCustomBedroom] = useState("");

  const handleBedroomChange = (e) => {
    setBedRooms(e.target.value);

    // Clear custom input if not "Custom"
    if (e.target.value !== "Custom") {
      setCustomBedroom("");
    }
  };

  const [customBathrooms, setCustomBathrooms] = useState("");

  const handleBathroomsChange = (e) => {
    setBathRooms(e.target.value);

    // Clear custom input if not "Custom"
    if (e.target.value !== "Custom") {
      setCustomBathrooms("");
    }
  };

  const [customParking, setCustomParking] = useState("");

  const handleParkingChange = (e) => {
    setGarages(e.target.value);

    // Clear custom input if not "Custom"
    if (e.target.value !== "Custom") {
      setCustomParking("");
    }
  };

  // upload profile
  const uploadFeaturedImage = (e) => {
    setFeaturedImage(e.target.files[0]);
  };
  const uploadSitePlan = (e) => {
    // alert("test")
    setSitePlan(e.target.files[0]);
  };
  const uploadMasterPlan = (e) => {
    // alert("test")
    setMasterPlan(e.target.files[0]);
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

  // --- Fetch Initial Data ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const filter = {
          limit: 1000,
          page: 1,
        };
        const [
          countryRes,
          constRes,
          furnRes,
          catRes,
          amenityRes,
          builderRes,
          sellerRes,
        ] = await Promise.all([
          getCountryTableData(),
          // getConstructionstatusTableData(),
          // getFurnishingstatusTableData(),
          getCategoryTableData(filter),
          // getAmenityTableData(filter),
          // getBuilderTableData(filter),
          // getSellerTableData(),
        ]);

        setCountries(countryRes || []);
        // setConstructionstatus(constRes || []);
        // setFurnishingstatus(furnRes || []);
        // setCategories(catRes.items || []);
        // setAmenities(amenityRes.items || []);
        // setBuilders(builderRes.items || []);
        // setSellers(sellerRes.data || []);
      } catch (err) {
        console.error("Error loading initial data:", err);
      }
    };
    fetchData();
  }, []);

  // --- Handlers ---

  const handleCountryChange = async (e) => {
    const value = e.target.value;
    setSelectedCountry(value);
    try {
      const res = await getStateByCountryTableData(value);
      setStates(res.data || []);
    } catch (err) {
      console.error("Error fetching states:", err);
    }
  };

  const handleStateChange = async (e) => {
    const value = e.target.value;
    setSelectedState(value);
    try {
      const res = await getCityByStateTableData(value);
      setCities(res.data || []);
    } catch (err) {
      console.error("Error fetching cities:", err);
    }
  };

  const handleCityChange = async (e) => {
    const value = e.target.value;
    setSelectedCity(value);
    try {
      const res = await getLocationByCityTableData(value);
      setLocations(res.data || []);
    } catch (err) {
      console.error("Error fetching locations:", err);
    }
  };

  const handleCategoryChange = async (e) => {
    const value = e.target.value;

    if (value == "67ea48d17cfa562fe8eaafd0") {
      setRoomText("Meeting rooms and cabins");
    }
    setSelectedCategory(value);
    try {
      const res = await getPropertytypeByCategoryTableData(value);
      setPropertytypes(res.data || []);
    } catch (err) {
      console.error("Error fetching property types:", err);
    }
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;

    setSelectedAmenity((prev) => {
      if (checked) {
        return [...prev, value]; // add to selection
      } else {
        return prev.filter((id) => id !== value); // remove from selection
      }
    });
  };

  const handlePropertytypeChange = (e) => {
    setSelectedPropertytype(e.target.value);
  };
  const handleBuilderChange = (e) => {
    setSelectedBuilder(e.target.value);
  };
  const handleConstructionstatusChange = (e) => {
    setSelectedConstructionstatus(e.target.value);
  };
  const handleFurnishingstatusChange = (e) => {
    setSelectedFurnishingstatus(e.target.value);
  };
  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    if (e.target.value.trim() !== "") setError("");
  };

  const [inputs, setInputs] = useState([]);
  const handleAddInput = () => {
    setInputs([
      ...inputs,
      {
        id: Date.now(),
        title: "",
        areasize: "",
        planimage: null,
      },
    ]);
  };
  const handleInputChange = (index, field, value) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };
  const handleRemoveInput = (idToRemove) => {
    setInputs(inputs.filter((input) => input.id !== idToRemove));
  };
  const uploadPlanImage = (index, file) => {
    const updatedInputs = [...inputs];
    updatedInputs[index].planimage = file;
    setInputs(updatedInputs);
  };

  // --- Submit ---
  const addRobo = async (e) => {
    e.preventDefault();
    const newErrors = {};

    const requiredFields = [
      { key: "title", value: title, name: "Title" },
      { key: "slug", value: slug, name: "Slug" },
      { key: "description", value: description, name: "Description" },
      { key: "price", value: price, name: "Price" },
      // { key: "pricesqft", value: pricesqft, name: "Price Sqft" },
      // { key: "address", value: address, name: "Address" },
      { key: "country", value: selectedCountry, name: "Country" },
      // { key: "state", value: selectedState, name: "State" },
      // { key: "city", value: selectedCity, name: "City" },
      // { key: "location", value: selectedLocation, name: "Location" },
      { key: "selectedCategory", value: selectedCategory, name: "Category" },
      // {
      //   key: "selectedPropertytype",
      //   value: selectedPropertytype,
      //   name: "Property Type",
      // },
      // { key: "selectedBuilder", value: selectedBuilder, name: "Builder" },
      // { key: "selectedSeller", value: selectedSeller, name: "Seller" },
      // {
      //   key: "selectedConstructionstatus",
      //   value: selectedConstructionstatus,
      //   name: "Construction Status",
      // },
      // {
      //   key: "selectedFurnishingstatus",
      //   value: selectedFurnishingstatus,
      //   name: "Furnishing Status",
      // },
      // { key: "selectedAmenity", value: selectedAmenity, name: "Amenity" },
      // {
      //   key: "selectedReraApproved",
      //   value: selectedReraApproved,
      //   name: "RERA Approved",
      // },
      // {
      //   key: "selectedFeaturedProperty",
      //   value: selectedFeaturedProperty,
      //   name: "Featured Property",
      // },
      // {
      //   key: "selectedHotProperty",
      //   value: selectedHotProperty,
      //   name: "Hot Property",
      // },
    ];

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
      const payload = {
        title,
        slug,
        description,
        // highlights,
        price,
        // pricesqft,
        // address,
        countryid: selectedCountry,
        // stateid: selectedState,
        // cityid: selectedCity,
        // locationid: selectedLocation,
        categoryid: selectedCategory,
        // propertytypeid: selectedPropertytype,
        // builderid: selectedBuilder,
        // sellerid: selectedSeller,
        // constructionstatus: selectedConstructionstatus,
        // furnishingstatus: selectedFurnishingstatus,
        // amenityid: selectedAmenity,
        // reraapproved: selectedReraApproved,
        // featuredproperty: selectedFeaturedProperty,
        // hotproperty: selectedHotProperty,
        // propertyid,
        // areasize,
        // sizeprefix,
        // bedrooms: bedrooms === "Custom" ? customBedroom : bedrooms,
        // bathrooms: bathrooms === "Custom" ? customBathrooms : bathrooms,
        // garages: garages === "Custom" ? customParking : garages,
        // bedrooms,
        //  bathrooms,
        //  garages,
        // garagessize,
        // yearbuild,
        // mapembedcode,
        // videoembedcode,
        // nearby,
        specifications,
        // sellername,
        // selleremail,
        // sellerphone,
        // reranumber,
        // zipcode,
        metatitle,
        metadescription,
        featuredimage,
        // siteplan,
        // masterplan,
        // pdffile,
        // paymentplan,
        // multiplex: multiplex === true || multiplex === "true" ? true : false,
        // foodcourt: foodcourt === true || foodcourt === "true" ? true : false,
      };

      const formData = new FormData();

      // Loop over each key-value pair in the payload
      for (const key in payload) {
        if (payload[key] !== undefined && payload[key] !== null) {
          formData.append(key, payload[key]);
        }
      }
      propertySelectedImgs.forEach((file) => {
        formData.append("propertySelectedImgs", file); // Repeat key name for each file
      });

      inputs.forEach((input, index) => {
        formData.append(`floorPlans[${index}][title]`, input.title);
        formData.append(`floorPlans[${index}][bedroom]`, input.bedroom);
        formData.append(`floorPlans[${index}][price]`, input.price);
        formData.append(`floorPlans[${index}][areasize]`, input.areasize);
        formData.append(`floorPlans[${index}][description]`, input.description);
        if (input.planimage) {
          formData.append(`floorPlans[${index}][planimage]`, input.planimage);
        }
        // formData.append('planimage', input.planimage);
      });

      const res = await addRoboAPI(formData);
      toast.success(res.message);
      if (res.status == "success") {
        router.push("/cmswegrow/my-properties");
      }

      // alert(res.message);

      // Reset fields and errors
      setError({});
      // (Reset other fields here if needed)
    } catch (err) {
      setError({ general: err.message || "Something went wrong" });
    }
  };

  return (
    <>
      <form onSubmit={addRobo} className="row">
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
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="roboSlug">Robot Slug</label>
            <input
              type="text"
              className="form-control"
              id="roboSlug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Enter robot slug"
            />
            {error.slug && <span className="text-danger">{error.slug}</span>}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="roboPrice">Total Price</label>
            <input
              type="text"
              className="form-control"
              id="roboPrice"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter robot price"
            />
            {error.price && <span className="text-danger">{error.price}</span>}
          </div>
        </div>
        {/* <div className="col-lg-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyPriceSqft">Price/Sqft</label>
          <input type="text" className="form-control"  id="propertyPriceSqft" value={pricesqft} onChange={(e) => setPriceSqft(e.target.value)}  placeholder="Enter property price Sqft"/>
          {error.priceSqft && <span className="text-danger">{error.priceSqft}</span>}
         
        </div> 
      </div> */}
        {/* End .col */}
        {/* End .col */}
        {/* <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="propertyHighlights">Highlights</label>
            <textarea id="propertyHighlights" className="form-control" rows="7"  value={highlights} onChange={(e) => setHighlights(e.target.value)}  placeholder="Enter property Highlights"></textarea>
            {error.highlights && <span className="text-danger">{error.highlights}</span>}
          </div>
          
        </div> */}
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

        {/* End .col */}

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
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
            {error.selectedCategory && (
              <span className="text-danger">{error.selectedCategory}</span>
            )}
          </div>
        </div>
        {/* <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Property Type</label>
          <select
              id="propertytypeSelect"
              className="selectpicker form-select"
              value={selectedPropertytype}
              onChange={handlePropertytypeChange}
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select Property type --</option>
              {propertytypes.map((propertytype) => (
                <option key={propertytype._id} value={propertytype._id}>
                  {propertytype.title}
                </option>
              ))}
            </select>
            {error.selectedPropertytype && <span className="text-danger">{error.selectedPropertytype}</span>}
        </div>
      </div> */}
        {/* <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Builder</label>
          <select
              id="builderSelect"
              className="selectpicker form-select"
              value={selectedBuilder}
              onChange={handleBuilderChange}
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select Builder --</option>
              {builders.map((builder) => (
                <option key={builder._id} value={builder._id}>
                  {builder.title}
                </option>
              ))}
            </select>
            {error.selectedBuilder && <span className="text-danger">{error.selectedBuilder}</span>}
        </div>
      </div> */}
        {/* End .col */}
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label>Seller</label>
            <select
              id="sellerSelect"
              className="selectpicker form-select"
              value={selectedSeller}
              // onChange={handleSellerChange}
              onChange={(e) => setSelectedSeller(e.target.value)}
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select Seller --</option>
              {sellers.map((seller) => (
                <option key={seller._id} value={seller._id}>
                  {seller.title}
                </option>
              ))}
            </select>
            {error.selectedSeller && (
              <span className="text-danger">{error.selectedSeller}</span>
            )}
          </div>
        </div>
        {/* End .col */}

        {/* <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Construction status</label>
          <select
              id="constructionstatusSelect"
              className="selectpicker form-select"
              value={selectedConstructionstatus}
              onChange={handleConstructionstatusChange}
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select Construction status --</option>
              {constructionstatus.map((constructionstatu) => (
                <option key={constructionstatu._id} value={constructionstatu._id}>
                  {constructionstatu.title}
                </option>
              ))}
            </select>
            {error.selectedConstructionstatus && <span className="text-danger">{error.selectedConstructionstatus}</span>}
        </div>
      </div> 
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Furnishing status</label>
          <select
              id="furnishingstatusSelect"
              className="selectpicker form-select"
              value={selectedFurnishingstatus}
              onChange={handleFurnishingstatusChange}
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select furnishing status --</option>
              {furnishingstatus.map((furnishingstatu) => (
                <option key={furnishingstatu._id} value={furnishingstatu._id}>
                  {furnishingstatu.title}
                </option>
              ))}
            </select>
            {error.selectedFurnishingstatus && <span className="text-danger">{error.selectedFurnishingstatus}</span>}
        </div>
      </div>
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Featured Property</label>
          <select
        className="selectpicker form-select"
        data-live-search="true"
        data-width="100%"
        value={selectedFeaturedProperty}
        onChange={(e) =>
          setSelectedFeaturedProperty(e.target.value)
        }
       
      >
        <option value="">-- Select Featured Property--</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
      {error.selectedHotProperty && <span className="text-danger">{error.selectedHotProperty}</span>}
        </div>
      </div>
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Hot Property</label>
          <select
        className="selectpicker form-select"
        data-live-search="true"
        data-width="100%"
        value={selectedHotProperty}
        onChange={(e) =>
          setSelectedHotProperty(e.target.value)
        }
       
      >
        <option value="">-- Select Hot Property--</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
      {error.selectedHotProperty && <span className="text-danger">{error.selectedHotProperty}</span>}
        </div>
      </div>

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Rera Approved</label>
          <select
        className="selectpicker form-select"
        data-live-search="true"
        data-width="100%"
        value={selectedReraApproved}
        onChange={(e) =>
          setSelectedReraApproved(e.target.value)
        }
      >
        <option value="">-- Select Rera Approved--</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
      {error.selectedReraApproved && <span className="text-danger">{error.selectedReraApproved}</span>}
        </div>
      </div> */}

        {/* End .col */}

        {/* <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="propertyReraNumber">Rera Number</label>

            <input
              type="text"
              className="form-control"
              id="propertyReraNumber"
              value={reranumber}
              onChange={(e) => setReraNumber(e.target.value)}
            />
          </div>
        </div> */}

        {/* <div className="row">
          <div className="col-lg-12">
            <h3 className="mb30">Location</h3>
          </div>

          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <label htmlFor="countrySelect">Select Country</label>
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
          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <label htmlFor="stateSelect">Select State</label>
              <select
                id="stateSelect"
                className="selectpicker form-select"
                value={selectedState}
                onChange={handleStateChange}
                data-live-search="true"
                data-width="100%"
              >
                <option value="">-- Select State --</option>
                {states.map((state) => (
                  <option key={state._id} value={state._id}>
                    {state.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <label htmlFor="citySelect">Select City</label>
              <select
                id="citySelect"
                className="selectpicker form-select"
                value={selectedCity}
                onChange={handleCityChange}
                data-live-search="true"
                data-width="100%"
              >
                <option value="">-- Select City --</option>
                {cities.map((city) => (
                  <option key={city._id} value={city._id}>
                    {city.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <label htmlFor="locationSelect">Select Location</label>
              <select
                id="locationSelect"
                className="selectpicker form-select"
                value={selectedLocation}
                onChange={handleLocationChange}
                data-live-search="true"
                data-width="100%"
              >
                <option value="">-- Select Location --</option>
                {locations.map((location) => (
                  <option key={location._id} value={location._id}>
                    {location.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="propertyZipcode">Zip Code</label>

              <input
                type="text"
                className="form-control"
                id="propertyZipcode"
                value={zipcode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="propertyzipcode">Address</label>

              <input
                type="text"
                className="form-control"
                id="propertyAddress"
                value={address}
                onChange={handleAddressChange}
              />
            </div>
          </div>
        </div> */}
        <div className=" mt30 ">
          <div className="col-lg-12">
            <h3 className="mb30">Detailed Information</h3>
          </div>
          <div className="row">
            {/* <div className="col-lg-6 col-xl-4">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="propertyId">Property ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="propertyId"
                  value={propertyid}
                  onChange={(e) => setPropertyid(e.target.value)}
                />
              </div>
            </div> */}
            {/* End .col */}

            {/* <div className="col-lg-6 col-xl-4">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="propertyAreaSize">Property Area</label>
                <input
                  type="text"
                  className="form-control"
                  id="propertyAreaSize"
                  value={areasize}
                  onChange={(e) => setAreasize(e.target.value)}
                />
              </div>
            </div> */}
            {/* End .col */}

            {/* <div className="col-lg-6 col-xl-4">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="sizePrefix">Size Prefix</label>
                <input
                  type="text"
                  className="form-control"
                  id="sizePrefix"
                  value={sizeprefix}
                  onChange={(e) => setSizePrefix(e.target.value)}
                />
              </div>
            </div> */}
            {/* End .col */}

            {/* <div className="col-lg-6 col-xl-4">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="bedRooms">{roomtext}</label>
                <select
                  id="bedRooms"
                  className="selectpicker form-select"
                  value={bedrooms}
                  // onChange={(e) => setBedRooms(e.target.value)}
                  onChange={handleBedroomChange}
                  data-live-search="true"
                  data-width="100%"
                >
                  <option value="">-- Select Bedrooms --</option>
                  <option key={1} value="1">
                    1
                  </option>
                  <option key={2} value="2">
                    2
                  </option>
                  <option key={3} value="3">
                    3
                  </option>
                  <option key={4} value="4">
                    4
                  </option>
                  <option key={5} value="5">
                    5
                  </option>
                  <option key={6} value="Custom">
                    Custom
                  </option>
                </select>
                {bedrooms === "Custom" && (
                  <div className="mt-3">
                    <input
                      className="form-control"
                      placeholder="Enter custom bedroom"
                      value={customBedroom}
                      onChange={(e) => setCustomBedroom(e.target.value)}
                    />
                  </div>
                )} */}
                {/* <input type="text"
              className="form-control"
              id="bedRooms"
              value={bedrooms}
              onChange={(e) => setBedRooms(e.target.value)} /> */}
              {/* </div>
            </div> */}
            {/* End .col */}

            {/* <div className="col-lg-6 col-xl-4">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="bathRooms">Bathrooms</label> */}
                {/* <input type="text"
              className="form-control"
              id="bathRooms"
              value={bathrooms}
              onChange={(e) => setBathRooms(e.target.value)} /> */}
                {/* <select
                  id="bathRooms"
                  className="selectpicker form-select"
                  value={bathrooms}
                  // onChange={(e) => setBathRooms(e.target.value)}
                  onChange={handleBathroomsChange}
                  data-live-search="true"
                  data-width="100%"
                >
                  <option value="">-- Select Bathrooms --</option>
                  <option key={1} value="1">
                    1
                  </option>
                  <option key={2} value="2">
                    2
                  </option>
                  <option key={3} value="3">
                    3
                  </option>
                  <option key={4} value="4">
                    4
                  </option>
                  <option key={5} value="5">
                    5
                  </option>
                  <option key={6} value="Custom">
                    Custom
                  </option>
                </select>
                {bathrooms === "Custom" && (
                  <div className="mt-3">
                    <input
                      className="form-control"
                      placeholder="Enter custom Bathrooms"
                      value={customBathrooms}
                      onChange={(e) => setCustomBathrooms(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div> */}
            {/* End .col */}

            {/* <div className="col-lg-6 col-xl-4">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="garages">Parkings</label> */}
                {/* <input type="text"
              className="form-control"
              id="garages"
              value={garages}
              onChange={(e) => setGarages(e.target.value)} /> */}
                {/* <select
                  id="garages"
                  className="selectpicker form-select"
                  value={garages}
                  onChange={handleParkingChange}
                  // onChange={(e) => setGarages(e.target.value)}
                  data-live-search="true"
                  data-width="100%"
                >
                  <option value="">-- Select Parkings --</option>
                  <option key={1} value="1">
                    1
                  </option>
                  <option key={2} value="2">
                    2
                  </option>
                  <option key={3} value="3">
                    3
                  </option>
                  <option key={4} value="4">
                    4
                  </option>
                  <option key={5} value="5">
                    5
                  </option>
                  <option key={6} value="Custom">
                    Custom
                  </option>
                </select>
                {garages === "Custom" && (
                  <div className="mt-3">
                    <input
                      className="form-control"
                      placeholder="Enter custom parking"
                      value={customParking}
                      onChange={(e) => setCustomParking(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div> */}
            {/* End .col */}

            {/* <div className="col-lg-6 col-xl-4">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="garagesSize">Parkings description</label>
                <input
                  type="text"
                  className="form-control"
                  id="garagesSize"
                  value={garagessize}
                  onChange={(e) => setGaragesSize(e.target.value)}
                />
              </div>
            </div> */}
            {/* End .col */}

            {/* <div className="col-lg-6 col-xl-4">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="yearBuild">Possession Year</label>
                <input
                  type="text"
                  className="form-control"
                  id="yearBuild"
                  value={yearbuild}
                  onChange={(e) => setYearBuild(e.target.value)}
                />
              </div>
            </div> */}
            {/* End .col */}
            {/* <div className="col-lg-6 col-xl-4">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="paymentPlan">Payment Plan</label>
                <input
                  type="text"
                  className="form-control"
                  id="paymentPlan"
                  value={paymentplan}
                  onChange={(e) => setPaymentPlan(e.target.value)}
                />
              </div>
            </div> */}
            {/* End .col */}
            {/* <div className="col-lg-6 col-xl-4">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="foodcourt">Food court/restaurant</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="foodcourt"
                  value={foodcourt}
                  onChange={(e) => setFoodcourt(e.target.checked)}
                />
              </div>
            </div> */}
            {/* End .col */}
            {/* <div className="col-lg-6 col-xl-4">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="multiplex">Multiplex</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="multiplex"
                  value={multiplex}
                  onChange={(e) => setMultiplex(e.target.checked)}
                />
              </div>
            </div> */}

            {/* <div className="col-lg-12">
              <div className="my_profile_setting_textarea">
                <label htmlFor="mapEmbedCode">Map Embed code </label>
                <textarea
                  id="mapEmbedCode"
                  className="form-control"
                  rows="7"
                  value={mapembedcode}
                  onChange={(e) => setMapEmbedCode(e.target.value)}
                  placeholder="Enter Map Embed code"
                ></textarea>
              </div>
            </div> */}
            {/* End .col */}
            {/* <div className="col-lg-12">
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
            </div> */}
            {/* End .col */}

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
            <div className="col-lg-12">
              <div className="my_profile_setting_textarea">
                <label htmlFor="specifications">Specifications</label>
                <textarea
                  id="specifications"
                  className="form-control"
                  rows="7"
                  value={specifications}
                  onChange={(e) => setSpecifications(e.target.value)}
                  placeholder="Enter specifications"
                ></textarea>
              </div>
            </div>

            {/* <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <div htmlFor="pdffileget">Property Brochure (in PDF only)</div>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setPDFFile(e.target.files[0])}
                />
              </div>
            </div> */}

            <div className="col-xl-12">
              <h4 className="mb10">Amenities</h4>
            </div>
            {/* <div className="col-xxs-12 col-sm col-lg col-xl">
              <ul className="ui_kit_checkbox selectable-list row">
                {amenities.map((amenity, index) => (
                  <li
                    key={amenity._id}
                    className="col-xxs-6 col-sm col-lg col-xl"
                  >
                    <div className="form-check custom-checkbox">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`customCheck_${amenity._id}`}
                        value={amenity._id}
                        checked={selectedAmenity.includes(amenity._id)}
                        onChange={handleAmenityChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`customCheck_${amenity._id}`}
                      >
                        {amenity.title}
                      </label>
                    </div>
                  </li>
                ))} */}

                {/* End li */}

                {/* End li */}
              {/* </ul>
            </div> */}
            {/* End .col */}

            {/* <div className=" mt30 ">
                    <div className="col-lg-12">
                      <h3 className="mb30">Seller Information</h3>
                    </div>
                    <div className="row">
      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="sellerName">Seller Name</label>
          <input type="text"
              className="form-control"
              id="sellerName"
              value={sellername}
              onChange={(e) => setSellerName(e.target.value)} />
        </div>
      </div>
      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="sellerEmail">Seller Email</label>
          <input type="text"
              className="form-control"
              id="sellerEmail"
              value={selleremail}
              onChange={(e) => setSellerEmail(e.target.value)} />
        </div>
      </div>
      <div className="col-lg-6 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="sellerPhone">Seller Phone Number</label>
          <input type="text"
              className="form-control"
              id="sellerPhone"
              value={sellerphone}
              onChange={(e) => setSellerPhone(e.target.value)} />
        </div>
      </div>
      </div>
      </div> */}
            <div className="row">
              <div className="col-lg-12">
                <h3 className="mb30">Property media</h3>
              </div>
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
              {/* <div className="col-lg-6">
                <div htmlFor="SitePlan">Site Plan</div>
                <div className="wrap-custom-file">
                  <input
                    type="file"
                    id="SitePlan"
                    // accept="image/png, image/gif, image/jpeg"
                    accept="image/png, image/gif, image/jpeg, image/svg+xml, image/svg, image/webp, image/avif"
                    onChange={uploadSitePlan}
                  />
                  <label
                    style={
                      siteplan !== null
                        ? {
                            backgroundImage: `url(${URL.createObjectURL(
                              siteplan
                            )})`,
                          }
                        : undefined
                    }
                    htmlFor="SitePlan"
                  >
                    <span>
                      <i className="flaticon-download"></i> Upload Site Plan{" "}
                    </span>
                  </label>
                </div>
                <p>*minimum 260px x 260px</p>
              </div>
              <div className="col-lg-6">
                <div htmlFor="MasterPlan">Master Plan/Layout</div>
                <div className="wrap-custom-file">
                  <input
                    type="file"
                    id="MasterPlan"
                    // accept="image/png, image/gif, image/jpeg"
                    accept="image/png, image/gif, image/jpeg, image/svg+xml, image/svg, image/webp, image/avif"
                    onChange={uploadMasterPlan}
                  />
                  <label
                    style={
                      masterplan !== null
                        ? {
                            backgroundImage: `url(${URL.createObjectURL(
                              masterplan
                            )})`,
                          }
                        : undefined
                    }
                    htmlFor="MasterPlan"
                  >
                    <span>
                      <i className="flaticon-download"></i> Upload Master Plan{" "}
                    </span>
                  </label>
                </div>
                <p>*minimum 260px x 260px</p>
              </div> */}
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
            {/* <div className="my_dashboard_review mt30">
              <div className="col-lg-12">
                <h3 className="mb30">Floor Plans</h3>
                <button
                  className="btn admore_btn mb30"
                  type="button"
                  onClick={handleAddInput}
                >
                  Add More
                </button>
              </div>
              {inputs.map((input, index) => (
                <div className="row" key={input.id}>
                  <div className="col-xl-12">
                    <div className="my_profile_setting_input">
                      <button
                        onClick={() => handleRemoveInput(input.id)}
                        className="btn btn2 float-end"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="col-xl-4">
                    <div className="my_profile_setting_input form-group">
                      <label htmlFor={`planTitle-${index}`}>
                        Plan title {index + 1}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`planTitle-${index}`}
                        value={input.title}
                        onChange={(e) =>
                          handleInputChange(index, "title", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-4">
                    <div className="my_profile_setting_input form-group">
                      <label htmlFor={`planBedrooms-${index}`}>
                        Plan Bedrooms {index + 1}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`planBedrooms-${index}`}
                        value={input.bedroom}
                        onChange={(e) =>
                          handleInputChange(index, "bedroom", e.target.value)
                        }
                      />
                    </div>
                  </div> */}
                  {/* End .col */}
                  {/* <div className="col-xl-4">
                    <div className="my_profile_setting_input form-group">
                      <label htmlFor={`planPrice-${index}`}>
                        Plan Price {index + 1}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`planPrice-${index}`}
                        value={input.price}
                        onChange={(e) =>
                          handleInputChange(index, "price", e.target.value)
                        }
                      />
                    </div>
                  </div> */}
                  {/* End .col */}

                  {/* <div className="col-xl-4">
                    <div className="my_profile_setting_input form-group">
                      <label htmlFor={`planSize-${index}`}>
                        Plan Size {index + 1}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`planSize-${index}`}
                        value={input.areasize}
                        onChange={(e) =>
                          handleInputChange(index, "areasize", e.target.value)
                        }
                      />
                    </div>
                  </div> */}
                  {/* End .col */}
                  {/* <div className="col-lg-4 col-xl-4">
                    <div className="my_profile_setting_input form-group">
                      <div htmlFor="planimage">Plan Image {index + 1}</div>
                      <div className="wrap-custom-file height-150">
                        <input
                          type="file"
                          id={`planimage-${index}`}
                          // accept="image/png, image/gif, image/jpeg"
                          accept="image/png, image/gif, image/jpeg, image/svg+xml, image/svg, image/webp, image/avif"
                          onChange={(e) =>
                            uploadPlanImage(index, e.target.files[0])
                          }
                        />
                        <label
                          style={
                            inputs[index]?.planimage
                              ? {
                                  backgroundImage: `url(${URL.createObjectURL(
                                    inputs[index].planimage
                                  )})`,
                                }
                              : undefined
                          }
                          htmlFor={`planimage-${index}`}
                        >
                          <span>
                            <i className="flaticon-download"></i> Upload plan
                            image{" "}
                          </span>
                        </label>
                      </div>
                      <p>*minimum 260px x 260px</p>
                    </div>
                  </div> */}
                  {/* End .col */}
                  {/* <div className="col-xl-4">
                    <div className="my_profile_setting_textarea mt30-991">
                      <label htmlFor={`planDescription-${index}`}>
                        Plan Description {index + 1}
                      </label>
                      <textarea
                        className="form-control"
                        id={`planDescription-${index}`}
                        rows="4"
                        value={input.description}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}
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

        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            <button
              className="btn btn1 float-start"
              type="button"
              onClick={() => (window.location.href = "/cmswegrow/my-dashboard")}
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
