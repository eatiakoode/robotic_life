"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard1 from "../productCards/ProductCard1";
import { getParentCategories, getSubCategories } from "@/api/category";
import { getAllProducts, getRecentlyViewed } from "@/api/product";
import { usePathname } from "next/navigation";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
export default function Nav() {
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [loading, setLoading] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [robots, setRobots] = useState([]);
  const [robotsLoading, setRobotsLoading] = useState(false);
  const leaveTimeoutRef = useRef(null);
  
  // Use the recently viewed hook for consistent data management
  const { recentlyViewedIds, isInitialized } = useRecentlyViewed();

  // Fetch parent categories and subcategories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch parent categories
        const parentCategories = await getParentCategories();
        setCategories(parentCategories);

        // Fetch subcategories for all parent categories
        const subcategoryPromises = parentCategories.map(async (category) => {
          try {
            const subs = await getSubCategories(category._id);
            return { categoryId: category._id, subcategories: subs };
          } catch (error) {
            console.error(
              `Error fetching subcategories for ${category.name}:`,
              error
            );
            return { categoryId: category._id, subcategories: [] };
          }
        });

        const subcategoryResults = await Promise.all(subcategoryPromises);
        const subcategoryMap = {};
        subcategoryResults.forEach((result) => {
          subcategoryMap[result.categoryId] = result.subcategories;
        });

        setSubcategories(subcategoryMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Load recently viewed robots when IDs are available
  useEffect(() => {
    const loadRecentlyViewed = async () => {
      if (!isInitialized || !recentlyViewedIds.length) {
        // If no recently viewed IDs, show empty state
        setRobots([]);
        setRobotsLoading(false);
        return;
      }

      try {
        setRobotsLoading(true);
        const recentlyViewedProducts = await getRecentlyViewed(recentlyViewedIds);
        setRobots(recentlyViewedProducts.slice(0, 4));
      } catch (error) {
        console.error('Error loading recently viewed products:', error);
        setRobots([]);
      } finally {
        setRobotsLoading(false);
      }
    };

    loadRecentlyViewed();
  }, [isInitialized, recentlyViewedIds]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, []);

  // Fetch subcategories when hovering over a parent category
  const handleCategoryHover = async (category) => {
    // Clear any pending leave timeout
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }

    if (!subcategories[category._id]) {
      try {
        const subs = await getSubCategories(category._id);
        setSubcategories((prev) => ({
          ...prev,
          [category._id]: subs,
        }));
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    }
    setHoveredCategory(category);
  };

  // Reset hovered category when mouse leaves the category group
  const handleCategoryLeave = () => {
    // Add a small delay to prevent flickering when moving mouse quickly
    leaveTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 150);
  };

  // Split categories into groups for the 4 columns
  const getCategoriesForColumn = (startIndex, endIndex) => {
    return categories.slice(startIndex, endIndex);
  };

  // Get subcategories for a specific parent category
  const getSubcategoriesForParent = (parentId) => {
    const subs = subcategories[parentId] || [];

    return subs;
  };

  return (
    <>
      {" "}
      <li >
        <a href="/" className="item-link">
          Home
        </a>
      </li>
      <li
        className={`menu-item ${
          pathname.includes("shop-default-grid") ||
          pathname.includes("filter-canvas")
            ? "active"
            : ""
        } `}
      >
        <a href="shop-default-grid" className="item-link">
          Robot
          <i className="icon icon-arrow-down" />
        </a>
        <div className="sub-menu mega-menu" onMouseLeave={handleCategoryLeave}>
          <div className="container">
            <div className="row">
              {loading ? (
                <div className="col-12 text-center py-4">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">
                      Loading categories...
                    </span>
                  </div>
                  <p className="mt-2">Loading robot categories...</p>
                </div>
              ) : (
                <>
                  {/* Column 1 - First quarter of categories */}
                  <div className="col-lg-2">
                    <div className="mega-menu-item">
                      {getCategoriesForColumn(
                        0,
                        Math.ceil(categories.length / 4)
                      ).map((category, index) => (
                        <div
                          key={category._id}
                          className="category-group"
                          style={{ marginBottom: "20px" }}
                          onMouseLeave={handleCategoryLeave}
                        >
                          <div
                            className="menu-heading parent-category"
                            onMouseEnter={() => handleCategoryHover(category)}
                            style={{
                              cursor: "pointer",
                              fontWeight: "bold",
                              color: "#333",
                              fontSize: "16px",
                              marginBottom: "8px",
                              padding: "8px 0",
                              borderBottom: "1px solid #eee",
                            }}
                          >
                            <Link
                              href={`/shop-default-grid?category=${
                                category.slug
                              }&categoryName=${encodeURIComponent(
                                category.name
                              )}&type=parent`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              {category.name}
                            </Link>
                          </div>
                          <ul
                            className="menu-list subcategory-list"
                            style={{ listStyle: "none", padding: 0, margin: 0 }}
                          >
                            {getSubcategoriesForParent(category._id).length >
                            0 ? (
                              getSubcategoriesForParent(category._id).map(
                                (subcategory, subIndex) => (
                                  <li
                                    key={subcategory._id}
                                    className="menu-item-li subcategory-item"
                                    style={{ marginBottom: "4px" }}
                                  >
                                    <Link
                                      href={`/shop-default-grid?category=${
                                        subcategory.slug
                                      }&categoryName=${encodeURIComponent(
                                        subcategory.name
                                      )}&type=subcategory`}
                                      className="menu-link-text"
                                      style={{
                                        paddingLeft: "0px",
                                        fontSize: "14px",
                                        color: "#666",
                                        textDecoration: "none",
                                        display: "block",
                                        padding: "4px 0",
                                        transition: "color 0.2s ease",
                                      }}
                                      onMouseEnter={(e) =>
                                        (e.target.style.color = "#333")
                                      }
                                      onMouseLeave={(e) =>
                                        (e.target.style.color = "#666")
                                      }
                                    >
                                      {subcategory.name}
                                    </Link>
                                  </li>
                                )
                              )
                            ) : (
                              <li
                                className="menu-item-li subcategory-item"
                                style={{ marginBottom: "4px" }}
                              >
                                <span
                                  className="menu-link-text"
                                  style={{
                                    paddingLeft: "0px",
                                    fontSize: "14px",
                                    color: "#999",
                                    display: "block",
                                    padding: "4px 0",
                                    fontStyle: "italic",
                                  }}
                                >
                                  No subcategories found
                                </span>
                              </li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 2 - Second quarter of categories */}
                  <div className="col-lg-2">
                    <div className="mega-menu-item">
                      {getCategoriesForColumn(
                        Math.ceil(categories.length / 4),
                        Math.ceil(categories.length / 2)
                      ).map((category, index) => (
                        <div
                          key={category._id}
                          className="category-group"
                          style={{ marginBottom: "20px" }}
                          onMouseLeave={handleCategoryLeave}
                        >
                          <div
                            className="menu-heading parent-category"
                            onMouseEnter={() => handleCategoryHover(category)}
                            style={{
                              cursor: "pointer",
                              fontWeight: "bold",
                              color: "#333",
                              fontSize: "16px",
                              marginBottom: "8px",
                              padding: "8px 0",
                              borderBottom: "1px solid #eee",
                            }}
                          >
                            <Link
                              href={`/shop-default-grid?category=${
                                category.slug
                              }&categoryName=${encodeURIComponent(
                                category.name
                              )}&type=parent`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              {category.name}
                            </Link>
                          </div>
                          <ul
                            className="menu-list subcategory-list"
                            style={{ listStyle: "none", padding: 0, margin: 0 }}
                          >
                            {getSubcategoriesForParent(category._id).length >
                            0 ? (
                              getSubcategoriesForParent(category._id).map(
                                (subcategory, subIndex) => (
                                  <li
                                    key={subcategory._id}
                                    className="menu-item-li subcategory-item"
                                    style={{ marginBottom: "4px" }}
                                  >
                                    <Link
                                      href={`/shop-default-grid?category=${
                                        subcategory.slug
                                      }&categoryName=${encodeURIComponent(
                                        subcategory.name
                                      )}&type=subcategory`}
                                      className="menu-link-text"
                                      style={{
                                        paddingLeft: "0px",
                                        fontSize: "14px",
                                        color: "#666",
                                        textDecoration: "none",
                                        display: "block",
                                        padding: "4px 0",
                                        transition: "color 0.2s ease",
                                      }}
                                      onMouseEnter={(e) =>
                                        (e.target.style.color = "#333")
                                      }
                                      onMouseLeave={(e) =>
                                        (e.target.style.color = "#666")
                                      }
                                    >
                                      {subcategory.name}
                                    </Link>
                                  </li>
                                )
                              )
                            ) : (
                              <li
                                className="menu-item-li subcategory-item"
                                style={{ marginBottom: "4px" }}
                              >
                                <span
                                  className="menu-link-text"
                                  style={{
                                    paddingLeft: "0px",
                                    fontSize: "14px",
                                    color: "#999",
                                    display: "block",
                                    padding: "4px 0",
                                    fontStyle: "italic",
                                  }}
                                >
                                  No subcategories found
                                </span>
                              </li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 3 - Third quarter of categories */}
                  <div className="col-lg-2">
                    <div className="mega-menu-item">
                      {getCategoriesForColumn(
                        Math.ceil(categories.length / 2),
                        Math.ceil((3 * categories.length) / 4)
                      ).map((category, index) => (
                        <div
                          key={category._id}
                          className="category-group"
                          style={{ marginBottom: "20px" }}
                          onMouseLeave={handleCategoryLeave}
                        >
                          <div
                            className="menu-heading parent-category"
                            onMouseEnter={() => handleCategoryHover(category)}
                            style={{
                              cursor: "pointer",
                              fontWeight: "bold",
                              color: "#333",
                              fontSize: "16px",
                              marginBottom: "8px",
                              padding: "8px 0",
                              borderBottom: "1px solid #eee",
                            }}
                          >
                            <Link
                              href={`/shop-default-grid?category=${
                                category.slug
                              }&categoryName=${encodeURIComponent(
                                category.name
                              )}&type=parent`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              {category.name}
                            </Link>
                          </div>
                          <ul
                            className="menu-list subcategory-list"
                            style={{ listStyle: "none", padding: 0, margin: 0 }}
                          >
                            {getSubcategoriesForParent(category._id).length >
                            0 ? (
                              getSubcategoriesForParent(category._id).map(
                                (subcategory, subIndex) => (
                                  <li
                                    key={subcategory._id}
                                    className="menu-item-li subcategory-item"
                                    style={{ marginBottom: "4px" }}
                                  >
                                    <Link
                                      href={`/shop-default-grid?category=${
                                        subcategory.slug
                                      }&categoryName=${encodeURIComponent(
                                        subcategory.name
                                      )}&type=subcategory`}
                                      className="menu-link-text"
                                      style={{
                                        paddingLeft: "0px",
                                        fontSize: "14px",
                                        color: "#666",
                                        textDecoration: "none",
                                        display: "block",
                                        padding: "4px 0",
                                        transition: "color 0.2s ease",
                                      }}
                                      onMouseEnter={(e) =>
                                        (e.target.style.color = "#333")
                                      }
                                      onMouseLeave={(e) =>
                                        (e.target.style.color = "#666")
                                      }
                                    >
                                      {subcategory.name}
                                    </Link>
                                  </li>
                                )
                              )
                            ) : (
                              <li
                                className="menu-item-li subcategory-item"
                                style={{ marginBottom: "4px" }}
                              >
                                <span
                                  className="menu-link-text"
                                  style={{
                                    paddingLeft: "0px",
                                    fontSize: "14px",
                                    color: "#999",
                                    display: "block",
                                    padding: "4px 0",
                                    fontStyle: "italic",
                                  }}
                                >
                                  No subcategories found
                                </span>
                              </li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 4 - Fourth quarter of categories */}
                  <div className="col-lg-2">
                    <div className="mega-menu-item">
                      {getCategoriesForColumn(
                        Math.ceil((3 * categories.length) / 4),
                        categories.length
                      ).map((category, index) => (
                        <div
                          key={category._id}
                          className="category-group"
                          style={{ marginBottom: "20px" }}
                          onMouseLeave={handleCategoryLeave}
                        >
                          <div
                            className="menu-heading parent-category"
                            onMouseEnter={() => handleCategoryHover(category)}
                            style={{
                              cursor: "pointer",
                              fontWeight: "bold",
                              color: "#333",
                              fontSize: "16px",
                              marginBottom: "8px",
                              padding: "8px 0",
                              borderBottom: "1px solid #eee",
                            }}
                          >
                            <Link
                              href={`/shop-default-grid?category=${
                                category.slug
                              }&categoryName=${encodeURIComponent(
                                category.name
                              )}&type=parent`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              {category.name}
                            </Link>
                          </div>
                          <ul
                            className="menu-list subcategory-list"
                            style={{ listStyle: "none", padding: 0, margin: 0 }}
                          >
                            {getSubcategoriesForParent(category._id).length >
                            0 ? (
                              getSubcategoriesForParent(category._id).map(
                                (subcategory, subIndex) => (
                                  <li
                                    key={subcategory._id}
                                    className="menu-item-li subcategory-item"
                                    style={{ marginBottom: "4px" }}
                                  >
                                    <Link
                                      href={`/shop-default-grid?category=${
                                        subcategory.slug
                                      }&categoryName=${encodeURIComponent(
                                        subcategory.name
                                      )}&type=subcategory`}
                                      className="menu-link-text"
                                      style={{
                                        paddingLeft: "0px",
                                        fontSize: "14px",
                                        color: "#666",
                                        textDecoration: "none",
                                        display: "block",
                                        padding: "4px 0",
                                        transition: "color 0.2s ease",
                                      }}
                                      onMouseEnter={(e) =>
                                        (e.target.style.color = "#333")
                                      }
                                      onMouseLeave={(e) =>
                                        (e.target.style.color = "#666")
                                      }
                                    >
                                      {subcategory.name}
                                    </Link>
                                  </li>
                                )
                              )
                            ) : (
                              <li
                                className="menu-item-li subcategory-item"
                                style={{ marginBottom: "4px" }}
                              >
                                <span
                                  className="menu-link-text"
                                  style={{
                                    paddingLeft: "0px",
                                    fontSize: "14px",
                                    color: "#999",
                                    display: "block",
                                    padding: "4px 0",
                                    fontStyle: "italic",
                                  }}
                                >
                                  No subcategories found
                                </span>
                              </li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <div className="col-lg-4">
                <div className="wrapper-sub-shop">
                  {hoveredCategory &&
                  subcategories[hoveredCategory._id] &&
                  subcategories[hoveredCategory._id].length > 0 ? (
                    <>
                      <div className="menu-heading">
                        Subcategories - {hoveredCategory.name}
                      </div>
                      <ul className="menu-list">
                        {subcategories[hoveredCategory._id].map(
                          (subcategory, index) => (
                            <li key={subcategory._id} className="menu-item-li">
                              <Link
                                href={`/shop-default-grid?category=${
                                  subcategory.slug
                                }&categoryName=${encodeURIComponent(
                                  subcategory.name
                                )}&type=subcategory`}
                                className="menu-link-text"
                              >
                                {subcategory.name}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </>
                  ) : (
                    <>
                      <div className="menu-heading">Recent Robots</div>
                      {robotsLoading ? (
                        <div className="text-center py-3">
                          <div
                            className="spinner-border spinner-border-sm"
                            role="status"
                          >
                            <span className="visually-hidden">
                              Loading robots...
                            </span>
                          </div>
                        </div>
                      ) : robots.length > 0 ? (
                        <Swiper
                          dir="ltr"
                          className="swiper tf-product-header"
                          slidesPerView={2}
                          spaceBetween={20}
                        >
                          {robots.map((robot, i) => (
                            <SwiperSlide
                              key={robot.id || i}
                              className="swiper-slide"
                            >
                              <ProductCard1 product={robot} />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      ) : (
                        <div className="text-center py-3">
                          <p className="text-muted mb-0">No robots available</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li>
        <a href="blog-list" className="item-link">
          Blog
        </a>
      </li>
      <li>
        <a href="about-us" className="item-link">
          About Us
        </a>
      </li>
      <li>
        <a href="contact" className="item-link">
          Contact Us
        </a>
      </li>
    </>
  );
}
