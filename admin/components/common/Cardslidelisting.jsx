'use client';

import React, { useState } from 'react';
import Slider from 'react-slick';

const nearbyPlaces = [
  {
    category: "Education",
    items: [
      "The Shri Ram School – Aravali",
      "GD Goenka Public School",
      "Delhi Public School, Sector 45",
      "Amity International School, Sector 46",
      "Scottish High International School",
    ]
  },
  {
    category: "Healthcare",
    items: [
      "Medanta – The Medicity",
      "Artemis Hospital",
      "Fortis Memorial Research Institute (FMRI)",
      "CK Birla Hospital for Women",
      "Max Hospital, Gurgaon",
    ]
  },
  {
    category: "Commute",
    items: [
      "HUDA City Centre Metro Station",
      "IFFCO Chowk Metro Station",
      "MG Road Metro Station",
      "Sikanderpur Metro Station",
      "Sector 55–56 Rapid Metro Station",
      "Gurgaon Railway Station",
      "Cyber City Rapid Metro Station",
      "Sector 29 Bus Stand",
      "IFFCO Chowk Bus Stop",
      "Sector 14 Bus Stop",
    ]
  },
  {
    category: "Food and Drinks",
    items: [
      "Cyber Hub – Dine-in Restaurants & Cafes",
      "SodaBottleOpenerWala – Cyber Hub",
      "The Big Chill Café – Ardee Mall",
      "Café Delhi Heights – Sector 29",
      "Biryani Blues – Multiple Locations",
    ]
  },
  {
    category: "Shopping",
    items: [
      "Ambience Mall",
      "MGF Metropolitan Mall",
      "Ardee Mall",
      "Sahara Mall",
      "Good Earth City Centre",
    ]
  }
];

const settings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
};

const CardListing = ({citiedetail}) => {
  const [expandedCards, setExpandedCards] = useState({});

  const toggleExpand = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Slider {...settings}>
      {citiedetail?.cityglimpse?.map((place, index) => {
        const isExpanded = expandedCards[index] || false;
        // const visibleItems = isExpanded ? place.items : place.items.slice(0, 3);

        return (
          <div key={index} className="slide-padding">
            <div className="card">
              <h3>{place.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: place?.description }} />
              {/* <ul>
                {visibleItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul> */}
              {/* {place.items.length > 3 && (
                <button
                  className="toggle-btn btn-link"
                  onClick={() => toggleExpand(index)}
                >
                  {isExpanded ? 'Read less' : 'Read more'}
                </button>
              )} */}
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default CardListing;
