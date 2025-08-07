'use client'

import { useEffect, useRef, useState } from "react";
import ContactWithAgent from "../common/agent-view/ContactWithAgent";
// import Categorie from "../common/listing/Categorie";
import ListingCreator from "../common/listing/ListingCreator";
// import FeaturedListings from "../common/listing/FeaturedListings";
// import FeatureProperties from "../common/listing/FeatureProperties";

const Sidebar = ({property}) => {
  const sidebarRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sidebarRef.current) return;
      const { top } = sidebarRef.current.getBoundingClientRect();
      setIsSticky(top <= 100); // Adjust 100 if needed (based on header height)
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={sidebarRef}
      className={`transition-all duration-300 ${
        isSticky ? "sticky top-80 w-[300px]" : "relative"
      }`}
    >
      <div className="sidebar_listing_list">
        <div className="sidebar_advanced_search_widget">
          <div className="sl_creator">
            <h4 className="mb25">Request a Quote</h4>
            <ListingCreator property={property} />
          </div>
          <ContactWithAgent property={property}/>
        </div>
      </div>

      {/* <div className="terms_condition_widget">
        <h4 className="title">Featured Properties</h4>
        <div className="sidebar_feature_property_slider">
          <FeatureProperties />
        </div>
      </div> */}

      {/* <div className="terms_condition_widget">
        <h4 className="title">Categories Property</h4>
        <div className="widget_list">
          <ul className="list_details">
            <Categorie />
          </ul>
        </div>
      </div> */}

      {/* <div className="sidebar_feature_listing">
        <h4 className="title">Recently Viewed</h4>
        <FeaturedListings />
      </div> */}
    </div>
  );
};

export default Sidebar;
