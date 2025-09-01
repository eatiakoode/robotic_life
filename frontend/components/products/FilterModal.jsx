"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getParentCategories, getSubCategories } from "@/api/category";
import { getAllColors, getAllManufacturers } from "@/api/filterData";

import RangeSlider from "react-range-slider-input";

export default function FilterModal({ allProps }) {
  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef(null);
  const weightTimeoutRef = useRef(null);

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

  // Debounced weight update to prevent infinite loops
  const debouncedSetWeight = useCallback((value) => {
    // Only update if the value has actually changed
    if (JSON.stringify(value) !== JSON.stringify(allProps.weight)) {
      // Clear any existing timeout
      if (weightTimeoutRef.current) {
        clearTimeout(weightTimeoutRef.current);
      }
      
      // Set a new timeout to update the weight
      weightTimeoutRef.current = setTimeout(() => {
        allProps.setWeight(value);
      }, 100); // 100ms delay
    }
  }, [allProps, allProps.weight]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (weightTimeoutRef.current) {
        clearTimeout(weightTimeoutRef.current);
      }
    };
  }, []);

  // Fetch all filter data on component mount
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [categoriesResult, colorsResult, manufacturersResult] = await Promise.allSettled([
          getParentCategories(),
          getAllColors(),
          getAllManufacturers()
        ]);
        
        // Handle categories
        if (categoriesResult.status === 'fulfilled') {
          setParentCategories(categoriesResult.value);
        } else {
          console.error('❌ Error fetching categories:', categoriesResult.reason);
          setParentCategories([]);
        }
        
        // Handle colors
        if (colorsResult.status === 'fulfilled') {
          setColors(colorsResult.value);
        } else {
          console.error('❌ Error fetching colors:', colorsResult.reason);
          setColors([]);
        }
        
        // Handle manufacturers
        if (manufacturersResult.status === 'fulfilled') {
          setManufacturers(manufacturersResult.value);
        } else {
          console.error('❌ Error fetching manufacturers:', manufacturersResult.reason);
          setManufacturers([]);
        }
        
      } catch (error) {
        console.error('❌ Error fetching filter data:', error);
        setParentCategories([]);
        setColors([]);
        setManufacturers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterData();
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
    <div className="offcanvas offcanvas-start canvas-filter" id="filterShop">
      <style jsx>{`
        .box-weight-product {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 15px;
        }
        .box-weight-item {
          text-align: center;
        }
        .title-weight {
          font-size: 12px;
          color: #666;
          display: block;
          margin-bottom: 5px;
        }
        .weight-val {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }
        .weight-range-info {
          font-size: 12px;
          color: #999;
          text-align: center;
          margin-top: 10px;
        }
        .weight-unit-selector {
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid #eee;
        }
        .weight-unit-label {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          display: block;
          margin-bottom: 10px;
        }
        .weight-unit-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .weight-unit-option {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-size: 13px;
          color: #666;
        }
        .weight-unit-option input[type="radio"] {
          margin-right: 8px;
        }
        .weight-unit-option span {
          cursor: pointer;
        }
      `}</style>
      <div className="canvas-wrapper">
        <div className="canvas-header">
          <h5>Filters</h5>
          <span
            className="icon-close icon-close-popup"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
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
            <h6 className="facet-title">Price Range</h6>

            <RangeSlider
              min={allProps.priceBounds?.[0] || 0}
              max={allProps.priceBounds?.[1] || 100000}
              value={allProps.price}
              onInput={debouncedSetPrice}
            />
            <div className="box-price-product mt-3">
              <div className="box-price-item">
                <span className="title-price">Min price</span>
                <div
                  className="price-val"
                  id="price-min-value"
                  data-currency="$"
                >
                  ${allProps.price[0]}
                </div>
              </div>
              <div className="box-price-item">
                <span className="title-price">Max price</span>
                <div
                  className="price-val"
                  id="price-max-value"
                  data-currency="$"
                >
                  ${allProps.price[1]}
                </div>
              </div>
            </div>
            <div className="price-range-info">
              Available range: ${allProps.priceBounds?.[0] || 0} - ${allProps.priceBounds?.[1] || 100000}
            </div>
          </div>
          <div className="widget-facet facet-weight">
            <h6 className="facet-title">Weight Range</h6>

            <RangeSlider
              min={allProps.weightBounds?.[0] || 0}
              max={allProps.weightBounds?.[1] || 1000}
              value={allProps.weight}
              onInput={debouncedSetWeight}
            />
            <div className="box-weight-product mt-3">
              <div className="box-weight-item">
                <span className="title-weight">Min weight</span>
                <div
                  className="weight-val"
                  id="weight-min-value"
                >
                  {allProps.weight[0]} {allProps.weightUnit}
                </div>
              </div>
              <div className="box-weight-item">
                <span className="title-weight">Max weight</span>
                <div
                  className="weight-val"
                  id="weight-max-value"
                >
                  {allProps.weight[1]} {allProps.weightUnit}
                </div>
              </div>
            </div>
            <div className="weight-range-info">
              Available range: {allProps.weightBounds?.[0] || 0} - {allProps.weightBounds?.[1] || 1000} {allProps.weightUnit}
            </div>
            
            {/* Weight Unit Selector */}
            <div className="weight-unit-selector mt-3">
              <label className="weight-unit-label">Weight Unit:</label>
              <div className="weight-unit-options">
                <label className="weight-unit-option">
                  <input
                    type="radio"
                    name="weightUnit"
                    value="g"
                    checked={allProps.weightUnit === "g"}
                    onChange={() => allProps.setWeightUnit("g")}
                  />
                  <span>Grams (g)</span>
                </label>
                <label className="weight-unit-option">
                  <input
                    type="radio"
                    name="weightUnit"
                    value="kg"
                    checked={allProps.weightUnit === "kg"}
                    onChange={() => allProps.setWeightUnit("kg")}
                  />
                  <span>Kilograms (kg)</span>
                </label>
                <label className="weight-unit-option">
                  <input
                    type="radio"
                    name="weightUnit"
                    value="lb"
                    checked={allProps.weightUnit === "lb"}
                    onChange={() => allProps.setWeightUnit("lb")}
                  />
                  <span>Pounds (lb)</span>
                </label>
              </div>
            </div>
          </div>
          <div className="widget-facet facet-color">
            <h6 className="facet-title">Colors</h6>
            <div className="facet-color-box">
              {loading ? (
                <div>Loading colors...</div>
              ) : (
                colors.map((color, index) => (
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
                ))
              )}
            </div>
          </div>
          {/* COMMENTED OUT: Availability section as requested */}
          {/* 
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
          */}
          <div className="widget-facet facet-fieldset">
            <h6 className="facet-title">Manufacturers</h6>
            <div className="box-fieldset-item">
              {loading ? (
                <div>Loading manufacturers...</div>
              ) : (
                manufacturers.map((manufacturer, index) => (
                  <fieldset
                    key={index}
                    className="fieldset-item"
                    onClick={() => allProps.setBrands(manufacturer.label)}
                  >
                    <input
                      type="checkbox"
                      name="manufacturer"
                      className="tf-check"
                      readOnly
                      checked={allProps.brands.includes(manufacturer.label)}
                    />
                    <label>
                      {manufacturer.label}{" "}
                      <span className="count-brand">
                        ({manufacturer.count})
                      </span>
                    </label>
                  </fieldset>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="canvas-bottom">
          <button
            id="reset-filter"
            onClick={allProps.clearFilter}
            className="tf-btn btn-reset"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}

