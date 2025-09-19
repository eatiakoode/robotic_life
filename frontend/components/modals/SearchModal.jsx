"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getAllProducts, getRecentlyViewed } from "@/api/product";
import { getParentCategories } from "@/api/category";
import ProductCard1 from "../productCards/ProductCard1";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

// Inline styles for recently viewed compact cards
const recentlyViewedStyles = `
  .recently-viewed-compact {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 16px;
  }
  
  .recently-viewed-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 120px;
    height: 140px;
    background: #ffffff;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    color: inherit;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .recently-viewed-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: #007bff;
  }
  
  .recently-viewed-image {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    border: 1px solid #e9ecef;
    position: relative;
  }
  
  .recently-viewed-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
  
  .recently-viewed-title {
    font-size: 11px;
    font-weight: 500;
    color: #333;
    text-align: center;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-word;
  }
  
  @media (max-width: 768px) {
    .recently-viewed-item {
      width: 100px;
      height: 120px;
    }
    
    .recently-viewed-image {
      width: 70px;
      height: 70px;
    }
    
    .recently-viewed-title {
      font-size: 10px;
    }
  }
  
  /* Search Results Grid Styles - Matching Recent Robots Design */
  .search-results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 16px;
  }
  
  .search-result-card {
    background: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    color: inherit;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #e9ecef;
  }
  
  .search-result-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  .search-result-image-container {
    position: relative;
    width: 100%;
    height: 200px;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .search-result-image-container img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
  
  .search-result-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    padding: 20px 0 15px;
    display: flex;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .search-result-card:hover .search-result-overlay {
    opacity: 1;
  }
  
  .search-result-btn {
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .search-result-btn:hover {
    background: #ffffff;
    transform: scale(1.05);
  }
  
  .search-result-details {
    padding: 16px;
    background: #ffffff;
  }
  
  .search-result-title {
    font-size: 16px;
    font-weight: 700;
    color: #333;
    line-height: 1.3;
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .search-result-manufacturer {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .search-result-price {
    font-size: 16px;
    font-weight: 700;
    color: #333;
  }
  
  /* Search Modal Responsive Styles */
  .modal-search .modal-dialog {
    max-width: 95%;
    margin: 10px auto;
  }
  
  .modal-search .modal-content {
    max-height: 90vh;
    overflow-y: auto;
  }
  
  .form-search {
    margin-bottom: 20px;
  }
  
  .form-search input {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
  }
  
  .form-search button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    padding: 8px;
  }
  
  /* Mobile Responsive Styles */
  @media (max-width: 575px) {
    .modal-search .modal-dialog {
      max-width: 100%;
      margin: 0;
      height: 100vh;
    }
    
    .modal-search .modal-content {
      height: 100vh;
      border-radius: 0;
      max-height: 100vh;
    }
    
    .search-results-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }
    
    .search-result-card {
      max-width: 100%;
    }
    
    .search-result-image-container {
      height: 160px;
    }
    
    .search-result-details {
      padding: 10px;
    }
    
    .search-result-title {
      font-size: 13px;
    }
    
    .search-result-manufacturer {
      font-size: 11px;
    }
    
    .search-result-price {
      font-size: 13px;
    }
    
    .recently-viewed-compact {
      gap: 8px;
    }
    
    .recently-viewed-item {
      width: 80px;
      height: 100px;
    }
    
    .recently-viewed-image {
      width: 60px;
      height: 60px;
    }
    
    .recently-viewed-title {
      font-size: 9px;
    }
    
    .form-search input {
      font-size: 16px; /* Prevents zoom on iOS */
      padding: 12px 15px;
    }
    
    .modal-search h5 {
      font-size: 18px;
      margin-bottom: 15px;
    }
    
    .modal-search h6 {
      font-size: 16px;
      margin-bottom: 12px;
    }
  }
  
  @media (min-width: 576px) and (max-width: 767px) {
    .modal-search .modal-dialog {
      max-width: 90%;
      margin: 20px auto;
    }
    
    .search-results-grid {
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 14px;
    }
    
    .search-result-image-container {
      height: 170px;
    }
    
    .search-result-details {
      padding: 12px;
    }
    
    .search-result-title {
      font-size: 14px;
    }
    
    .search-result-manufacturer {
      font-size: 12px;
    }
    
    .search-result-price {
      font-size: 14px;
    }
  }
  
  @media (min-width: 768px) and (max-width: 991px) {
    .search-results-grid {
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
    }
    
    .search-result-image-container {
      height: 180px;
    }
  }
  
  @media (min-width: 992px) and (max-width: 1199px) {
    .search-results-grid {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 18px;
    }
  }
  
  @media (min-width: 1200px) {
    .search-results-grid {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
  }
`;

export default function SearchModal() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  
  // Use the recently viewed hook for consistent data management
  const { recentlyViewedIds, isInitialized } = useRecentlyViewed();

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
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
        setCategoriesLoading(false);
      }
    };

    loadData();
  }, []);

  // Load recently viewed products when IDs are available
  useEffect(() => {
    const loadRecentlyViewed = async () => {
      if (!isInitialized || !recentlyViewedIds.length) {
        // If no recently viewed IDs, show first 4 products as fallback
        if (allProducts.length > 0) {
          setRecentlyViewed(allProducts.slice(0, 4));
        }
        return;
      }

      try {
        setLoading(true);
        const recentlyViewedProducts = await getRecentlyViewed(recentlyViewedIds);
        setRecentlyViewed(recentlyViewedProducts);
      } catch (error) {
        // Fallback to first 4 products
        if (allProducts.length > 0) {
          setRecentlyViewed(allProducts.slice(0, 4));
        }
      } finally {
        setLoading(false);
      }
    };

    loadRecentlyViewed();
  }, [isInitialized, recentlyViewedIds, allProducts]);

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
    // Navigate to product detail page using slug
    router.push(`/product-detail/${product.slug || product.id}`);
  };
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: recentlyViewedStyles }} />
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
              <div className="search-results-grid">
                {searchResults.map((product, i) => (
                  <div 
                    key={i} 
                    className="search-result-card"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="search-result-image-container">
                      <img 
                        src={product.imgSrc || product.images?.[0] || '/images/product/placeholder.jpg'} 
                        alt={product.title}
                        onError={(e) => {
                          e.target.src = '/images/product/placeholder.jpg';
                        }}
                        loading="lazy"
                      />
                      <div className="search-result-overlay">
                        <button className="search-result-btn">VIEW DETAILS</button>
                      </div>
                    </div>
                    <div className="search-result-details">
                      <div className="search-result-title">
                        {product.title}
                      </div>
                      <div className="search-result-manufacturer">
                        Manufacturer: {product.filterBrands?.[0] || 'Unknown'}
                      </div>
                      <div className="search-result-price">
                        ${product.price ? product.price.toLocaleString() : '0.00'}
                      </div>
                    </div>
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
              <div className="recently-viewed-compact">
                {recentlyViewed.map((product, i) => (
                  <div 
                    key={i} 
                    className="recently-viewed-item"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="recently-viewed-image">
                      <img 
                        src={product.imgSrc || product.images?.[0] || '/images/product/placeholder.jpg'} 
                        alt={product.title}
                        onError={(e) => {
                          e.target.src = '/images/product/placeholder.jpg';
                        }}
                        loading="lazy"
                      />
                    </div>
                    <div className="recently-viewed-title">
                      {product.title}
                    </div>
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
    </>
  );
}
