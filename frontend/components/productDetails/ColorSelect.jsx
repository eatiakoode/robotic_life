"use client";

import React, { useState } from "react";

// Helper function to map color names to CSS classes (same as in product.js)
const getColorClass = (colorName) => {
  if (!colorName) return 'bg-primary';
  
  const colorMap = {
    'red': 'bg-red',
    'blue': 'bg-blue', 
    'green': 'bg-primary', // Use primary for green since bg-green doesn't exist
    'yellow': 'bg-yellow',
    'orange': 'bg-orange',
    'purple': 'bg-purple',
    'violet': 'bg-purple-2',
    'voilet': 'bg-purple-2', // Handle misspelling from backend
    'pink': 'bg-pink',
    'black': 'bg-black',
    'white': 'bg-white',
    'gray': 'bg-grey', // Now properly shows grey color
    'grey': 'bg-grey', // Now properly shows grey color
    'brown': 'bg-brown',
    'silver': 'bg-grey', // Use grey for silver
    'gold': 'bg-yellow', // Use yellow for gold
    'default': 'bg-primary',
    'beige': 'bg-beige', // Now uses proper beige color
    'light blue': 'bg-blue',
    'light green': 'bg-primary',
    'light pink': 'bg-pink',
    'dark blue': 'bg-blue',
    'dark grey': 'bg-grey',
    'dark gray': 'bg-grey'
  };
  
  const normalizedColor = colorName.toLowerCase().trim();
  return colorMap[normalizedColor] || 'bg-primary'; // Default to primary instead of creating non-existent classes
};

const colorOptionsDefault = [
  {
    id: "values-beige",
    value: "Beige",
    color: "beige",
  },
  {
    id: "values-gray",
    value: "Gray",
    color: "gray",
  },
  {
    id: "values-grey",
    value: "Grey",
    color: "grey",
  },
];

export default function ColorSelect({
  activeColor = "",
  setActiveColor,
  colorOptions = colorOptionsDefault,
}) {
  const [activeColorDefault, setActiveColorDefault] = useState("gray");

  const handleSelectColor = (value) => {
    if (setActiveColor) {
      setActiveColor(value);
    } else {
      setActiveColorDefault(value);
    }
  };

  return (
    <div className="variant-picker-item">
      <div className="variant-picker-label mb_12">
        Colors:
        <span
          className="text-title variant-picker-label-value value-currentColor"
          style={{ textTransform: "capitalize" }}
        >
          {activeColor ? 
            (colorOptions.find(c => c.color === activeColor)?.value || activeColor) : 
            activeColorDefault
          }
        </span>
      </div>
      <div className="variant-picker-values">
        {colorOptions.map(({ id, value, color }) => (
          <React.Fragment key={id}>
            <input
              id={id}
              type="radio"
              readOnly
              checked={
                activeColor ? activeColor == color : activeColorDefault == color
              }
            />
            <label
              onClick={() => {
                handleSelectColor(color);
              }}
              className={`hover-tooltip tooltip-bot radius-60 color-btn ${
                activeColor
                  ? activeColor == color
                    ? "active"
                    : ""
                  : activeColorDefault == color
                  ? "active"
                  : ""
              }`}
              htmlFor={id}
            >
              <span className={`btn-checkbox ${getColorClass(color)}`} />
              <span className="tooltip">{value}</span>
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
