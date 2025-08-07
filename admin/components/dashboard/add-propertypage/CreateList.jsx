"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCityByStateTableData } from "../../../api/city";

import { getCountryTableData } from "../../../api/country";
import { getStateByCountryTableData } from "../../../api/state";
import { getLocationByCityTableData } from "../../../api/location";
import { getCategoryTableData } from "../../../api/category";
import { getPropertytypeByCategoryTableData} from "../../../api/propertytype";
import { getAmenityTableData } from "../../../api/amenity";
import { getBuilderTableData } from "../../../api/builder";
import { getConstructionstatusTableData } from "../../../api/constructionstatus";
import { getFurnishingstatusTableData } from "../../../api/furnishingstatus";
import { addPropertypageAPI } from "../../../api/propertypage";
import { toast } from 'react-toastify';


const CreateList = () => {
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



const [constructionstatus, setConstructionstatus] = useState([]);
  const [selectedConstructionstatus, setSelectedConstructionstatus] = useState("");
  const [furnishingstatus, setFurnishingstatus] = useState([]);
  const [selectedFurnishingstatus, setSelectedFurnishingstatus] = useState("");  


  const [metatitle, setMetatitle] = useState([]);
  const [metadescription, setMetaDescription] = useState([]);
const router = useRouter();
  const [isSubmitting, setisSubmitting] = useState("");
  
// --- Fetch Initial Data ---
useEffect(() => {
  const fetchData = async () => {
    try {
      const filter = {
    limit: 1000,
    page:  1
  }
      const [countryRes, constRes, furnRes, catRes, builderRes] = await Promise.all([
        getCountryTableData(),
        getConstructionstatusTableData(),
        getFurnishingstatusTableData(),
        getCategoryTableData(filter),
        getBuilderTableData(filter),
      ]);

      setCountries(countryRes || []);
      setConstructionstatus(constRes || []);
      setFurnishingstatus(furnRes || []);
      setCategories(catRes.items || []);
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

// --- Submit ---
const addPropertypage = async (e) => {
  e.preventDefault();
  setisSubmitting(true)
  const newErrors = {};

  const requiredFields = [
    { key: "title", value: title, name: "Title" },
    { key: "slug", value: slug, name: "Slug" },
    { key: "description", value: description, name: "Description" },
    { key: "country", value: selectedCountry, name: "Country" },
    { key: "state", value: selectedState, name: "State" },
    { key: "city", value: selectedCity, name: "City" },
    { key: "location", value: selectedLocation, name: "Location" },
    { key: "selectedCategory", value: selectedCategory, name: "Category" },
    { key: "selectedPropertytype", value: selectedPropertytype, name: "Property Type" },
    { key: "selectedBuilder", value: selectedBuilder, name: "Builder" },
    { key: "selectedConstructionstatus", value: selectedConstructionstatus, name: "Construction Status" },
    { key: "selectedFurnishingstatus", value: selectedFurnishingstatus, name: "Furnishing Status" }
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
      title, slug, description,
      countryid: selectedCountry,
      stateid: selectedState,
      cityid: selectedCity,
      locationid: selectedLocation,
      categoryid: selectedCategory,
      propertytypeid: selectedPropertytype,
      builderid: selectedBuilder,
      constructionstatus: selectedConstructionstatus,
      furnishingstatus: selectedFurnishingstatus,
       metatitle, metadescription
    };
    
    
    const formData = new FormData();
    
    // Loop over each key-value pair in the payload
    for (const key in payload) {
      if (payload[key] !== undefined && payload[key] !== null) {
        formData.append(key, payload[key]);
      }
    }


    const data = await addPropertypageAPI(payload);
    // router.push("/cmswegrow/my-propertypage");
    toast.success(data.message);
   
    if(data.status=="success"){
         setTimeout(() => {
          router.push("/cmswegrow/my-propertypage");
          }, 1500); 
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
    <form onSubmit={addPropertypage} className="row">
      <div className="col-lg-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Property Title</label>
          <input type="text" className="form-control"  id="propertyTitle" value={title} onChange={(e) => setTitle(e.target.value)}  placeholder="Enter property Title"/>
          {error.title && <span className="text-danger">{error.title}</span>}

        </div>
      </div>
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="propertySlug">Property Slug (SEO URL)</label>
            <input type="text" className="form-control"  id="propertySlug" value={slug} onChange={(e) => setSlug(e.target.value)}  placeholder="Enter property slug"/>
            {error.slug && <span className="text-danger">{error.slug}</span>}
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
                  
      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmswegrow/my-dashboard'}>Back</button>
          <button type="submit" className="btn btn2 float-end" disabled={isSubmitting} >{isSubmitting ? 'Sending...' : 'Submit'}</button>
        </div>
      </div>
      </form>
    </>
  );
};

export default CreateList;
