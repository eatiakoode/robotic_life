"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import CallToAction from "../common/CallToAction";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/headerland/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";
import BreadCrumbBanner from "./BreadCrumbBanner";

import { getCityByStateTableData } from "@/api/city";

import { getCountryTableData } from "@/api/country";
import { getStateByCountryTableData } from "@/api/state";
import { getLocationByCityTableData } from "@/api/location";
import { getCategoryTableData } from "@/api/category";
import { getPropertytypeByCategoryTableData} from "@/api/propertytype";
import { getAmenityTableData } from "@/api/amenity";
import { getBuilderTableData } from "@/api/builder";
import { getConstructionstatusTableData } from "@/api/constructionstatus";
import { getFurnishingstatusTableData } from "@/api/furnishingstatus";
import { addPropertyAPI } from "@/api/frontend/property";


const index = () => {
  const [showBox, setShowBox] = useState(false);
  const router = useRouter();
    // --- State Hooks ---
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const [propertytypes, setPropertytypes] = useState([]);
  const [selectedPropertytype, setSelectedPropertytype] = useState("");
  
  const [builders, setBuilders] = useState([]);
  const [selectedBuilder, setSelectedBuilder] = useState("");
  
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenity, setSelectedAmenity] = useState("");
  
  
  const [constructionstatus, setConstructionstatus] = useState([]);
    const [selectedConstructionstatus, setSelectedConstructionstatus] = useState("");
    const [furnishingstatus, setFurnishingstatus] = useState([]);
    const [selectedFurnishingstatus, setSelectedFurnishingstatus] = useState("");
  
    const [featuredproperties, setFeaturedProperties] = useState([]);
    const [selectedFeaturedProperty, setSelectedFeaturedProperty] = useState(""); 
  
    const [hotproperties, setHotProperties] = useState([]);
    const [selectedHotProperty, setSelectedHotProperty] = useState(""); 
  
    const [reraapproved, setReraApproved] = useState([]);
    const [selectedReraApproved, setSelectedReraApproved] = useState("");
    
    const [propertyid , setPropertyid] = useState([]);
    const [areasize, setAreasize] = useState([]);
    const [sizeprefix, setSizePrefix] = useState([]);
    const [bedrooms, setBedRooms] = useState([]);
    const [bathrooms, setBathRooms] = useState([]);
    const [garages, setGarages] = useState([]);
    const [garagessize, setGaragesSize] = useState([]);
    const [yearbuild, setYearBuild] = useState([]);
    const [mapembedcode, setMapEmbedCode] = useState([]);
    const [videoembedcode, setVideoEmbedCode] = useState([]);
    const [nearby, setNearBy] = useState([]);
    const [sellername, setSellerName] = useState([]);
    const [selleremail, setSellerEmail] = useState([]);
    const [sellerphone, setSellerPhone] = useState([]);
  
    const [zipcode, setZipCode] = useState([]);
    const [reranumber, setReraNumber] = useState([]);
  
    const [metatitle, setMetatitle] = useState([]);
    const [metadescription, setMetaDescription] = useState([]);
  
    const [featuredimage, setFeaturedImage] = useState(null);
    const [siteplan, setSitePlan] = useState(null);
  
    // upload profile
    const uploadFeaturedImage = (e) => {
        setFeaturedImage(e.target.files[0]);
    };
    const uploadSitePlan = (e) => {
      // alert("test")
        setSitePlan(e.target.files[0]);
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
      const filter = {
    limit: 1000,
    page:  1
  }
      try {
        const [countryRes, constRes, furnRes, catRes, amenityRes, builderRes] = await Promise.all([
          getCountryTableData(),
          getConstructionstatusTableData(),
          getFurnishingstatusTableData(),
          getCategoryTableData(filter),
          getAmenityTableData(filter),
          getBuilderTableData(filter),
        ]);
  
        setCountries(countryRes || []);
        setConstructionstatus(constRes || []);
        setFurnishingstatus(furnRes || []);
        setCategories(catRes.items || []);
        setAmenities(amenityRes.item || []);
        setBuilders(builderRes.items || []);
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
  // --- Submit ---
  const addProperty = async (e) => {
   
    e.preventDefault();
    const newErrors = {};
    
    const requiredFields = [
      { key: "title", value: title, name: "Title" },
      { key: "slug", value: slug, name: "Slug" },
      { key: "description", value: description, name: "Description" },
      { key: "price", value: price, name: "Price" },
      { key: "address", value: address, name: "Address" },
      { key: "country", value: selectedCountry, name: "Country" },
      { key: "state", value: selectedState, name: "State" },
      { key: "city", value: selectedCity, name: "City" },
      { key: "location", value: selectedLocation, name: "Location" },
      { key: "selectedCategory", value: selectedCategory, name: "Category" },
      { key: "selectedPropertytype", value: selectedPropertytype, name: "Property Type" },
      { key: "selectedBuilder", value: selectedBuilder, name: "Builder" },
      { key: "selectedConstructionstatus", value: selectedConstructionstatus, name: "Construction Status" },
      { key: "selectedFurnishingstatus", value: selectedFurnishingstatus, name: "Furnishing Status" },
      // { key: "selectedAmenity", value: selectedAmenity, name: "Amenity" },
      { key: "selectedReraApproved", value: selectedReraApproved, name: "RERA Approved" },
      { key: "selectedFeaturedProperty", value: selectedFeaturedProperty, name: "Featured Property" },
      { key: "selectedHotProperty", value: selectedHotProperty, name: "Hot Property" },
    ];
  
    requiredFields.forEach(field => {
      
      if (!field.value || (typeof field.value === "string" && !field.value.trim())) {
        newErrors[field.key] = `${field.name} is required`;
      }
    });
  
    if (Object.keys(newErrors).length > 0) {
      return setError(newErrors);
    }
  
    try {
      const payload = {
        title, slug, description, price, address,
        countryid: selectedCountry,
        stateid: selectedState,
        cityid: selectedCity,
        locationid: selectedLocation,
        categoryid: selectedCategory,
        propertytypeid: selectedPropertytype,
        builderid: selectedBuilder,
        constructionstatus: selectedConstructionstatus,
        furnishingstatus: selectedFurnishingstatus,
        amenityid: selectedAmenity,
        reraapproved: selectedReraApproved,
        featuredproperty: selectedFeaturedProperty,
        hotproperty: selectedHotProperty,
        propertyid, areasize, sizeprefix,
        bedrooms, bathrooms, garages, garagessize,
        yearbuild, mapembedcode, videoembedcode,
        nearby, sellername, selleremail, sellerphone, 
        reranumber, zipcode, metatitle, metadescription,featuredimage,siteplan,propertySelectedImgs
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
  
  
      const res = await addPropertyAPI(formData);
      // router.push("/cmswegrow/my-properties");
      alert(res.message);
  
      // Reset fields and errors
      setError({});
      // (Reset other fields here if needed)
    } catch (err) {
      setError({ general: err.message || "Something went wrong" });
    }
  };
  
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Inner Page Breadcrumb --> */}
      <BreadCrumbBanner />

      {/* <!-- About Text Content --> */}
      <section className="about-section">
        <div className="container">
         

         <form onSubmit={addProperty} className="row">
               <div className="col-lg-5">
                 <div className="my_profile_setting_input form-group">
                   <label htmlFor="propertyTitle">Property Title</label>
                   <input type="text" className="form-control"  id="propertyTitle" value={title} onChange={(e) => setTitle(e.target.value)}  placeholder="Enter property Title"/>
                   {error.title && <span className="text-danger">{error.title}</span>}
         
                 </div>
               </div>
                 <div className="col-lg-4">
                   <div className="my_profile_setting_input form-group">
                     <label htmlFor="propertySlug">Property Slug (SEO URL)</label>
                     <input type="text" className="form-control"  id="propertySlug" value={slug} onChange={(e) => setSlug(e.target.value)}  placeholder="Enter property slug"/>
                     {error.slug && <span className="text-danger">{error.slug}</span>}
                   </div>
                 </div>
                
                 <div className="col-lg-3 col-xl-3">
                 <div className="my_profile_setting_input form-group">
                   <label htmlFor="propertyPrice">Price</label>
                   <input type="text" className="form-control"  id="propertyPrice" value={price} onChange={(e) => setPrice(e.target.value)}  placeholder="Enter property price"/>
                   {error.price && <span className="text-danger">{error.price}</span>}
                  
                 </div>
               </div>
               {/* End .col */}
                 <div className="col-lg-12">
                   <div className="my_profile_setting_textarea form-group">
                     <label htmlFor="propertyDescription">Description</label>
                     <textarea id="propertyDescription" className="form-control" rows="7"  value={description} onChange={(e) => setDescription(e.target.value)}  placeholder="Enter property description"></textarea>
                     {error.description && <span className="text-danger">{error.description}</span>}
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
                     {error.selectedCategory && <span className="text-danger">{error.selectedCategory}</span>}
                 </div>
               </div>
               <div className="col-lg-6 col-xl-6">
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
               </div>
               <div className="col-lg-6 col-xl-6">
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
               </div>
               {/* End .col */}
         
               <div className="col-lg-6 col-xl-6">
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
               </div>
               
               {/* End .col */}
         
               <div className="col-lg-6">
                 <div className="my_profile_setting_input form-group">
                   <label htmlFor="propertyReraNumber">Rera Number</label>
                  
                   <input type="text"
                       className="form-control"
                       id="propertyReraNumber"
                       value={reranumber}
                       onChange={(e) => setReraNumber(e.target.value)}/>
                 </div>
               </div>
         
               
         
              
               
                             <div className="row">
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
                  
                   <input type="text"
                       className="form-control"
                       id="propertyZipcode"
                       value={zipcode}
                       onChange={(e) => setZipCode(e.target.value)}/>
                 </div>
               </div>
                 <div className="col-lg-12">
                 <div className="my_profile_setting_input form-group">
                   <label htmlFor="propertyzipcode">Address</label>
                  
                   <input type="text"
                       className="form-control"
                       id="propertyAddress"
                       value={address}
                       onChange={handleAddressChange}/>
                 </div>
               </div>
                             </div>
                             <div className=" mt30 ">
                             <div className="col-lg-12">
                               <h3 className="mb30">Detailed Information</h3>
                             </div>
                             <div className="row">
               <div className="col-lg-6 col-xl-4">
                 <div className="my_profile_setting_input form-group">
                   <label htmlFor="propertyId">Property ID</label>
                   <input type="text"
                       className="form-control"
                       id="propertyId"
                       value={propertyid}
                       onChange={(e) => setPropertyid(e.target.value)} />
                 </div>
               </div>
               {/* End .col */}
         
               <div className="col-lg-6 col-xl-4">
                 <div className="my_profile_setting_input form-group">
                   <label htmlFor="propertyAreaSize">Area Size</label>
                   <input type="text"
                       className="form-control"
                       id="propertyAreaSize"
                       value={areasize}
                       onChange={(e) => setAreasize(e.target.value)} />
                 </div>
               </div>
               {/* End .col */}
         
               <div className="col-lg-6 col-xl-4">
                 <div className="my_profile_setting_input form-group">
                   <label htmlFor="sizePrefix">Size Prefix</label>
                   <input type="text"
                       className="form-control"
                       id="sizePrefix"
                       value={sizeprefix}
                       onChange={(e) => setSizePrefix(e.target.value)} />
                 </div>
               </div>
               {/* End .col */}
         
              
         
               <div className="col-lg-6 col-xl-4">
                 <div className="my_profile_setting_input form-group">
                   <label htmlFor="bedRooms">Bedrooms</label>
                   <input type="text"
                       className="form-control"
                       id="bedRooms"
                       value={bedrooms}
                       onChange={(e) => setBedRooms(e.target.value)} />
                 </div>
               </div>
               {/* End .col */}
         
               <div className="col-lg-6 col-xl-4">
                 <div className="my_profile_setting_input form-group">
                   <label htmlFor="bathRooms">Bathrooms</label>
                   <input type="text"
                       className="form-control"
                       id="bathRooms"
                       value={bathrooms}
                       onChange={(e) => setBathRooms(e.target.value)} />
                 </div>
               </div>
               {/* End .col */}
         
               <div className="col-lg-6 col-xl-4">
                 <div className="my_profile_setting_input form-group">
                   <label htmlFor="garages">Parkings</label>
                   <input type="text"
                       className="form-control"
                       id="garages"
                       value={garages}
                       onChange={(e) => setGarages(e.target.value)} />
                 </div>
               </div>
               {/* End .col */}
         
               <div className="col-lg-6 col-xl-4">
                 <div className="my_profile_setting_input form-group">
                   <label htmlFor="garagesSize">Parkings description</label>
                   <input type="text"
                       className="form-control"
                       id="garagesSize"
                       value={garagessize}
                       onChange={(e) => setGaragesSize(e.target.value)} />
                 </div>
               </div>
               {/* End .col */}
         
               <div className="col-lg-6 col-xl-4">
                 <div className="my_profile_setting_input form-group">
                   <label htmlFor="yearBuild">Possession Year</label>
                   <input type="text"
                       className="form-control"
                       id="yearBuild"
                       value={yearbuild}
                       onChange={(e) => setYearBuild(e.target.value)} />
                 </div>
               </div>
               {/* End .col */}
               <div className="col-lg-12">
                 <div className="my_profile_setting_textarea">
                   <label htmlFor="mapEmbedCode">Map Embed code </label>
                   <textarea id="mapEmbedCode" className="form-control" rows="7"  value={mapembedcode} onChange={(e) => setMapEmbedCode(e.target.value)}  placeholder="Enter Map Embed code"></textarea>
                 </div>
               </div>
               {/* End .col */}
               <div className="col-lg-12">
                 <div className="my_profile_setting_textarea">
                   <label htmlFor="videoEmbedCode">Video Embed code </label>
                   <textarea id="videoEmbedCode" className="form-control" rows="7"  value={videoembedcode} onChange={(e) => setVideoEmbedCode(e.target.value)}  placeholder="Enter Video Embed code"></textarea>
                 </div>
               </div>
               {/* End .col */}
         
               <div className="col-lg-12">
                 <div className="my_profile_setting_textarea">
                   <label htmlFor="nearBy">Near By </label>
                   <textarea id="nearBy" className="form-control" rows="7"  value={nearby} onChange={(e) => setNearBy(e.target.value)}  placeholder="Enter Near By"></textarea>
                 </div>
               </div>
         
               <div className="col-xl-12">
                 <h4 className="mb10">Amenities</h4>
               </div>
               <div className="col-xxs-12 col-sm col-lg col-xl">
                 <ul className="ui_kit_checkbox selectable-list row">
                 {amenities.map((amenity, index) => (
           <li key={amenity._id} className="col-xxs-6 col-sm col-lg col-xl">
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
         ))}
         
                   {/* End li */}
         
                   
                   {/* End li */}
                 </ul>
               </div>
               {/* End .col */}
         
               <div className=" mt30 ">
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
               </div>
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
                                 accept="image/png, image/gif, image/jpeg"
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
                                     <i className="flaticon-download"></i> Upload featured image{" "}
                                 </span>
                             </label>
                         </div>
                         <p>*minimum 260px x 260px</p>
                     </div>
                     <div className="col-lg-6">
                 <div htmlFor="SitePlan">Site Plan</div>
                         <div className="wrap-custom-file">
                       
                             <input
                                 type="file"
                                 id="SitePlan"
                                 accept="image/png, image/gif, image/jpeg"
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
                     accept="image/png, image/gif, image/jpeg"
                   />
                   <div className="icon">
                     <span className="flaticon-download"></span>
                   </div>
                   <p>Drag and drop images here</p>
                 </div>
               </div>
               {/* End .col */}
               </div>
               <div className=" mt30 ">
                             <div className="col-lg-12">
                               <h3 className="mb30">Meta Information</h3>
                             </div>
                             <div className="row">
                             <div className="col-lg-12">
                 <div className="my_profile_setting_input form-group">
                   <label htmlFor="propertyMetatitle">Meta Title</label>
                  
                   <input type="text"
                       className="form-control"
                       id="propertyMetatitle"
                       value={metatitle}
                       onChange={(e) => setMetatitle(e.target.value)} />
                 </div>
               </div>
               <div className="col-lg-12">
                   <div className="my_profile_setting_textarea form-group">
                     <label htmlFor="propertyMetaDescription">Meta Description</label>
                     <textarea id="propertyMetaDescription" className="form-control" rows="7"  value={metadescription} onChange={(e) => setMetaDescription(e.target.value)}  placeholder="Enter meta description"></textarea>
                     {error.metadescription && <span className="text-danger">{error.metadescription}</span>}
                   </div>
                   
                 </div>
                 
         
               {/* End .col */}
               </div>
               </div>
               </div>
                           </div>
                           
               <div className="col-xl-12">
                 <div className="my_profile_setting_input">
                   <button className="btn btn1 float-start">Back</button>
                   <button className="btn btn2 float-end" type="submit" >Submit</button>
                 </div>
               </div>
               </form>
        </div>
      </section>

     

      {/* <!-- Start Call to Action --> */}
      <section className="start-partners bgc-thm pt50 pb50">
        <div className="container">
          <CallToAction />
        </div>
      </section>

      {/* <!-- Our Footer --> */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
          <Footer showBox={showBox} setShowBox={setShowBox} />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      <section className="footer_middle_area pt15 pb15">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default index;
