"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getParentCategories, getSubCategories } from "@/api/category";
import { getAllManufacturers } from "@/api/filterData";
const CustomRangeSlider = ({ min, max, value, onChange, step = 1 }) => {
  const [isDragging, setIsDragging] = useState(null);
  const sliderRef = useRef(null);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMouseDown = (handle, e) => {
    e.preventDefault();
    setIsDragging(handle);
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const newValue = min + (percent / 100) * (max - min);
    const steppedValue = Math.round(newValue / step) * step;

    if (isDragging === 'min') {
      const newMin = Math.min(steppedValue, localValue[1] - step);
      const newLocalValue = [newMin, localValue[1]];
      setLocalValue(newLocalValue);
      onChange(newLocalValue);
    } else if (isDragging === 'max') {
      const newMax = Math.max(steppedValue, localValue[0] + step);
      const newLocalValue = [localValue[0], newMax];
      setLocalValue(newLocalValue);
      onChange(newLocalValue);
    }
  }, [isDragging, localValue, min, max, step, onChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || !sliderRef.current) return;
    
    const touch = e.touches[0];
    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100));
    const newValue = min + (percent / 100) * (max - min);
    const steppedValue = Math.round(newValue / step) * step;

    if (isDragging === 'min') {
      const newMin = Math.min(steppedValue, localValue[1] - step);
      const newLocalValue = [newMin, localValue[1]];
      setLocalValue(newLocalValue);
      onChange(newLocalValue);
    } else if (isDragging === 'max') {
      const newMax = Math.max(steppedValue, localValue[0] + step);
      const newLocalValue = [localValue[0], newMax];
      setLocalValue(newLocalValue);
      onChange(newLocalValue);
    }
  }, [isDragging, localValue, min, max, step, onChange]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const minPercent = ((localValue[0] - min) / (max - min)) * 100;
  const maxPercent = ((localValue[1] - min) / (max - min)) * 100;

  return (
    <div className="custom-range-slider" style={{ position: 'relative', margin: '20px 0' }}>
      <div 
        ref={sliderRef}
        className="slider-track" 
        style={{
          position: 'relative',
          height: '6px',
          backgroundColor: '#ddd',
          borderRadius: '3px',
          margin: '10px 0',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <div className="slider-range" style={{
          position: 'absolute',
          height: '100%',
          backgroundColor: '#444546ff',
          borderRadius: '3px',
          left: `${minPercent}%`,
          width: `${maxPercent - minPercent}%`,
          transition: isDragging ? 'none' : 'all 0.1s ease'
        }}></div>
        
        {/* Left Handle */}
        <div
          className="slider-handle"
          style={{
            position: 'absolute',
            left: `${minPercent}%`,
            top: '-8px',
            width: '20px',
            height: '20px',
            backgroundColor: '#444546ff',
            border: '2px solid #fff',
            borderRadius: '50%',
            cursor: isDragging === 'min' ? 'grabbing' : 'grab',
            transform: 'translateX(-50%)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 3,
            transition: isDragging ? 'none' : 'all 0.1s ease',
            userSelect: 'none'
          }}
          onMouseDown={(e) => handleMouseDown('min', e)}
          onTouchStart={(e) => {
            e.preventDefault();
            handleMouseDown('min', e);
          }}
        />
        
        {/* Right Handle */}
        <div
          className="slider-handle"
          style={{
            position: 'absolute',
            left: `${maxPercent}%`,
            top: '-8px',
            width: '20px',
            height: '20px',
            backgroundColor: '#444546ff',
            border: '2px solid #fff',
            borderRadius: '50%',
            cursor: isDragging === 'max' ? 'grabbing' : 'grab',
            transform: 'translateX(-50%)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 3,
            transition: isDragging ? 'none' : 'all 0.1s ease',
            userSelect: 'none'
          }}
          onMouseDown={(e) => handleMouseDown('max', e)}
          onTouchStart={(e) => {
            e.preventDefault();
            handleMouseDown('max', e);
          }}
        />
      </div>
    </div>
  );
};


export default function FilterModal({ allProps }) {
  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef(null);
  const weightTimeoutRef = useRef(null);

  const debouncedSetPrice = useCallback((value) => {
    if (JSON.stringify(value) !== JSON.stringify(allProps.price)) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        allProps.setPrice(value);
      }, 100); 
    }
  }, [allProps, allProps.price]);

  const debouncedSetWeight = useCallback((value) => {

    if (JSON.stringify(value) !== JSON.stringify(allProps.weight)) {
      if (weightTimeoutRef.current) {
        clearTimeout(weightTimeoutRef.current);
      }
      weightTimeoutRef.current = setTimeout(() => {
        allProps.setWeight(value);
      }, 100);
    }
  }, [allProps, allProps.weight]);

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

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setLoading(true);

        const [categoriesResult, manufacturersResult] = await Promise.allSettled([
          getParentCategories(),
          getAllManufacturers()
        ]);

        if (categoriesResult.status === 'fulfilled') {
          setParentCategories(categoriesResult.value);
        } else {
          console.error(categoriesResult.reason);
          setParentCategories([]);
        }

        if (manufacturersResult.status === 'fulfilled') {
          setManufacturers(manufacturersResult.value);
        } else {
          console.error(manufacturersResult.reason);
          setManufacturers([]);
        }
        
      } catch (error) {
        console.error(error);
        setParentCategories([]);
        setManufacturers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterData();
  }, []);

  const handleParentCategorySelect = async (category) => {
    allProps.setParentCategory(category);
    
    try {
      const subs = await getSubCategories(category._id);
      setSubCategories(subs);
    } catch (error) {
      console.error(error);
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
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          width: 16px;
          height: 16px;
          border: 2px solid #ddd;
          border-radius: 50%;
          background-color: white;
          cursor: pointer;
          position: relative;
        }
        .weight-unit-option input[type="radio"]:checked {
          border-color: #444546ff;
          background-color: #444546ff;
        }
        .weight-unit-option input[type="radio"]:checked::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: white;
        }
        .weight-unit-option span {
          cursor: pointer;
        }
        .fieldset-item input[type="radio"] {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          width: 16px;
          height: 16px;
          border: 2px solid #ddd;
          border-radius: 50%;
          background-color: white;
          cursor: pointer;
          position: relative;
        }
        .fieldset-item input[type="radio"]:checked {
          border-color: #444546ff;
          background-color: #444546ff;
        }
        .fieldset-item input[type="radio"]:checked::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: white;
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
                          color: allProps.selectedParentCategory?._id === category._id ? '#444546ff' : '#333',
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
                          color: allProps.selectedParentCategory?._id === category._id ? '#444546ff' : '#333',
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
            <CustomRangeSlider
              min={allProps.priceBounds?.[0] || 0}
              max={allProps.priceBounds?.[1] || 5000000}
              value={allProps.price}
              onChange={(value) => debouncedSetPrice(value)}
              step={1000}
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
              Available range: ${allProps.priceBounds?.[0] || 0} - ${allProps.priceBounds?.[1] || 5000000}
            </div>
          </div>
          <div className="widget-facet facet-weight">
            <h6 className="facet-title">Weight Range</h6>
            <CustomRangeSlider
              min={0}
              max={5000}
              value={[
                Math.min(allProps.weight[0], 5000),
                Math.min(allProps.weight[1], 5000)
              ]}
              onChange={(value) => {
                const actualMin = value[0];
                const actualMax = value[1] === 5000 ? (allProps.weightBounds?.[1] || 5000) : value[1];
                debouncedSetWeight([actualMin, actualMax]);
              }}
              step={1}
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
              Available range: 0 - 5000 {allProps.weightUnit}
            </div>
            
            {/* Weight Unit Selector */}
            <div className="weight-unit-selector mt-3">
              <label className="weight-unit-label">Weight Unit:</label>
              <div className="weight-unit-options">
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
                    value="lb"
                    checked={allProps.weightUnit === "lb"}
                    onChange={() => allProps.setWeightUnit("lb")}
                  />
                  <span>Pounds (lb)</span>
                </label>
              </div>
            </div>
          </div>
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

