"use client";

import LayoutHandler from "./LayoutHandler";
import Sorting from "./Sorting";
import Listview from "./Listview";
import GridView from "./GridView";
import { useEffect, useReducer, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import FilterModal from "./FilterModal";
import { initialState, reducer } from "@/reducer/filterReducer";
import { getAllProducts, getProductsByCategory } from "@/api/product";
import { getFilteredProducts } from "@/api/filtering";
import { getParentCategories } from "@/api/category";
import FilterMeta from "./FilterMeta";

export default function Products1({ parentClass = "flat-spacing" }) {
  const searchParams = useSearchParams();
  const [activeLayout, setActiveLayout] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [productMain, setProductMain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceBoundsUpdate, setPriceBoundsUpdate] = useState(null);
  const [urlCategoryLoaded, setUrlCategoryLoaded] = useState(false);
  const {
    price,
    priceBounds,
    weight,
    weightBounds,
    weightUnit,
    size,
    availability,
    color,
    brands,
    selectedParentCategory,
    selectedSubCategory,

    filtered,
    sortingOption,
    sorted,

    activeFilterOnSale,
    currentPage,
    itemPerPage,
  } = state;

  const allProps = {
    ...state,
    setPrice: (value) => dispatch({ type: "SET_PRICE", payload: value }),

    setWeight: (value) => dispatch({ type: "SET_WEIGHT", payload: value }),
    setWeightUnit: (value) => dispatch({ type: "SET_WEIGHT_UNIT", payload: value }),

    setColor: (value) => {
      value == color
        ? dispatch({ type: "SET_COLOR", payload: "All" })
        : dispatch({ type: "SET_COLOR", payload: value });
    },
    setSize: (value) => {
      value == size
        ? dispatch({ type: "SET_SIZE", payload: "All" })
        : dispatch({ type: "SET_SIZE", payload: value });
    },
    setAvailability: (value) => {
      value == availability
        ? dispatch({ type: "SET_AVAILABILITY", payload: "All" })
        : dispatch({ type: "SET_AVAILABILITY", payload: value });
    },

    setBrands: (newBrand) => {
      const updated = [...brands].includes(newBrand)
        ? [...brands].filter((elm) => elm != newBrand)
        : [...brands, newBrand];
      dispatch({ type: "SET_BRANDS", payload: updated });
    },
    removeBrand: (newBrand) => {
      const updated = [...brands].filter((brand) => brand != newBrand);

      dispatch({ type: "SET_BRANDS", payload: updated });
    },
    setParentCategory: (category) =>
      dispatch({ type: "SET_PARENT_CATEGORY", payload: category }),
    setSubCategory: (category) =>
      dispatch({ type: "SET_SUB_CATEGORY", payload: category }),
    setSortingOption: (value) =>
      dispatch({ type: "SET_SORTING_OPTION", payload: value }),
    toggleFilterWithOnSale: () => dispatch({ type: "TOGGLE_FILTER_ON_SALE" }),
    setCurrentPage: (value) =>
      dispatch({ type: "SET_CURRENT_PAGE", payload: value }),
    setItemPerPage: (value) => {
      dispatch({ type: "SET_CURRENT_PAGE", payload: 1 }),
        dispatch({ type: "SET_ITEM_PER_PAGE", payload: value });
    },
    clearFilter: () => {
      dispatch({ type: "CLEAR_FILTER" });
    },
  };

  // Function to automatically refresh price bounds when needed
  const refreshPriceBounds = useCallback((products) => {
    if (products && products.length > 0) {
      const prices = products.map(p => p.price).filter(price => price > 0 && !isNaN(price));
      if (prices.length > 0) {
        const newMinPrice = Math.floor(Math.min(...prices));
        const newMaxPrice = Math.ceil(Math.max(...prices));
        
        // Check if current bounds need to be expanded
        const currentMin = priceBounds[0];
        const currentMax = priceBounds[1];
        
        // Only update if there's an actual change to prevent infinite loops
        if (newMinPrice < currentMin || newMaxPrice > currentMax) {
          // Expand bounds to include all products
          const expandedMin = Math.min(currentMin, newMinPrice);
          const expandedMax = Math.max(currentMax, newMaxPrice);
          
          // Check if the new bounds are actually different from current bounds
          if (expandedMin !== currentMin || expandedMax !== currentMax) {
            dispatch({ type: "SET_PRICE_BOUNDS", payload: [expandedMin, expandedMax] });
            
            // Show notification to user
            setPriceBoundsUpdate({
              message: `Price range updated to $${expandedMin} - $${expandedMax}`,
              type: 'success',
              timestamp: Date.now()
            });
            
            // Auto-hide notification after 5 seconds
            setTimeout(() => setPriceBoundsUpdate(null), 5000);
          }
        }
      }
    }
  }, [priceBounds]);

  // Function to automatically refresh weight bounds when needed
  const refreshWeightBounds = useCallback((products) => {
    if (products && products.length > 0) {
      const weights = products.map(p => {
        if (p.weight && p.weight.value && p.weight.unit) {
          // Convert all weights to grams for consistent comparison
          const weightInGrams = convertWeightToGrams(p.weight.value, p.weight.unit);
          return weightInGrams;
        }
        return null;
      }).filter(weight => weight !== null && weight > 0 && !isNaN(weight));
      
      if (weights.length > 0) {
        const newMinWeight = Math.floor(Math.min(...weights));
        const newMaxWeight = Math.ceil(Math.max(...weights));
        
        // Check if current bounds need to be expanded
        const currentMin = weightBounds[0];
        const currentMax = weightBounds[1];
        
        // Only update if there's an actual change to prevent infinite loops
        if (newMinWeight < currentMin || newMaxWeight > currentMax) {
          // Expand bounds to include all products
          const expandedMin = Math.min(currentMin, newMinWeight);
          const expandedMax = Math.max(currentMax, newMaxWeight);
          
          // Check if the new bounds are actually different from current bounds
          if (expandedMin !== currentMin || expandedMax !== currentMax) {
            dispatch({ type: "SET_WEIGHT_BOUNDS", payload: [expandedMin, expandedMax] });
          }
        }
      }
    }
  }, [weightBounds]);

  // Helper function to convert weight to kg
  const convertWeightToKg = (value, unit) => {
    switch (unit.toLowerCase()) {
      case 'g':
        return value / 1000;
      case 'kg':
        return value;
      case 'lb':
        return value * 0.453592;
      default:
        return value;
    }
  };

  // Helper function to convert weight to grams
  const convertWeightToGrams = (value, unit) => {
    switch (unit.toLowerCase()) {
      case 'g':
        return value;
      case 'kg':
        return value * 1000;
      case 'lb':
        return value * 453.592;
      default:
        return value;
    }
  };



  // Main filtering function
  const applyFilters = useCallback(async () => {
    // Only run filtering if we have products loaded
    if (productMain.length === 0) {
      return;
    }

    let filteredProducts = [...productMain];
    
    // Check if we should use backend filtering (excluding category which has its own logic)
    const shouldUseBackendFiltering = brands.length > 0 || color !== "All" || (weight && weight.length === 2 && (weight[0] !== weightBounds[0] || weight[1] !== weightBounds[1]));
    
    if (shouldUseBackendFiltering) {
      try {
        // Prepare filters for backend
        const additionalFilters = {};
        
        // Add category if selected
        if (selectedParentCategory) {
          additionalFilters.category = selectedParentCategory.slug;
        }
        
        if (brands.length > 0) {
          additionalFilters.manufacturers = brands;
        }
        
        if (color !== "All" && color.name) {
          additionalFilters.colors = [color.name];
        }
        
        if (price && price.length === 2) {
          additionalFilters.minPrice = price[0];
          additionalFilters.maxPrice = price[1];
        }
        
        if (weight && weight.length === 2 && (weight[0] !== weightBounds[0] || weight[1] !== weightBounds[1])) {
          additionalFilters.minWeight = weight[0];
          additionalFilters.maxWeight = weight[1];
          additionalFilters.weightUnit = weightUnit;
        }
        
        // Use backend filtering
        const backendResults = await getFilteredProducts(additionalFilters);
        
        if (backendResults && backendResults.length >= 0) {
          filteredProducts = backendResults;
          
          // Still apply client-side filters that aren't supported by backend
          if (size !== "All" && size !== "Free Size") {
            filteredProducts = filteredProducts.filter((elm) =>
              elm.filterSizes.includes(size)
            );
          }
          
          dispatch({ type: "SET_FILTERED", payload: filteredProducts });
          return;
        }
      } catch (error) {
        // Backend filtering failed, fallback to client-side
      }
    }

    // Apply filters sequentially
    if (brands.length > 0) {
      // Reset to first page when filters change
      dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
      
      filteredProducts = filteredProducts.filter((elm) => {
        const hasBrand = brands.every((brand) => elm.filterBrands && elm.filterBrands.includes(brand));
        return hasBrand;
      });
    }

    if (availability !== "All") {
      filteredProducts = filteredProducts.filter(
        (elm) => availability.value === elm.inStock
      );
    }

    if (color !== "All") {
      filteredProducts = filteredProducts.filter((elm) => {
        const hasColor = elm.filterColor && elm.filterColor.includes(color.name);
        return hasColor;
      });
    }

    if (size !== "All" && size !== "Free Size") {
      filteredProducts = filteredProducts.filter((elm) =>
        elm.filterSizes.includes(size)
      );
    }

    if (activeFilterOnSale) {
      filteredProducts = filteredProducts.filter((elm) => elm.oldPrice);
    }

    // Filter by parent category - using backend category data
    if (selectedParentCategory) {
      // Reset to first page when category changes
      dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
      
      // Only use backend category filtering if we're not already using backend filtering for other filters
      if (!shouldUseBackendFiltering) {
      // Try backend filtering first, then fallback to client-side filtering
      try {
        const categoryProducts = await getProductsByCategory(selectedParentCategory);
        if (categoryProducts && categoryProducts.length > 0) {
          // Replace the current products with category-specific products
          filteredProducts = categoryProducts;
          
          // Category products loaded successfully - auto-refresh price bounds
          refreshPriceBounds(categoryProducts);
        } else {
          // Fallback to client-side filtering
          filteredProducts = productMain.filter(product => {
            const productCategoryId = product.category?._id || product.categoryId;
            const selectedCategoryId = selectedParentCategory._id;
            return productCategoryId === selectedCategoryId;
          });
          
          if (filteredProducts.length > 0) {
            refreshPriceBounds(filteredProducts);
          } else {
            filteredProducts = [];
          }
        }
      } catch (error) {
        // Fallback to client-side filtering
        filteredProducts = productMain.filter(product => {
          const productCategoryId = product.category?._id || product.categoryId;
          const selectedCategoryId = selectedParentCategory._id;
          return productCategoryId === selectedCategoryId;
        });
        
        if (filteredProducts.length > 0) {
          refreshPriceBounds(filteredProducts);
        } else {
          filteredProducts = [];
          }
        }
      }
    } else {
      // No category selected, show all products
      filteredProducts = [...productMain];
    }

    // Filter by sub category - using backend category data
    if (selectedSubCategory) {
      // For sub-categories, we can further filter the already filtered products
      // or implement additional logic as needed
    }

    // Filter by price range - NOW ENABLED WITH DYNAMIC PRICING
    if (price && price.length === 2) {
      // Reset to first page when price filter changes
      dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
      
      filteredProducts = filteredProducts.filter(
        (elm) => elm.price >= price[0] && elm.price <= price[1]
      );
    }

    // Filter by weight range - ONLY when user actually changes the weight
    if (weight && weight.length === 2 && (weight[0] !== weightBounds[0] || weight[1] !== weightBounds[1])) {
      // Reset to first page when weight filter changes
      dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
      
      filteredProducts = filteredProducts.filter((elm) => {
        if (!elm.weight || !elm.weight.value || !elm.weight.unit) return false;
        
        // Convert the product's weight to grams for comparison
        const productWeightInGrams = convertWeightToGrams(elm.weight.value, elm.weight.unit);
        if (productWeightInGrams === null) return false;
        
        // Convert the filter weight to grams
        const minWeightInGrams = convertWeightToGrams(weight[0], weightUnit);
        const maxWeightInGrams = convertWeightToGrams(weight[1], weightUnit);
        
        return productWeightInGrams >= minWeightInGrams && productWeightInGrams <= maxWeightInGrams;
      });
    }
    
    dispatch({ type: "SET_FILTERED", payload: filteredProducts });
  }, [productMain, price, weight, weightUnit, availability, color, size, brands, activeFilterOnSale, selectedParentCategory, selectedSubCategory]);

  // Main filtering useEffect - removed productMain from dependencies to prevent infinite loop
  useEffect(() => {
    applyFilters();
  }, [price, weight, weightUnit, availability, color, size, brands, activeFilterOnSale, selectedParentCategory, selectedSubCategory, applyFilters]);

  // Separate useEffect for price bounds calculation when productMain changes
  useEffect(() => {
    if (productMain.length > 0) {
              // Use auto-refresh to ensure price bounds are always current
        refreshPriceBounds(productMain);
      // Also refresh weight bounds
      refreshWeightBounds(productMain);
    }
  }, [productMain]); // Removed refreshPriceBounds dependency

  // Separate useEffect for price bounds calculation when category changes
  useEffect(() => {
    if (selectedParentCategory && productMain.length > 0) {
      // When category changes, we need to recalculate price bounds based on category products
      // This will be handled by the applyFilters function which fetches category products
    } else if (!selectedParentCategory && productMain.length > 0) {
      // When no category is selected, reset to all products price bounds using auto-refresh
      refreshPriceBounds(productMain);
    }
  }, [selectedParentCategory, productMain]);

  // Handle URL parameters for category selection
  useEffect(() => {
    const categoryId = searchParams.get('category');
    
    if (categoryId && !urlCategoryLoaded) {
      const loadCategoryFromUrl = async () => {
        try {
          const categories = await getParentCategories();
          const category = categories.find(cat => cat._id === categoryId);
          
          if (category) {
            dispatch({ type: "SET_PARENT_CATEGORY", payload: category });
            setUrlCategoryLoaded(true);
          }
        } catch (error) {
          console.error('Error loading category from URL:', error);
        }
      };
      
      loadCategoryFromUrl();
    }
  }, [searchParams, urlCategoryLoaded]);

  // Fetch products from backend on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await getAllProducts();
        setProductMain(products);
        
        // Auto-refresh price bounds to ensure they include all products
        refreshPriceBounds(products);
        
        // Also refresh weight bounds
        refreshWeightBounds(products);
        
        // Also set the initial filtered products to show all products
        dispatch({ type: "SET_FILTERED", payload: products });
      } catch (error) {
        console.error('❌ Error fetching products:', error);
        setProductMain([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (sortingOption === "Price Ascending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => a.price - b.price),
      });
    } else if (sortingOption === "Price Descending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => b.price - a.price),
      });
    } else if (sortingOption === "Title Ascending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => a.title.localeCompare(b.title)),
      });
    } else if (sortingOption === "Title Descending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => b.title.localeCompare(a.title)),
      });
    } else {
      dispatch({ type: "SET_SORTED", payload: filtered });
    }
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  }, [filtered, sortingOption]);

  // Periodic price bounds refresh to handle external product updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (productMain.length > 0) {
        // Check if we need to refresh price bounds
        const currentPrices = productMain.map(p => p.price).filter(price => price > 0 && !isNaN(price));
        if (currentPrices.length > 0) {
          const currentMin = Math.min(...currentPrices);
          const currentMax = Math.max(...currentPrices);
          
          // If current bounds don't match the actual product range, refresh them
          if (currentMin !== priceBounds[0] || currentMax !== priceBounds[1]) {
            refreshPriceBounds(productMain);
          }
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [productMain, priceBounds]);


  
  return (
    <>
      <section className={parentClass}>
        <div className="container">
          <div className="tf-shop-control">
            <div className="tf-control-filter">
              <a
                href="#filterShop"
                data-bs-toggle="offcanvas"
                aria-controls="filterShop"
                className="tf-btn-filter"
              >
                <span className="icon icon-filter" />
                <span className="text">Filters</span>
              </a>
              <div
                onClick={allProps.toggleFilterWithOnSale}
                className={`d-none d-lg-flex shop-sale-text ${
                  activeFilterOnSale ? "active" : ""
                }`}
              >
                <i className="icon icon-checkCircle" />
                <p className="text-caption-1">Shop sale items only</p>
              </div>
            </div>
            <ul className="tf-control-layout">
              <LayoutHandler
                setActiveLayout={setActiveLayout}
                activeLayout={activeLayout}
              />
            </ul>
            <div className="tf-control-sorting">
              <p className="d-none d-lg-block text-caption-1">Sort by:</p>
              <Sorting allProps={allProps} />
            </div>
          </div>
          
          {/* Price bounds update notification */}
          {priceBoundsUpdate && (
            <div 
              className={`alert alert-${priceBoundsUpdate.type === 'success' ? 'success' : 'info'} alert-dismissible fade show`}
              style={{
                margin: '20px 0',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              role="alert"
            >
              <i className="icon icon-checkCircle" style={{ marginRight: '8px' }} />
              <strong>Price Range Updated!</strong> {priceBoundsUpdate.message}
              <button
                type="button"
                className="btn-close"
                onClick={() => setPriceBoundsUpdate(null)}
                aria-label="Close"
              />
            </div>
          )}
          
          <div className="wrapper-control-shop">
            <FilterMeta productLength={sorted.length} allProps={allProps} />

            {/* Show "No robots found" message when category is selected but no products */}
            {selectedParentCategory && sorted.length === 0 && !loading && (
              <div className="no-robots-found" style={{ 
                textAlign: 'center', 
                padding: '50px 20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                margin: '20px 0',
                border: '1px solid #dee2e6'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🤖</div>
                <h3 style={{ color: '#6c757d', marginBottom: '10px' }}>
                  No Robots Found
                </h3>
                <p style={{ color: '#6c757d', marginBottom: '20px' }}>
                  No robots found in the <strong>"{selectedParentCategory.name}"</strong> category.
                </p>
                <button 
                  onClick={() => allProps.setParentCategory(null)}
                  style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  View All Robots
                </button>
              </div>
            )}

            {loading ? (
              <div className="loading-container" style={{ textAlign: 'center', padding: '50px' }}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading products from backend...</p>
              </div>
            ) : activeLayout == 1 ? (
              <div className="tf-list-layout wrapper-shop" id="listLayout">
                <Listview 
                  products={sorted} 
                  currentPage={currentPage}
                  itemsPerPage={itemPerPage}
                  onPageChange={(page) => allProps.setCurrentPage(page)}
                />
              </div>
            ) : (
              <div
                className={`tf-grid-layout wrapper-shop tf-col-${activeLayout}`}
                id="gridLayout"
              >
                {/* <GridView products={sorted} /> */}
              </div>
            )}
          </div>
        </div>
      </section>

      <FilterModal allProps={allProps} />
    </>
  );
}
