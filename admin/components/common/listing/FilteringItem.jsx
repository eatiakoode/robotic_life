'use client'

import { useEffect,useState } from "react";
// import {  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCityTableData } from "@/api/frontend/city";
import { getCategoryTableData } from "@/api/frontend/category";
import { getPropertytypeByCategoryTableData} from "@/api/frontend/propertytype";

import {
  addKeyword,
  addCity,
  addCategory,
  addPropertytype,
} from "../../../features/properties/propertiesSlice";
import { v4 as uuidv4 } from "uuid";


const FilteringItem = ({ setKeyword, setCity,setCategory, setPropertytype , keyword, city,category, propertytype,setPropertytypes,propertytypes, location }) => {

 
  const [cities, setCities] = useState([]);
  
  
  
  const [categories, setCategories] = useState([]);
  

  // input state
  const [getKeyword, setGetKeyword] = useState(keyword);
  const [getCity, setGetCity] = useState(city);
  
  const [getPropertytype, setGetPropertytype] = useState(propertytype);
  
  const [getCategory, setGetCategory] = useState(category);
  

  // advanced state
  const [getAdvanced, setAdvanced] = useState([
    { id: uuidv4(), name: "Air Conditioning" },
    { id: uuidv4(), name: "Barbeque" },
    { id: uuidv4(), name: "Gym" },
    { id: uuidv4(), name: "Microwave" },
    { id: uuidv4(), name: "TV Cable" },
    { id: uuidv4(), name: "Lawn" },
    { id: uuidv4(), name: "Refrigerator" },
    { id: uuidv4(), name: "Swimming Pool" },
    { id: uuidv4(), name: "WiFi" },
    { id: uuidv4(), name: "Sauna" },
    { id: uuidv4(), name: "Dryer" },
    { id: uuidv4(), name: "Washer" },
    { id: uuidv4(), name: "Laundry" },
    { id: uuidv4(), name: "Outdoor Shower" },
    { id: uuidv4(), name: "Window Coverings" },
  ]);

  const dispath = useDispatch();



  // keyword
  useEffect(() => {
    dispath(addKeyword(getKeyword));
  }, [dispath, getKeyword]);

  useEffect(() => {
    dispath(addCity(getCity));
  }, [dispath, getCity]);

  useEffect(() => {
    dispath(addCategory(getCategory));
  }, [dispath, getCategory]);

  useEffect(() => {
    dispath(addPropertytype(getPropertytype));
  }, [dispath, getPropertytype]);
  
  // clear filter
  const clearHandler = () => {
    clearAllFilters();
  };

  const clearAllFilters = () => {
    setKeyword("");
    setCity("");
    setPropertytype("")
    setCategory("")
    clearAdvanced();
  };

  // clear advanced
  const clearAdvanced = () => {
    const changed = getAdvanced.map((item) => {
      item.isChecked = false;
      return item;
    });
    setAdvanced(changed);
  };

  // add advanced
  const advancedHandler = (id) => {
    const data = getAdvanced.map((feature) => {
      if (feature.id === id) {
        if (feature.isChecked) {
          feature.isChecked = false;
        } else {
          feature.isChecked = true;
        }
      }
      return feature;
    });

    setAdvanced(data);
  };
useEffect(() => {
      const fetchCities = async () => {
        try {
          const response = await getCityTableData();
          setCities(response.data || []);
        } catch (err) {
          console.error("Error fetching Country:", err);
        }
      };
  
      fetchCities();

       const fetchCategories = async () => {
            try {
              const response = await getCategoryTableData();
              
      
              setCategories(response || []);
            } catch (err) {
              console.error("Error fetching Category:", err);
            }
          };
      
          fetchCategories();
      }, []);
      const handleCategoryChange = async (e) => {
        
        const value = e.target.value;
        setCategory(value);
        try {
          const res = await getPropertytypeByCategoryTableData(value);
          setPropertytypes(res.data || []);
        } catch (err) {
          console.error("Error fetching property types:", err);
        }
      };
      // useEffect(() => {
      //   setPropertytypes(propertytypes);
      // }, [propertytypes,setPropertytypes]); 
  return (
    <ul className="sasw_list mb0">
      <li className="search_area">
        <div className="form-group mb-3">
          {/* <input
            type="text"
            className="form-control"
            placeholder="keyword"
            value={getKeyword}
            onChange={(e) => setKeyword(e.target.value)}
          /> */}
          <input
        type="text"
        className="form-control"
        id="keywordSelect"
        name="keyword"
        placeholder="Search Your Properties"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
          <label>
            <span className="flaticon-magnifying-glass"></span>
          </label>
        </div>
      </li>
      {/* End li */}
      <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
          <select
              id="categorySelect"
              className="selectpicker form-select"
              value={category}
              onChange={handleCategoryChange}
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select Category --</option>
              {categories.map((categoryitem) => (
                <option key={categoryitem._id} value={categoryitem._id}>
                  {categoryitem.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </li>
      
      <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
          <select
              id="propertytypeSelect"
              className="selectpicker w100 form-select show-tick"
              value={propertytype}
              onChange={(e) => setPropertytype(e.target.value)} 
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Property Type --</option>
              {propertytypes?.map((propertytypeitem) => (
                <option key={propertytypeitem._id} value={propertytypeitem._id}>
                  {propertytypeitem.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </li> 
      <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
          <select
              id="citySelect"
              className="selectpicker w100 form-select show-tick"
              value={city}
              onChange={(e) => setCity(e.target.value)} 
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select City --</option>
              {cities.map((cityitem) => (
                <option key={cityitem._id} value={cityitem._id}>
                  {cityitem.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </li> 
      

      {/* <li className="search_area">
        <div className="form-group mb-3">
          <input
            type="search"
            className="form-control"
            id="exampleInputEmail"
            placeholder="Location"
            value={getLocation}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label htmlFor="exampleInputEmail">
            <span className="flaticon-maps-and-flags"></span>
          </label>
        </div>
      </li> */}
      {/* End li */}

      {/* <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => setStatus(e.target.value)}
              className="selectpicker w100 show-tick form-select"
              value={getStatus}
            >
              <option value="">Status</option>
              <option value="apartment">Apartment</option>
              <option value="bungalow">Bungalow</option>
              <option value="condo">Condo</option>
              <option value="house">House</option>
              <option value="land">Land</option>
              <option value="single family">Single Family</option>
            </select>
          </div>
        </div>
      </li> */}
      {/* End li */}

      {/* <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => setPropertiesType(e.target.value)}
              className="selectpicker w100 show-tick form-select"
              value={getPropertiesType}
            >
              <option value="">Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="bungalow">Bungalow</option>
              <option value="condo">Condo</option>
              <option value="house">House</option>
              <option value="land">Land</option>
              <option value="single family">Single Family</option>
            </select>
          </div>
        </div>
      </li> */}
      {/* End li */}

      {/* <li>
        <div className="small_dropdown2">
          <div
            id="prncgs2"
            className="btn dd_btn"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
          >
            <span>Price Range</span>
            <label htmlFor="prncgs2">
              <span className="fa fa-angle-down"></span>
            </label>
          </div>
          <div className="dd_content2 style2 dropdown-menu">
            <div className="pricing_acontent ">
              <PricingRangeSlider />
            </div>
          </div>
        </div>
      </li> */}
      {/* End li */}

      {/* <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => setBathroom(e.target.value)}
              className="selectpicker w100 show-tick form-select"
              value={getBathroom}
            >
              <option value="">Bathrooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
        </div>
      </li> */}
      {/* End li */}

      {/* <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => setBedroom(e.target.value)}
              className="selectpicker w100 show-tick form-select"
              value={getBedroom}
            >
              <option value="">Bedrooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
        </div>
      </li> */}
      {/* End li */}

      {/* <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => setGarages(e.target.value)}
              className="selectpicker w100 show-tick form-select"
              value={getGarages}
            >
              <option value="">Garages</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="other">Others</option>
            </select>
          </div>
        </div>
      </li> */}
      {/* End li */}

      {/* <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => setBuiltYear(e.target.value)}
              className="selectpicker w100 show-tick form-select"
              value={getBuiltYear}
            >
              <option value="">Possession Year</option>
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
            </select>
          </div>
        </div>
      </li> */}
      {/* End li */}

      {/* <li className="min_area list-inline-item">
        <div className="form-group mb-4">
          <input
            type="number"
            className="form-control"
            id="exampleInputName2"
            placeholder="Min Area"
            value={getAreaMin}
            onChange={(e) => setAreaMin(e.target.value)}
          />
        </div>
      </li> */}
      {/* End li */}

      {/* <li className="max_area list-inline-item">
        <div className="form-group mb-4">
          <input
            type="number"
            className="form-control"
            id="exampleInputName3"
            placeholder="Max Area"
            value={getAreaMax}
            onChange={(e) => setAreaMax(e.target.value)}
          />
        </div>
      </li> */}
      {/* End li */}

      {/* <li>
        <div id="accordion" className="panel-group">
          <div className="panel">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a
                  href="#panelBodyRating"
                  className="accordion-toggle link"
                  data-bs-toggle="collapse"
                  data-bs-parent="#accordion"
                >
                  <i className="flaticon-more"></i> Advanced features
                </a>
              </h4>
            </div>
            */}
            {/* End .panel-heading */}

           {/*  <div id="panelBodyRating" className="panel-collapse collapse">
              <div className="panel-body row">
                <div className="col-lg-12">
                  <ul className="ui_kit_checkbox selectable-list fn-400">
                    {getAdvanced?.map((feature) => (
                      <li key={feature.id}>
                        <div className="form-check custom-checkbox">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={feature.id}
                            value={feature.name}
                            checked={feature.isChecked || false}
                            onChange={(e) =>
                              dispath(addAmenities(e.target.value))
                            }
                            onClick={() => advancedHandler(feature.id)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={feature.id}
                          >
                            {feature.name}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li> */}
      {/* End li */}

      <li>
        <div className="search_option_button">
          <button
            onClick={clearHandler}
            type="button"
            className="btn btn-block btn-thm w-100"
          >
            Clear Filters
          </button>
        </div>
      </li>
      {/* End li */}
    </ul>
  );
};

export default FilteringItem;
