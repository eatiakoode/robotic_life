"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { products } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard1 from "../productCards/ProductCard1";
import { getParentCategories, getSubCategories } from "@/api/category";
import { usePathname } from "next/navigation";
export default function Nav() {
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [loading, setLoading] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Fetch parent categories and their subcategories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const parentCategories = await getParentCategories();
        setCategories(parentCategories);
        
        // Fetch subcategories for all parent categories
        console.log('🔍 Fetching subcategories for', parentCategories.length, 'parent categories');
        const subcategoryPromises = parentCategories.map(async (category) => {
          try {
            console.log(`🔍 Fetching subcategories for parent: ${category.name} (ID: ${category._id})`);
            const subs = await getSubCategories(category._id);
            console.log(`✅ Found ${subs.length} subcategories for ${category.name}:`, subs);
            return { categoryId: category._id, subcategories: subs };
          } catch (error) {
            console.error(`❌ Error fetching subcategories for ${category.name}:`, error);
            return { categoryId: category._id, subcategories: [] };
          }
        });
        
        const subcategoryResults = await Promise.all(subcategoryPromises);
        const subcategoryMap = {};
        subcategoryResults.forEach(result => {
          subcategoryMap[result.categoryId] = result.subcategories;
        });
        
        console.log('📊 Final subcategory map:', subcategoryMap);
        setSubcategories(subcategoryMap);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories when hovering over a parent category
  const handleCategoryHover = async (category) => {
    if (!subcategories[category._id]) {
      try {
        const subs = await getSubCategories(category._id);
        setSubcategories(prev => ({
          ...prev,
          [category._id]: subs
        }));
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    }
    setHoveredCategory(category);
  };

  // Split categories into groups for the 4 columns
  const getCategoriesForColumn = (startIndex, endIndex) => {
    return categories.slice(startIndex, endIndex);
  };

  // Get subcategories for a specific parent category
  const getSubcategoriesForParent = (parentId) => {
    const subs = subcategories[parentId] || [];
    console.log(`🔍 Getting subcategories for parent ${parentId}:`, subs);
    return subs;
  };

  return (
    <>
      {" "}
      <li
      // className={`menu-item ${
      //   [...demoItems].some(
      //     (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
      //   )
      //     ? "active"
      //     : ""
      // } `}
      >
        <a href="/" className="item-link">
          Home
          {/* <i className="icon icon-arrow-down" /> */}
        </a>
        {/* <div className="sub-menu mega-menu">
          <div className="container">
            <div className="row-demo">
              {demoItems.slice(0, 12).map((item, index) => (
                <div
                  className={`demo-item ${
                    pathname.split("/")[1] === item.href.split("/")[1]
                      ? "active"
                      : ""
                  }`}
                  key={item.href}
                >
                  <Link href={item.href}>
                    <div className="demo-image position-relative">
                      <Image
                        className="lazyload"
                        data-src={item.src}
                        alt={item.alt}
                        src={item.src}
                        width={273}
                        height={300}
                      />
                      {item.label.length > 0 && (
                        <div className="demo-label">
                          {item.label.map((label, labelIndex) => (
                            <span
                              key={labelIndex}
                              className={`demo-${label.toLowerCase()}`}
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="demo-name">{item.name}</span>
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-center view-all-demo">
              <a href="#modalDemo" data-bs-toggle="modal" className="tf-btn">
                <span className="text">View All Demos</span>
              </a>
            </div>
          </div>
        </div> */}
      </li>
      <li
        className={`menu-item ${
          pathname.includes('shop-default-grid') || pathname.includes('filter-canvas')
            ? "active"
            : ""
        } `}
      >
        <a href="filter-canvas" className="item-link">
          Robot
          <i className="icon icon-arrow-down" />
        </a>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="row">
              {loading ? (
                <div className="col-12 text-center py-4">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading categories...</span>
                  </div>
                  <p className="mt-2">Loading robot categories...</p>
                </div>
              ) : (
                <>
                  {/* Column 1 - First quarter of categories */}
                  <div className="col-lg-2">
                    <div className="mega-menu-item">
                      {getCategoriesForColumn(0, Math.ceil(categories.length / 4)).map((category, index) => (
                        <div key={category._id} className="category-group">
                          <div 
                            className="menu-heading parent-category"
                            onMouseEnter={() => handleCategoryHover(category)}
                            style={{ cursor: 'pointer', fontWeight: 'bold', color: '#333' }}
                          >
                            <Link 
                              href={`/shop-default-grid?category=${category._id}&categoryName=${encodeURIComponent(category.name)}`}
                              style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                              {category.name}
                            </Link>
                          </div>
                          <ul className="menu-list subcategory-list">
                            {getSubcategoriesForParent(category._id).length > 0 ? (
                              getSubcategoriesForParent(category._id).map((subcategory, subIndex) => (
                                <li key={subcategory._id} className="menu-item-li subcategory-item">
                                  <Link 
                                    href={`/shop-default-grid?category=${subcategory._id}&categoryName=${encodeURIComponent(subcategory.name)}`} 
                                    className="menu-link-text"
                                    style={{ paddingLeft: '15px', fontSize: '0.9em' }}
                                  >
                                    {subcategory.name}
                                  </Link>
                                </li>
                              ))
                            ) : (
                              <li className="menu-item-li subcategory-item">
                                <span className="menu-link-text" style={{ paddingLeft: '15px', fontSize: '0.9em', color: '#999' }}>
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
                      {getCategoriesForColumn(Math.ceil(categories.length / 4), Math.ceil(categories.length / 2)).map((category, index) => (
                        <div key={category._id} className="category-group">
                          <div 
                            className="menu-heading parent-category"
                            onMouseEnter={() => handleCategoryHover(category)}
                            style={{ cursor: 'pointer', fontWeight: 'bold', color: '#333' }}
                          >
                            <Link 
                              href={`/shop-default-grid?category=${category._id}&categoryName=${encodeURIComponent(category.name)}`}
                              style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                              {category.name}
                            </Link>
                          </div>
                          <ul className="menu-list subcategory-list">
                            {getSubcategoriesForParent(category._id).length > 0 ? (
                              getSubcategoriesForParent(category._id).map((subcategory, subIndex) => (
                                <li key={subcategory._id} className="menu-item-li subcategory-item">
                                  <Link 
                                    href={`/shop-default-grid?category=${subcategory._id}&categoryName=${encodeURIComponent(subcategory.name)}`} 
                                    className="menu-link-text"
                                    style={{ paddingLeft: '15px', fontSize: '0.9em' }}
                                  >
                                    {subcategory.name}
                                  </Link>
                                </li>
                              ))
                            ) : (
                              <li className="menu-item-li subcategory-item">
                                <span className="menu-link-text" style={{ paddingLeft: '15px', fontSize: '0.9em', color: '#999' }}>
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
                      {getCategoriesForColumn(Math.ceil(categories.length / 2), Math.ceil(3 * categories.length / 4)).map((category, index) => (
                        <div key={category._id} className="category-group">
                          <div 
                            className="menu-heading parent-category"
                            onMouseEnter={() => handleCategoryHover(category)}
                            style={{ cursor: 'pointer', fontWeight: 'bold', color: '#333' }}
                          >
                            <Link 
                              href={`/shop-default-grid?category=${category._id}&categoryName=${encodeURIComponent(category.name)}`}
                              style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                              {category.name}
                            </Link>
                          </div>
                          <ul className="menu-list subcategory-list">
                            {getSubcategoriesForParent(category._id).length > 0 ? (
                              getSubcategoriesForParent(category._id).map((subcategory, subIndex) => (
                                <li key={subcategory._id} className="menu-item-li subcategory-item">
                                  <Link 
                                    href={`/shop-default-grid?category=${subcategory._id}&categoryName=${encodeURIComponent(subcategory.name)}`} 
                                    className="menu-link-text"
                                    style={{ paddingLeft: '15px', fontSize: '0.9em' }}
                                  >
                                    {subcategory.name}
                                  </Link>
                                </li>
                              ))
                            ) : (
                              <li className="menu-item-li subcategory-item">
                                <span className="menu-link-text" style={{ paddingLeft: '15px', fontSize: '0.9em', color: '#999' }}>
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
                      {getCategoriesForColumn(Math.ceil(3 * categories.length / 4), categories.length).map((category, index) => (
                        <div key={category._id} className="category-group">
                          <div 
                            className="menu-heading parent-category"
                            onMouseEnter={() => handleCategoryHover(category)}
                            style={{ cursor: 'pointer', fontWeight: 'bold', color: '#333' }}
                          >
                            <Link 
                              href={`/shop-default-grid?category=${category._id}&categoryName=${encodeURIComponent(category.name)}`}
                              style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                              {category.name}
                            </Link>
                          </div>
                          <ul className="menu-list subcategory-list">
                            {getSubcategoriesForParent(category._id).length > 0 ? (
                              getSubcategoriesForParent(category._id).map((subcategory, subIndex) => (
                                <li key={subcategory._id} className="menu-item-li subcategory-item">
                                  <Link 
                                    href={`/shop-default-grid?category=${subcategory._id}&categoryName=${encodeURIComponent(subcategory.name)}`} 
                                    className="menu-link-text"
                                    style={{ paddingLeft: '15px', fontSize: '0.9em' }}
                                  >
                                    {subcategory.name}
                                  </Link>
                                </li>
                              ))
                            ) : (
                              <li className="menu-item-li subcategory-item">
                                <span className="menu-link-text" style={{ paddingLeft: '15px', fontSize: '0.9em', color: '#999' }}>
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
                  {hoveredCategory && subcategories[hoveredCategory._id] && subcategories[hoveredCategory._id].length > 0 ? (
                    <>
                      <div className="menu-heading">Subcategories - {hoveredCategory.name}</div>
                      <ul className="menu-list">
                        {subcategories[hoveredCategory._id].map((subcategory, index) => (
                          <li key={subcategory._id} className="menu-item-li">
                            <Link 
                              href={`/shop-default-grid?category=${subcategory._id}&categoryName=${encodeURIComponent(subcategory.name)}`} 
                              className="menu-link-text"
                            >
                              {subcategory.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <>
                      <div className="menu-heading">Recent Products</div>
                      <Swiper
                        dir="ltr"
                        className="swiper tf-product-header"
                        slidesPerView={2}
                        spaceBetween={20}
                      >
                        {products
                          .slice(0, 4)
                          .map((elm) => ({
                            ...elm,
                            colors: null,
                          }))
                          .map((elm, i) => (
                            <SwiperSlide key={i} className="swiper-slide">
                              <ProductCard1 product={elm} />
                            </SwiperSlide>
                          ))}
                      </Swiper>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      {/* <li
        className={`menu-item ${
          [...productLinks, ...swatchLinks, ...productFeatures].some(
            (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
          )
            ? "active"
            : ""
        } `}
      >
        <a href="#" className="item-link">
          Products
          <i className="icon icon-arrow-down" />
        </a>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="mega-menu-item">
                  <div className="menu-heading">Products Layout</div>
                  <ul className="menu-list">
                    {productLinks.map((link, index) => (
                      <li
                        key={index}
                        className={`menu-item-li ${
                          pathname.split("/")[1] == link.href.split("/")[1]
                            ? "active"
                            : ""
                        } `}
                      >
                        <Link href={link.href} className="menu-link-text">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="mega-menu-item">
                  <div className="menu-heading">Colors Swatched</div>
                  <ul className="menu-list">
                    {swatchLinks.map((link, index) => (
                      <li
                        key={index}
                        className={`menu-item-li ${
                          pathname.split("/")[1] == link.href.split("/")[1]
                            ? "active"
                            : ""
                        } `}
                      >
                        <Link href={link.href} className="menu-link-text">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="mega-menu-item">
                  <div className="menu-heading">Products Features</div>
                  <ul className="menu-list">
                    {productFeatures.map((link, index) => (
                      <li
                        key={index}
                        className={`menu-item-li ${
                          pathname.split("/")[1] == link.href.split("/")[1]
                            ? "active"
                            : ""
                        } `}
                      >
                        <Link
                          href={link.href}
                          className={`menu-link-text ${
                            link.badge ? "position-relative" : ""
                          } `}
                        >
                          {link.name}
                          {link.badge && (
                            <div className="demo-label">
                              <span className="demo-new">{link.badge}</span>
                            </div>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="menu-heading">Best seller</div>
                <div className="sec-cls-header">
                  <div className="collection-position hover-img">
                    <Link href={`/shop-collection`} className="img-style">
                      <Image
                        className="lazyload"
                        data-src="/images/collections/cls-header.jpg"
                        alt="banner-cls"
                        src="/images/collections/cls-header.jpg"
                        width={300}
                        height={400}
                      />
                    </Link>
                    <div className="content">
                      <div className="title-top">
                        <h4 className="title">
                          <Link
                            href={`/shop-collection`}
                            className="link text-white wow fadeInUp"
                          >
                            Shop our top picks
                          </Link>
                        </h4>
                        <p className="desc text-white wow fadeInUp">
                          Reserved for special occasions
                        </p>
                      </div>
                      <div>
                        <Link
                          href={`/shop-collection`}
                          className="tf-btn btn-md btn-white"
                        >
                          <span className="text">Shop Now</span>
                          <i className="icon icon-arrowUpRight" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li> */}
      <li
      // className={`menu-item position-relative ${
      //   [...blogLinks].some(
      //     (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
      //   )
      //     ? "active"
      //     : ""
      // } `}
      >
        <a href="blog-list" className="item-link">
          Blog
          {/* <i className="icon icon-arrow-down" /> */}
        </a>
        {/* <div className="sub-menu submenu-default">
          <ul className="menu-list">
            {blogLinks.map((link, index) => (
              <li
                key={index}
                className={`menu-item-li ${
                  pathname.split("/")[1] == link.href.split("/")[1]
                    ? "active"
                    : ""
                } `}
              >
                <Link href={link.href} className="menu-link-text">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div> */}
      </li>
      <li
      // className={`menu-item position-relative ${
      //   [...otherPageLinks].some(
      //     (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
      //   )
      //     ? "active"
      //     : ""
      // } `}
      >
        <a href="about-us" className="item-link">
          About Us
          {/* <i className="icon icon-arrow-down" /> */}
        </a>

        {/* <div className="sub-menu submenu-default">
          <ul className="menu-list">
            {otherPageLinks.map((link, index) => (
              <li
                key={index}
                className={`menu-item-li ${
                  pathname.split("/")[1] == link.href.split("/")[1]
                    ? "active"
                    : ""
                } `}
              >
                <Link href={link.href} className="menu-link-text">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div> */}
      </li>
      <li>
        <a href="contact" className="item-link">
          Contact
          {/* <i className="icon icon-arrow-down" /> */}
        </a>
      </li>
      {/* <li className="menu-item">
        <a href="https://themeforest.net/user/themesflat" className="item-link">
          Buy Theme
        </a>
      </li> */}
    </>
  );
}
