'use client'
import Categories from "./Categories";
import FeaturedListings from "../listing/FeaturedListings";
import SearchBox from "./SearchBox";
import TagList from "./TagList";
import { countPropertiesByType } from "@/api/frontend/propertytype";
import { getPropertyFeatureData } from "@/api/frontend/property";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BlogSidebar = () => {
   const [propertytype, setPropertyType] = useState([]);
          const router = useRouter();
        
          const fetchPropertyType = async () => {
            const data = await countPropertiesByType();
            
            setPropertyType(data.data);
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
    <div className="blog-sidebar_widgets">
      {/* <div className="sidebar_search_widget">
        <div className="blog_search_widget">
          <SearchBox />
        </div>
      </div> */}
      {/* End .sidebar_search_widget */}

      <div className="terms_condition_widget">
        <h4 className="title">Property Type</h4>
        <div className="widget_list">
          <Categories propertytype={propertytype}/>
        </div>
      </div>
      {/* End .Categories widget */}

      <div className="sidebar_feature_listing">
        <h4 className="title">Featured Listings</h4>
        <FeaturedListings properties={properties}/>
      </div>
      {/* End .sidebar_feature_listing */}

      {/* <div className="blog_tag_widget">
        <h4 className="title">Tags</h4>
        <TagList />
      </div> */}
      {/* End .blog_tag_widget */}
    </div>
  );
};

export default BlogSidebar;
