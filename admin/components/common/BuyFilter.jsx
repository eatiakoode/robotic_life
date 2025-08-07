'use client'

// import { useState } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// import { getCityWithPropertyPage} from "@/api/frontend/city";

const BuyFilter = ({ className = "" ,cities}) => {
  
  const [activeAccordion, setActiveAccordion] = useState(null);
  const router = useRouter();

  const toggleAccordion = (city) => {
    setActiveAccordion(activeAccordion === city ? null : city);
  };

  const handleRedirect = (place) => {
    // Redirect with query or state as needed
    router.push(`/propertypage/${(place)}`);
  };

  return (
    <div className={`accordion-filter ${className}`}>
      {/* {Object.entries(cities).map(([city, locations]) => ( */}
      {/* {cities.map(([city, locations]) => ( */}
      {cities?.map((city) => (
        
        <div key={city._id} className="accordion-item mb-2 border">
          {/* <p
            className="accordion-header bg-light p-3 cursor-pointer "
            onClick={() => toggleAccordion(city)}
          >
            {city}
          </p> */}
          <p
              className={`accordion-header p-3 cursor-pointer ${
                activeAccordion === city._id ? "active-header" : ""
              }`}
              onClick={() => toggleAccordion(city._id)}
            >
              Find Properties in {city.title}
            </p>

          {activeAccordion === city._id && (
            <div className="accordion-body p-3">
              <ul className="list-unstyled">
                {city.propertypages.map((place, idx) => (
                  <li
                    key={idx}
                    className="mb-2 cursor-pointer"
                    onClick={() => handleRedirect(place.slug)}
                    style={{ cursor: "pointer" }}
                  >
                  {place.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BuyFilter;
