'use client';

import Image from "next/image";
import { useState } from "react";
const PropertyFeatures = ({property}) => {
  const [showAll, setShowAll] = useState(false);

  // Safety check for array
  const amenities = property?.amenityid || [];

  // Split into visible and hidden items
  const visibleAmenities = amenities.slice(0, 12);
  const hiddenAmenities = amenities.slice(12);
  // const propertyFeatures = [
  //   {
  //     id: 1,
  //     list: ["Air Conditioning", "Barbeque", "Dryer", "Gym", "Laundry"],
  //   },
  //   {
  //     id: 2,
  //     list: ["Lawn", "Microwave", "Outdoor Shower", "Refrigerator", "Sauna"],
  //   },
  //   {
  //     id: 3,
  //     list: ["Swimming Pool", "TV Cable", "Washer", "WiFi", "Window Coverings"],
  //   },
  // ];
  return (
    <>
      {/* {property.amenityid?.map((item) => ( */}
        <div className="" >
          <ul className="order_list list-inline-item row">
            
             {(showAll ? amenities : visibleAmenities).map((val, i) => (
              <li className="col-sm-6 col-md-6 col-lg-4" key={i}>
                {/* <span className="flaticon-tick"></span> */}
                 <div className="thumb">
                  <Image
                    // src="/assets/images/property/gym.svg"
                    // alt="pc1.jpg"
                    src={
                      val.image
                        ? `${process.env.NEXT_PUBLIC_API_URL}${val.image}`
                        : `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/property/thumbnail.svg`
                    }
                    alt={val.title}
                    unoptimized
                    fill
                    className="amenity-icon"
                    />
                </div>
                {val?.title}
              </li>
            ))}
          </ul>

          {hiddenAmenities.length > 0 && (
          <div className="mt-3">
            <button
              className="text-thm fz14" style={{border: "none", backgroundColor: "transparent", padding: 0}}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "Show More"}
              <span className={`flaticon-download-1 fz12 ps-1 transition ${showAll ? 'rotate-icon' : ''}`}></span>
            </button>
          </div>
          )}
        </div>
      {/* ))} */}
    </>
  );
};

export default PropertyFeatures;
