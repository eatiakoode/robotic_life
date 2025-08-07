"use client";

import { useState, useEffect } from "react";
import {
  addKeyword,
  // addLocation,
} from "../../features/properties/propertiesSlice";
// import PricingRangeSlider from "./PricingRangeSlider";
import CheckBoxFilter from "./CheckBoxFilter";
import GlobalSelectBox from "./GlobalSelectBox";
import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";

import { getCityTableData,getCityByStateTableData } from "./../../api/frontend/city";
import { getPropertytypeByCategoryTableData} from "../../api/frontend/propertytype.ts";

const GlobalFilter = ({ className = "" }) => {
  // const dispatch = useDispatch();
  
  const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [propertytypes, setPropertytypes] = useState([]);
    const [selectedPropertytype, setSelectedPropertytype] = useState("");
    const [category, setCategory] = useState("67e67294759f85d6bf7a131a");
    const [keyword, setKeyword] = useState("");
    
    
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
      const fetchPropertytypes = async () => {
        try {
          // const value="67e67294759f85d6bf7a131a"
          const response = await getPropertytypeByCategoryTableData(category);         
  
          setPropertytypes(response.data || []);
        } catch (err) {
          console.error("Error fetching Country:", err);
        }
      };
  
      fetchPropertytypes();
      }, []);
      
  const router = useRouter()
  // submit handler
  // const submitHandler = () => {
  //   var link="?cat="+category
  //   if(addKeyword){
  //     link +="&keyword="+addKeyword
  //   }
  //   if(selectedCity){
  //     link +="&city="+selectedCity
  //   }
  //   if(selectedPropertytype){
  //     link +="&propertytype="+selectedPropertytype
  //   }
  //   router.push("/property-list"+link);
  // };
  const submitHandler = () => {
    const query = {
      cat: category,
      ...(keyword && { keyword }),
      ...(selectedCity && { city: selectedCity }),
      ...(selectedPropertytype && { propertytype: selectedPropertytype }),
    };
  
    const queryString = new URLSearchParams(query).toString();
    router.push(`/property-list?${queryString}`);
  };
  
 

  return (
    <div className={`home1-advnc-search ${className}`}>
      <ul className="h1ads_1st_list mb0">
        <li className="list-inline-item">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Find your dream home — start typing..."
              // onChange={(e) => dispatch(addKeyword(e.target.value))}
              onChange={(e) => setKeyword(e.target.value)} 
            />
          </div>
        </li>
        {/* End li */}

        <li className="list-inline-item">
          <div className="search_option_two">
            <div className="candidate_revew_select">
            <select
              id="citySelect"
              className="selectpicker w100 form-select show-tick"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)} 
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
              {/* <select className="selectpicker w100 form-select show-tick">
                <option value="">Select City</option>
                <option value="1">Gurgaon</option>
                                        <option value="4">Sohna</option>
                                        <option value="2">New Delhi</option>
                                        <option value="3">Greater Noida</option>
              </select> */}
            </div>
          </div>
        </li>

        {/* <li className="list-inline-item">
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select className="selectpicker w100 form-select show-tick">
                <option value="">Select Location</option>
                <option value="1">Sohna Road</option>
                <option value="2">MG Road</option>
                <option value="3">Golf course road</option>
                <option value="4">Golf Course Ext. Road</option>
                <option value="5">Dwarka Expressway</option>
                <option value="6">NH 8</option>
                <option value="7">Faridabad Gurgaon Road</option>
                <option value="8">New Gurgaon</option>
                <option value="9">Southern Peripheral Road</option>
                <option value="10">Old Gurgaon</option>
                <option value="11">Rest of Gurgaon</option>
              </select>
            </div>
          </div>
        </li> */}

        <li className="list-inline-item">
          <div className="search_option_two">
            <div className="candidate_revew_select">
            <select
              id="citySelect"
              className="selectpicker w100 form-select show-tick"
              value={selectedPropertytype}
              onChange={(e) => setSelectedPropertytype(e.target.value)} 
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Property Type --</option>
              {propertytypes.map((propertytype) => (
                <option key={propertytype._id} value={propertytype._id}>
                  {propertytype.title}
                </option>
              ))}
            </select>
              {/* <select className="selectpicker w100 form-select show-tick">
                <option value="">Property Type</option>
                <option>High Rise</option>
                <option>Low Rise</option>
                <option>Plots</option>
                <option>Villas</option>
              </select> */}
            </div>
          </div>
        </li>
        {/* End li */}

        
        {/* <li className="list-inline-item">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Location"
              onChange={(e) => dispatch(addLocation(e.target.value))}
            />
            <label>
              <span className="flaticon-maps-and-flags"></span>
            </label>
          </div>
        </li> */}
        {/* End li */}

        {/* <li className="list-inline-item">
          <div className="small_dropdown2">
            <div
              id="prncgs"
              className="btn dd_btn"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <span>Price</span>
              <label htmlFor="InputEmail2">
                <span className="fa fa-angle-down"></span>
              </label>
            </div>
            <div className="dd_content2 dropdown-menu">
              <div className="pricing_acontent">
                <PricingRangeSlider />
              </div>
            </div>
          </div>
        </li> */}
        {/* End li */}

        {/* <li className="custome_fields_520 list-inline-item">
          <div className="navbered">
            <div className="mega-dropdown ">
              <span
                className="dropbtn"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                Advanced <i className="flaticon-more pl10 flr-520"></i>
              </span>

              <div className="dropdown-content dropdown-menu ">
                <div className="row p15">
                  <div className="col-lg-12">
                    <h4 className="text-thm3 mb-4">Amenities</h4>
                  </div>

                  <CheckBoxFilter />
                </div>
               

                <div className="row p15 pt0-xsd">
                  <div className="col-lg-12 col-xl-12">
                    <ul className="apeartment_area_list mb0">
                      <GlobalSelectBox />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li> */}
        {/* End li */}

        <li className="list-inline-item">
          <div className="search_option_button">
            <button
              onClick={submitHandler}
              type="submit"
              className="btn btn-thm"
            >
              Search
            </button>
          </div>
        </li>
        {/* End li */}
      </ul>
    </div>
  );
};

export default GlobalFilter;
