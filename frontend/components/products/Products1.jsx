"use client";

import LayoutHandler from "./LayoutHandler";
import Sorting from "./Sorting";
import Listview from "./Listview";
import GridView from "./GridView";
import { useEffect, useReducer, useState } from "react";
import FilterModal from "./FilterModal";
import { initialState, reducer } from "@/reducer/filterReducer";
import { getAllProducts, getProductsByCategory } from "@/api/product";
import FilterMeta from "./FilterMeta";

export default function Products1({ parentClass = "flat-spacing" }) {
  const [activeLayout, setActiveLayout] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [productMain, setProductMain] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    price,
    availability,
    color,
    size,
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

  useEffect(() => {
    const applyFilters = async () => {
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
        
        // Fetch products by category from backend
        try {
          const categoryProducts = await getProductsByCategory(selectedParentCategory._id);
          if (categoryProducts.length > 0) {
            console.log('✅ Found products for category:', categoryProducts.length);
            // Replace the current products with category-specific products
            filteredProducts = categoryProducts;
          } else {
            console.log('⚠️ No products found for this category, showing empty list');
            // If no category products found, show empty list (no robots found)
            filteredProducts = [];
          }
        } catch (error) {
          console.error('❌ Error fetching products by category:', error);
          // On error, show empty list (no robots found)
          filteredProducts = [];
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

      // Filter by price range - TEMPORARILY COMMENTED OUT FOR TESTING
      /*
      filteredProducts = filteredProducts.filter(
        (elm) => elm.price >= price[0] && elm.price <= price[1]
      );
      console.log('🔍 After price filtering:', filteredProducts.length, 'products');
      */

      console.log('🎯 Final filtered products:', filteredProducts.length);
      console.log('Selected parent category:', selectedParentCategory?.name);
      console.log('Selected sub category:', selectedSubCategory?.name);
      console.log('💰 Current price range:', price);
      console.log('🎨 Current color filter:', color);
      console.log('📏 Current size filter:', size);
      console.log('🏷️ Current brand filters:', brands);
      console.log('📦 Products before filtering:', productMain.length);
      
      dispatch({ type: "SET_FILTERED", payload: filteredProducts });
    };

    applyFilters();
  }, [price, availability, color, size, brands, activeFilterOnSale, selectedParentCategory, selectedSubCategory, productMain]);

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
