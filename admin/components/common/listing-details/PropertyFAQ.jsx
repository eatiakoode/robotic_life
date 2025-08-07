// "use client";

// import { useState, useEffect } from "react";

const PropertyFAQ = ({ faqs }) => {
  
  return (
    <div className="accordion" id="accordionExample">
      {faqs?.slice(0, 38).map((singleItem,index) => (
      <div className="card floor_plan" key={index}>
        <div id={`heading${index}`}>
          <h2 className="mb-0">
            <button
              className="btn btn-link accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index}`}
              aria-expanded="false"
              aria-controls={`collapse${index}`}
            >
             {singleItem.title}
            </button>
          </h2>
        </div>
        <div
          id={`collapse${index}`}
          className="collapse"
          aria-labelledby={`heading${index}`}
          data-bs-parent="#accordionExample"
        >
          <div className="card-body text-center">
            
          {singleItem.description}
          </div>
        </div>
      </div>
       ))}
      
    </div>
  );
};

export default PropertyFAQ;
