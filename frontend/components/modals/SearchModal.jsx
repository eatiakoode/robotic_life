"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getAllProducts } from "@/api/product";
import { getParentCategories } from "@/api/category";
import ProductCard1 from "../productCards/ProductCard1";

export default function SearchModal() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  // Load all products and categories on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setCategoriesLoading(true);
        
        // Load products and categories in parallel
        const [products, categoriesData] = await Promise.all([
          getAllProducts(),
          getParentCategories()
        ]);
        
        setAllProducts(products);
        setCategories(categoriesData);
        
        // Set recently viewed from localStorage or show first 4 products
        const recent = JSON.parse(localStorage.getItem('recentlyViewedRobots') || '[]');
        if (recent.length > 0) {
          setRecentlyViewed(recent.slice(0, 4));
        } else {
          setRecentlyViewed(products.slice(0, 4));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
        setCategoriesLoading(false);
      }
    };

    loadData();
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId;
      return (query) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (query.trim().length > 0) {
            performSearch(query);
          } else {
            setSearchResults([]);
          }
        }, 300);
      };
    })(),
    [allProducts]
  );

  // Perform search
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = allProducts.filter(product => {
      const searchTerm = query.toLowerCase();
      return (
        product.title?.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm) ||
        product.filterBrands?.some(brand => brand.toLowerCase().includes(searchTerm)) ||
        product.filterColor?.some(color => color.toLowerCase().includes(searchTerm)) ||
        product.category?.name?.toLowerCase().includes(searchTerm) ||
        product.launchYear?.toString().includes(searchTerm) ||
        product.version?.toLowerCase().includes(searchTerm)
      );
    });

    setSearchResults(results.slice(0, 8)); // Limit to 8 results
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  // Handle category click - navigate to product listing page
  const handleCategoryClick = (category) => {
    // Close the modal first
    const modal = document.getElementById('search');
    if (modal) {
      const bootstrap = require('bootstrap');
      const modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
    
    // Navigate to product listing page with category filter
    router.push(`/shop-default-grid?category=${encodeURIComponent(category.slug)}&categoryName=${encodeURIComponent(category.name)}&type=parent`);
  };

  // Handle product click (for recently viewed)
  const handleProductClick = (product) => {
    // Add to recently viewed
    const recent = JSON.parse(localStorage.getItem('recentlyViewedRobots') || '[]');
    const updatedRecent = [product, ...recent.filter(p => p.id !== product.id)].slice(0, 10);
    localStorage.setItem('recentlyViewedRobots', JSON.stringify(updatedRecent));
    setRecentlyViewed(updatedRecent.slice(0, 4));
    
    // Navigate to product detail page using slug
    router.push(`/product-detail/${product.slug || product.id}`);
  };
  return (
    <div className="modal fade modal-search" id="search">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="d-flex justify-content-between align-items-center">
            <h5>Search Robots</h5>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <form className="form-search" onSubmit={handleSearchSubmit}>
            <fieldset className="text">
              <input
                type="text"
                placeholder="Search robots, brands, categories..."
                className=""
                name="text"
                tabIndex={0}
                value={searchQuery}
                onChange={handleSearchChange}
                aria-required="true"
                required
              />
            </fieldset>
            <button className="" type="submit">
              <svg
                className="icon"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                  stroke="#181818"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.35 21.0004L17 16.6504"
                  stroke="#181818"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div>
              <h6 className="mb_16">Search Results ({searchResults.length})</h6>
              <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
                {searchResults.map((product, i) => (
                  <div key={i} onClick={() => handleProductClick(product)}>
                    <ProductCard1 product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Popular Robot Categories */}
          <div>
            <h5 className="mb_16">Popular Robot Categories</h5>
            {categoriesLoading ? (
              <div className="text-center py-3">
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading categories...</span>
                </div>
                <p className="text-muted mt-2">Loading categories...</p>
              </div>
            ) : categories.length > 0 ? (
              <ul className="list-tags">
                {categories.map((category, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="radius-60 link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryClick(category);
                      }}
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No categories available</p>
            )}
          </div>

          {/* Recently Viewed Products */}
          <div>
            <h6 className="mb_16">Recently Viewed Robots</h6>
            {loading ? (
              <div className="text-center py-3">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : recentlyViewed.length > 0 ? (
              <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
                {recentlyViewed.map((product, i) => (
                  <div key={i} onClick={() => handleProductClick(product)}>
                    <ProductCard1 product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No recently viewed robots</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
