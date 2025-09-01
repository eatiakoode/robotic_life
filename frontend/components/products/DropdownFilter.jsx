"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  availabilityOptions,
  brands,
  colors,
  sizes,
} from "@/data/productFilterOptions";
import { productMain } from "@/data/products";
import { getParentCategories, getSubCategories } from "@/api/category";

import RangeSlider from "react-range-slider-input";

export default function DropdownFilter({ allProps, setIsDDActive }) {
  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef(null);

  // Debounced price update to prevent infinite loops
  const debouncedSetPrice = useCallback((value) => {
    // Only update if the value has actually changed
    if (JSON.stringify(value) !== JSON.stringify(allProps.price)) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set a new timeout to update the price
      timeoutRef.current = setTimeout(() => {
        allProps.setPrice(value);
      }, 100); // 100ms delay
    }
  }, [allProps, allProps.price]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Fetch parent categories on component mount
  useEffect(() => {
    const fetchParentCategories = async () => {
      try {
        setLoading(true);
        const categories = await getParentCategories();
        setParentCategories(categories);
      } catch (error) {
        console.error('Error fetching parent categories:', error);
        setParentCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchParentCategories();
  }, []);

  // Handle parent category selection
  const handleParentCategorySelect = async (category) => {
    allProps.setParentCategory(category);
    
    // Fetch sub-categories for the selected parent
    try {
      const subs = await getSubCategories(category._id);
      setSubCategories(subs);
    } catch (error) {
      console.error('Error fetching sub-categories:', error);
      setSubCategories([]);
    }
  };

  return (
    <div className="canvas-wrapper">
      <div className="canvas-header d-flex d-xl-none">
        <h5>Filters</h5>
        <span
          className="icon-close close-filter"
          onClick={() => setIsDDActive(false)}
        />
      </div>
      <div className="canvas-body">
                  <div className="widget-facet facet-categories">
            <h6 className="facet-title">Product Categories</h6>
            
            {/* Parent Categories */}
            <div className="parent-categories">
              <ul className="facet-content">
                {loading ? (
                  <li>Loading categories...</li>
                ) : (
                  parentCategories.map((category, index) => (
                    <li key={index}>
                      <a 
                        href="#" 
                        className={`categories-item ${
                          allProps.selectedParentCategory?._id === category._id ? 'active' : ''
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleParentCategorySelect(category);
                        }}
                        style={{
                          display: 'block',
                          padding: '8px 0',
                          textDecoration: 'none',
                          color: allProps.selectedParentCategory?._id === category._id ? '#007bff' : '#333',
                          fontWeight: allProps.selectedParentCategory?._id === category._id ? '600' : '400'
                        }}
                      >
                        {category.name}
                      </a>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Sub Categories - Only show if parent is selected */}
            {allProps.selectedParentCategory && subCategories.length > 0 && (
              <div className="sub-categories" style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                <ul className="facet-content">
                  {subCategories.map((category, index) => (
                    <li key={index}>
                                              <a 
                          href="#" 
                          className={`categories-item ${
                            allProps.selectedSubCategory?._id === category._id ? 'active' : ''
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          allProps.setSubCategory(category);
                        }}
                        style={{
                          display: 'block',
                          padding: '8px 0',
                          textDecoration: 'none',
                          color: allProps.selectedParentCategory?._id === category._id ? '#007bff' : '#333',
                          fontWeight: allProps.selectedSubCategory?._id === category._id ? '600' : '400',
                          paddingLeft: '15px'
                        }}
                      >
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        <div className="widget-facet facet-price">
          <h6 className="facet-title">Price</h6>

          <RangeSlider
            min={10}
            max={450}
            value={allProps.price}
            onInput={(value) => debouncedSetPrice(value)}
          />
          <div className="box-price-product mt-3">
            <div className="box-price-item">
              <span className="title-price">Min price</span>
              <div className="price-val" id="price-min-value" data-currency="$">
                {allProps.price[0]}
              </div>
            </div>
            <div className="box-price-item">
              <span className="title-price">Max price</span>
              <div className="price-val" id="price-max-value" data-currency="$">
                {allProps.price[1]}
              </div>
            </div>
          </div>
        </div>
        <div className="widget-facet facet-size">
          <h6 className="facet-title">Size</h6>
          <div className="facet-size-box size-box">
            {sizes.map((size, index) => (
              <span
                key={index}
                onClick={() => allProps.setSize(size)}
                className={`size-item size-check ${
                  allProps.size === size ? "active" : ""
                }`}
              >
                {size}
              </span>
            ))}
            <span
              className={`size-item size-check free-size ${
                allProps.size == "Free Size" ? "active" : ""
              } `}
              onClick={() => allProps.setSize("Free Size")}
            >
              Free Size
            </span>
          </div>
        </div>
        <div className="widget-facet facet-color">
          <h6 className="facet-title">Colors</h6>
          <div className="facet-color-box">
            {colors.map((color, index) => (
              <div
                onClick={() => allProps.setColor(color)}
                key={index}
                className={`color-item color-check ${
                  color == allProps.color ? "active" : ""
                }`}
              >
                <span className={`color ${color.className}`} />
                {color.name}
              </div>
            ))}
          </div>
        </div>
        <div className="widget-facet facet-fieldset">
          <h6 className="facet-title">Availability</h6>
          <div className="box-fieldset-item">
            {availabilityOptions.map((option, index) => (
              <fieldset
                key={index}
                className="fieldset-item"
                onClick={() => allProps.setAvailability(option)}
              >
                <input
                  type="radio"
                  name="availability"
                  className="tf-check"
                  readOnly
                  checked={allProps.availability === option}
                />
                <label>
                  {option.label}{" "}
                  <span className="count-stock">
                    (
                    {
                      productMain.filter((el) => el.inStock == option.value)
                        .length
                    }
                    )
                  </span>
                </label>
              </fieldset>
            ))}
          </div>
        </div>
        <div className="widget-facet facet-fieldset">
          <h6 className="facet-title">Brands</h6>
          <div className="box-fieldset-item">
            {brands.map((brand, index) => (
              <fieldset
                key={index}
                className="fieldset-item"
                onClick={() => allProps.setBrands(brand.label)}
              >
                <input
                  type="checkbox"
                  name="brand"
                  className="tf-check"
                  readOnly
                  checked={allProps.brands.includes(brand.label)}
                />
                <label>
                  {brand.label}{" "}
                  <span className="count-brand">
                    ({" "}
                    {
                      productMain.filter((el) =>
                        el.filterBrands.includes(brand.label)
                      ).length
                    }
                    )
                  </span>
                </label>
              </fieldset>
            ))}
          </div>
        </div>
      </div>
      <div className="canvas-bottom d-block d-xl-none">
        <button
          id="reset-filter"
          onClick={allProps.clearFilter}
          className="tf-btn btn-reset"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
