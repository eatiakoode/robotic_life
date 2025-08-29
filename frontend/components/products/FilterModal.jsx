"use client";

import { useState, useEffect } from "react";
import {
  availabilityOptions,
  brands,
  colors,
} from "@/data/productFilterOptions";
import { productMain } from "@/data/products";
import { getParentCategories, getSubCategories } from "@/api/category";

import RangeSlider from "react-range-slider-input";
export default function FilterModal({ allProps }) {
  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch parent categories on component mount
  useEffect(() => {
    const fetchParentCategories = async () => {
      try {
        console.log('🚀 Starting to fetch parent categories...');
        setLoading(true);
        const categories = await getParentCategories();
        console.log('📋 Received categories:', categories);
        setParentCategories(categories);
      } catch (error) {
        console.error('❌ Error fetching parent categories:', error);
        setParentCategories([]);
      } finally {
        setLoading(false);
        console.log('🏁 Finished loading categories');
      }
    };

    fetchParentCategories();
  }, []);

  // Handle parent category selection
  const handleParentCategorySelect = async (category) => {
    console.log('Selected parent category:', category);
    allProps.setParentCategory(category);
    
    // Fetch sub-categories for the selected parent
    try {
      const subs = await getSubCategories(category._id);
      console.log('Fetched sub-categories:', subs);
      setSubCategories(subs);
    } catch (error) {
      console.error('Error fetching sub-categories:', error);
      setSubCategories([]);
    }
  };

  return (
    <div className="offcanvas offcanvas-start canvas-filter" id="filterShop">
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
              onInput={(value) => allProps.setPrice(value)}
            />
            <div className="box-price-product mt-3">
              <div className="box-price-item">
                <span className="title-price">Min price</span>
                <div
                  className="price-val"
                  id="price-min-value"
                  data-currency="$"
                >
                  $0
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
              Available range: $0 - ${allProps.priceBounds?.[1] || 100000}
            </div>
          </div>
          <div className="widget-facet facet-weight">
            <h6 className="facet-title">Weight Range</h6>
            
            {/* Weight Unit Selection */}
            <div className="weight-unit-selector mb-3">
              <label className="form-label" style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Weight Unit:</label>
              <select
                className="form-select"
                value={allProps.weightUnit}
                onChange={(e) => allProps.setWeightUnit(e.target.value)}
                style={{ 
                  maxWidth: '120px',
                  fontSize: '13px',
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#fff'
                }}
              >
                <option value="g">Grams (g)</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="lb">Pounds (lb)</option>
              </select>
            </div>

            <div className="weight-range-slider">
              <RangeSlider
                min={allProps.weightBounds?.[0] || 0}
                max={allProps.weightBounds?.[1] || 1000}
                value={allProps.weight}
                onInput={(value) => allProps.setWeight(value)}
                className="weight-slider"
              />
                                        <div className="box-weight-product mt-3" style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '20px'
              }}>
                <div className="box-weight-item" style={{
                  flex: '1',
                  textAlign: 'center'
                }}>
                  <span className="title-weight" style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#666',
                    marginBottom: '8px',
                    display: 'block'
                  }}>Min weight</span>
                  <div
                    className="weight-val"
                    id="weight-min-value"
                    data-unit={allProps.weightUnit}
                    style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#333',
                      textAlign: 'center',
                      padding: '8px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '4px',
                      border: '1px solid #dee2e6',
                      minHeight: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    0 {allProps.weightUnit}
                  </div>
                </div>
                <div className="box-weight-item" style={{
                  flex: '1',
                  textAlign: 'center'
                }}>
                  <span className="title-weight" style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#666',
                    marginBottom: '8px',
                    display: 'block'
                  }}>Max weight</span>
                  <div
                    className="weight-val"
                    id="weight-max-value"
                    data-unit={allProps.weightUnit}
                    style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#333',
                      textAlign: 'center',
                      padding: '8px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '4px',
                      border: '1px solid #dee2e6',
                      minHeight: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {allProps.weight[1]} {allProps.weightUnit}
                  </div>
                </div>
              </div>
            </div>
            <div className="weight-range-info" style={{ 
              marginTop: '8px',
              fontSize: '12px',
              color: '#888',
              fontStyle: 'italic'
            }}>
              Available range: 0 - {allProps.weightBounds?.[1] || 1000} {allProps.weightUnit}
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
                      (
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

