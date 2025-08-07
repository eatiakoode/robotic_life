'use client'
import Categorie from "./Categorie";
import FeaturedListings from "./FeaturedListings";
import FeatureProperties from "./FeatureProperties";
import FilteringItem from "./FilteringItem";
import { countPropertiesByType } from "@/api/frontend/propertytype";
import { getPropertyFeatureData } from "@/api/frontend/property";
import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

const SidebarListing = ({ setKeyword, setCity,setCategory, setPropertytype , keyword, city,category, propertytype,setPropertytypes,propertytypes,location }) => {
   
    const [propertytypesidebar, setPropertyTypeSidebar] = useState([]);
  
    const fetchPropertyType = async () => {
      const data = await countPropertiesByType();
      
      setPropertyTypeSidebar(data.data);
    };
    const [properties, setProperties] = useState([]);

const fetchProperties = async () => {
  const data = await getPropertyFeatureData();

  setProperties(data);
};
    useEffect(() => {
      fetchPropertyType();
      fetchProperties();
    }, []); 
    return (
        <div className="sidebar_listing_grid1">
            <div className="sidebar_listing_list">
                <div className="sidebar_advanced_search_widget">
                    {/* <FilteringItem /> */}
                    <FilteringItem 
  keyword={keyword} setKeyword={setKeyword}
  city={city} setCity={setCity}
  category={category} setCategory={setCategory}
  propertytype={propertytype} setPropertytype={setPropertytype} setPropertytypes={setPropertytypes} propertytypes={propertytypes} location={location}
/>

                </div>
            </div>
            {/* End .sidebar_listing_list */}

            <div className="terms_condition_widget">
                <h4 className="title">Featured Properties</h4>
                <div className="sidebar_feature_property_slider">
                    <FeatureProperties  properties={properties}/>
                </div>
            </div>
            {/* End .Featured Properties */}

            <div className="terms_condition_widget">
                <h4 className="title">Property Type</h4>
                <div className="widget_list">
                    <ul className="list_details">
                        <Categorie  propertytypesidebar={propertytypesidebar}/>
                    </ul>
                </div>
            </div>
            {/* End .Categories Property */}

            <div className="sidebar_feature_listing">
                <h4 className="title">Recently Viewed</h4>
                <FeaturedListings  properties={properties}/>
            </div>
            {/* End .Recently Viewed */}
        </div>
    );
};

export default SidebarListing;
