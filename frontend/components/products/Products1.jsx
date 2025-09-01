"use client";

import LayoutHandler from "./LayoutHandler";
import Sorting from "./Sorting";
import Listview from "./Listview";
import GridView from "./GridView";
import { useEffect, useReducer, useState, useCallback } from "react";
import FilterModal from "./FilterModal";
import { initialState, reducer } from "@/reducer/filterReducer";
import { getAllProducts, getProductsByCategory } from "@/api/product";
import FilterMeta from "./FilterMeta";

export default function Products1({ parentClass = "flat-spacing" }) {
  const [activeLayout, setActiveLayout] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [productMain, setProductMain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceBoundsUpdate, setPriceBoundsUpdate] = useState(null);
  const {
    price,
    priceBounds,
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
          console.log('🔄 Price bounds need expansion:', {
            current: [currentMin, currentMax],
            new: [newMinPrice, newMaxPrice],
            expanded: newMinPrice < currentMin ? 'min' : 'max'
          });
          
          // Expand bounds to include all products
          const expandedMin = Math.min(currentMin, newMinPrice);
          const expandedMax = Math.max(currentMax, newMaxPrice);
          
          // Check if the new bounds are actually different from current bounds
          if (expandedMin !== currentMin || expandedMax !== currentMax) {
            dispatch({ type: "SET_PRICE_BOUNDS", payload: [expandedMin, expandedMax] });
            console.log('✅ Price bounds expanded to:', [expandedMin, expandedMax]);
            
            // Show notification to user
            setPriceBoundsUpdate({
              message: `Price range updated to $${expandedMin} - $${expandedMax}`,
              type: 'success',
              timestamp: Date.now()
            });
            
            // Auto-hide notification after 5 seconds
            setTimeout(() => setPriceBoundsUpdate(null), 5000);
          } else {
            console.log('💰 Price bounds are already at the correct values');
          }
        } else {
          console.log('💰 Price bounds are current, no expansion needed');
        }
      }
    }
  }, [priceBounds]);



  // Main filtering function
  const applyFilters = useCallback(async () => {
    // Only run filtering if we have products loaded
    if (productMain.length === 0) {
      console.log('⚠️ No products loaded yet, skipping filtering');
      return;
    }

    let filteredProducts = [...productMain];
    console.log('🔍 Starting filtering with', productMain.length, 'products');

    // Apply filters sequentially
    if (brands.length > 0) {
      // Reset to first page when filters change
      dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
      
      filteredProducts = filteredProducts.filter((elm) =>
        brands.every((brand) => elm.filterBrands.includes(brand))
      );
      console.log('🔍 After brand filtering:', filteredProducts.length, 'products');
    }

    if (availability !== "All") {
      filteredProducts = filteredProducts.filter(
        (elm) => availability.value === elm.inStock
      );
      console.log('🔍 After availability filtering:', filteredProducts.length, 'products');
    }

    if (color !== "All") {
      filteredProducts = filteredProducts.filter((elm) =>
        elm.filterColor.includes(color.name)
      );
      console.log('🔍 After color filtering:', filteredProducts.length, 'products');
    }

    if (size !== "All" && size !== "Free Size") {
      filteredProducts = filteredProducts.filter((elm) =>
        elm.filterSizes.includes(size)
      );
      console.log('🔍 After size filtering:', filteredProducts.length, 'products');
    }

    if (activeFilterOnSale) {
      filteredProducts = filteredProducts.filter((elm) => elm.oldPrice);
      console.log('🔍 After sale filtering:', filteredProducts.length, 'products');
    }

    // Filter by parent category - using backend category data
    if (selectedParentCategory) {
      console.log('🎯 Filtering by parent category:', selectedParentCategory.name);
      // Reset to first page when category changes
      dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
      
      // Try backend filtering first, then fallback to client-side filtering
      try {
        const categoryProducts = await getProductsByCategory(selectedParentCategory);
        if (categoryProducts && categoryProducts.length > 0) {
          console.log('✅ Found products for category via backend:', categoryProducts.length);
          // Replace the current products with category-specific products
          filteredProducts = categoryProducts;
          
          // Category products loaded successfully - auto-refresh price bounds
          refreshPriceBounds(categoryProducts);
        } else {
          console.log('⚠️ No products found via backend, trying client-side filtering');
          // Fallback to client-side filtering
          filteredProducts = productMain.filter(product => {
            const productCategoryId = product.category?._id || product.categoryId;
            const selectedCategoryId = selectedParentCategory._id;
            return productCategoryId === selectedCategoryId;
          });
          
          if (filteredProducts.length > 0) {
            console.log('✅ Found products for category via client-side filtering:', filteredProducts.length);
            refreshPriceBounds(filteredProducts);
          } else {
            console.log('⚠️ No products found for this category, showing empty list');
            filteredProducts = [];
          }
        }
      } catch (error) {
        console.log('⚠️ Error fetching products by category, trying client-side filtering:', error.message);
        // Fallback to client-side filtering
        filteredProducts = productMain.filter(product => {
          const productCategoryId = product.category?._id || product.categoryId;
          const selectedCategoryId = selectedParentCategory._id;
          return productCategoryId === selectedCategoryId;
        });
        
        if (filteredProducts.length > 0) {
          console.log('✅ Found products for category via client-side filtering:', filteredProducts.length);
          refreshPriceBounds(filteredProducts);
        } else {
          console.log('⚠️ No products found for this category, showing empty list');
          filteredProducts = [];
        }
      }
    } else {
      // No category selected, show all products
      console.log('🔍 No category selected, showing all products');
      filteredProducts = [...productMain];
    }

    // Filter by sub category - using backend category data
    if (selectedSubCategory) {
      console.log('Filtering by sub category:', selectedSubCategory.name);
      // For sub-categories, we can further filter the already filtered products
      // or implement additional logic as needed
      console.log('Sub-category filtering is active');
    }

    // Filter by price range - NOW ENABLED WITH DYNAMIC PRICING
    if (price && price.length === 2) {
      // Reset to first page when price filter changes
      dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
      
      filteredProducts = filteredProducts.filter(
        (elm) => elm.price >= price[0] && elm.price <= price[1]
      );
      console.log('🔍 After price filtering:', filteredProducts.length, 'products');
    }

    console.log('🎯 Final filtered products:', filteredProducts.length);
    console.log('Selected parent category:', selectedParentCategory?.name);
    console.log('Selected sub category:', selectedSubCategory?.name);
    console.log('💰 Current price range:', price);
    console.log('💰 Available price bounds:', priceBounds);
    console.log('🎨 Current color filter:', color);
    console.log('📏 Current size filter:', size);
    console.log('🏷️ Current brand filters:', brands);
    console.log('📦 Products before filtering:', productMain.length);
    
    dispatch({ type: "SET_FILTERED", payload: filteredProducts });
  }, [productMain, price, availability, color, size, brands, activeFilterOnSale, selectedParentCategory, selectedSubCategory]); // Removed priceBounds and refreshPriceBounds dependencies

  // Main filtering useEffect - removed productMain from dependencies to prevent infinite loop
  useEffect(() => {
    console.log('🔄 Filters changed, applying filters...');
    applyFilters();
  }, [price, availability, color, size, brands, activeFilterOnSale, selectedParentCategory, selectedSubCategory, applyFilters]);

  // Separate useEffect for price bounds calculation when productMain changes
  useEffect(() => {
    if (productMain.length > 0) {
              // Use auto-refresh to ensure price bounds are always current
        refreshPriceBounds(productMain);
    }
  }, [productMain]); // Removed refreshPriceBounds dependency

  // Separate useEffect for price bounds calculation when category changes
  useEffect(() => {
    if (selectedParentCategory && productMain.length > 0) {
      // When category changes, we need to recalculate price bounds based on category products
      // This will be handled by the applyFilters function which fetches category products
      console.log('🔄 Category changed, price bounds will be updated by applyFilters');
    } else if (!selectedParentCategory && productMain.length > 0) {
      // When no category is selected, reset to all products price bounds using auto-refresh
      refreshPriceBounds(productMain);
    }
  }, [selectedParentCategory, productMain]); // Removed refreshPriceBounds dependency

  // Fetch products from backend on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('🚀 Starting to fetch products from backend...');
        const products = await getAllProducts();
        console.log('📦 Fetched products from backend:', products.length);
        console.log('📦 Product details:', products.map(p => ({ title: p.title, price: p.price, imgSrc: p.imgSrc })));
        setProductMain(products);
        
        // Auto-refresh price bounds to ensure they include all products
        refreshPriceBounds(products);
        
        // Also set the initial filtered products to show all products
        dispatch({ type: "SET_FILTERED", payload: products });
        console.log('✅ Set initial filtered products to all products');
        console.log('📊 Initial product details:', products.map(p => ({ 
          title: p.title, 
          price: p.price, 
          category: p.category?.name || 'No Category',
          manufacturer: p.filterBrands?.[0] || 'No Brand'
        })));
        console.log('🚀 Initial state - All products loaded and displayed');
      } catch (error) {
        console.error('❌ Error fetching products:', error);
        setProductMain([]);
      } finally {
        setLoading(false);
        console.log('🏁 Finished loading products');
      }
    };

    fetchProducts();
  }, []); // Removed refreshPriceBounds dependency

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
            console.log('🔄 Periodic check: Price bounds need refresh', {
              current: priceBounds,
              actual: [currentMin, currentMax]
            });
            refreshPriceBounds(productMain);
          }
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [productMain, priceBounds]); // Removed refreshPriceBounds dependency


  
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
