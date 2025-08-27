"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import React, { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import useCategories from "@/hooks/useCategories";

export default function Products() {
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const [activeCategory, setActiveCategory] = useState(null);
  const [robots, setRobots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Debug logging
  console.log('🔍 Products component - categories:', categories);
  console.log('🔍 Products component - categoriesLoading:', categoriesLoading);
  console.log('🔍 Products component - categoriesError:', categoriesError);
  console.log('🔍 Products component - activeCategory:', activeCategory);

  // Set first category as active when categories are loaded
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      console.log('🔍 Setting first category as active:', categories[0]);
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  // Fetch robots when active category changes
  useEffect(() => {
    if (activeCategory) {
      console.log('🔍 Fetching robots for category:', activeCategory);
      fetchRobotsByCategory(activeCategory.slug);
    }
  }, [activeCategory]);

  const fetchRobotsByCategory = async (categorySlug) => {
    try {
      setLoading(true);
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const apiUrl = `${backendUrl}/frontend/api/category/filter/${categorySlug}`;
      
      console.log('🔍 Fetching robots from:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      console.log('🔍 Robots response status:', response.status);
      console.log('🔍 Robots response ok:', response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log('🔍 Robots data received:', data);
        console.log('🔍 Robots data type:', typeof data);
        console.log('🔍 Robots data length:', Array.isArray(data) ? data.length : 'Not an array');
        
        if (Array.isArray(data)) {
          setRobots(data);
        } else {
          console.error('🔍 Robots data is not an array:', data);
          setRobots([]);
        }
      } else {
        const errorText = await response.text();
        console.error('🔍 Robots error response:', errorText);
        setRobots([]);
      }
    } catch (error) {
      console.error('❌ Error fetching robots:', error);
      setRobots([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    console.log('🔍 Category clicked:', category);
    setActiveCategory(category);
  };

  // Show loading state while fetching categories
  if (categoriesLoading) {
    return (
      <section>
        <div className="container">
          <div className="heading-section-4 wow fadeInUp">
            <div className="heading-left">
              <h3 className="heading font-5 fw-bold">Best Sellers</h3>
              <ul className="tab-product style-2 justify-content-sm-center mb-0" role="tablist">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <React.Fragment key={index}>
                    <li className="nav-tab-item">
                      <a href="#" className="active">
                        Loading...
                      </a>
                    </li>
                    <li className="text-line d-none d-sm-block">/</li>
                  </React.Fragment>
                ))}
              </ul>
            </div>
            <Link href={`/shop-collection`} className="btn-line">
              View All Products
            </Link>
          </div>
          <div className="flat-animate-tab">
            <div className="tab-content">
              <div className="tab-pane active show tabFilter filtered" id="newArrivals2" role="tabpanel">
                <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="card-product wow fadeInUp">
                      <div className="card-product-wrapper">
                        <div className="product-img" style={{ height: '300px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span>Loading...</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state if categories failed to load
  if (categoriesError) {
    return (
      <section>
        <div className="container">
          <div className="heading-section-4 wow fadeInUp">
            <div className="heading-left">
              <h3 className="heading font-5 fw-bold">Best Sellers</h3>
              <div className="text-center">
                <p className="text-danger">Error loading categories: {categoriesError}</p>
              </div>
            </div>
            <Link href={`/shop-collection`} className="btn-line">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Show message if no categories
  if (!categories || categories.length === 0) {
    return (
      <section>
        <div className="container">
          <div className="heading-section-4 wow fadeInUp">
            <div className="heading-left">
              <h3 className="heading font-5 fw-bold">Best Sellers</h3>
              <div className="text-center">
                <p>No categories available.</p>
              </div>
            </div>
            <Link href={`/shop-collection`} className="btn-line">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container">
        <div className="heading-section-4 wow fadeInUp">
          <div className="heading-left">
            <h3 className="heading font-5 fw-bold">Best Sellers</h3>
            <ul
              className="tab-product style-2 justify-content-sm-center mb-0"
              role="tablist"
            >
              {categories.map((category, index) => (
                <React.Fragment key={category.id}>
                  <li className="nav-tab-item">
                    <a
                      href={`#`}
                      className={activeCategory && activeCategory.id === category.id ? "active" : ""}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryClick(category);
                      }}
                    >
                      {category.title}
                    </a>
                  </li>
                  {index < categories.length - 1 && (
                    <li className="text-line d-none d-sm-block">/</li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
          <Link href={`/shop-collection`} className="btn-line">
            View All Products
          </Link>
        </div>
        <div className="flat-animate-tab">
          <div className="tab-content">
            <div
              className="tab-pane active show tabFilter filtered"
              id="newArrivals2"
              role="tabpanel"
            >
              <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
                {loading ? (
                  // Loading state for robots
                  [1, 2, 3, 4].map((index) => (
                    <div key={index} className="card-product wow fadeInUp">
                      <div className="card-product-wrapper">
                        <div className="product-img" style={{ height: '300px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span>Loading robots...</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : robots.length > 0 ? (
                  // Display robots
                  robots.map((robot, i) => {
                    const imageSrc = robot.images && robot.images.length > 0 ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/${robot.images[0]}` : '/images/products/product-1.jpg';
                    
                    // Debug: Log the robot color data
                    console.log('🔍 Robot:', robot.title);
                    console.log('🔍 Color field:', robot.color);
                    console.log('🔍 Color type:', typeof robot.color);
                    console.log('🔍 Color isArray:', Array.isArray(robot.color));
                    console.log('🔍 Color keys:', robot.color ? Object.keys(robot.color) : 'No color data');
                    
                    // Construct proper colors array from robot data
                    let colors = [];
                    if (robot.color && Array.isArray(robot.color) && robot.color.length > 0) {
                      // If color is an array of objects with color data
                      console.log('🔍 Processing color as array');
                      colors = robot.color.map(colorItem => ({
                        imgSrc: imageSrc,
                        bgColor: colorItem.name ? `bg-${colorItem.name.toLowerCase().replace(/\s+/g, '-')}` : 'bg-primary',
                        name: colorItem.name || 'Default'
                      }));
                    } else if (robot.color && typeof robot.color === 'object' && robot.color.name) {
                      // If color is a single object
                      console.log('🔍 Processing color as single object');
                      colors = [{
                        imgSrc: imageSrc,
                        bgColor: `bg-${robot.color.name.toLowerCase().replace(/\s+/g, '-')}`,
                        name: robot.color.name
                      }];
                    } else if (robot.color && typeof robot.color === 'string' && robot.color.trim() !== '') {
                      // If color is a string
                      console.log('🔍 Processing color as string');
                      colors = [{
                        imgSrc: imageSrc,
                        bgColor: `bg-${robot.color.toLowerCase().replace(/\s+/g, '-')}`,
                        name: robot.color
                      }];
                    } else {
                      console.log('🔍 No valid color data found, using default');
                    }
                    
                    // If no colors found, provide a default but make it clear it's a fallback
                    if (colors.length === 0) {
                      console.log('🔍 Using fallback color for', robot.title);
                      colors = [{
                        imgSrc: imageSrc,
                        bgColor: 'bg-secondary', // Use different color to indicate it's a fallback
                        name: 'No Color Data'
                      }];
                    }
                    
                    console.log('🔍 Final colors for', robot.title, ':', colors);

                    return (
                      <ProductCard1 
                        key={robot._id || i} 
                        product={{
                          id: robot._id || i,
                          title: robot.title || 'Robot',
                          imgSrc: imageSrc,
                          imgHover: imageSrc, // Use same image for hover to avoid empty string error
                          price: parseFloat(robot.totalPrice) || 0, // Convert to number to fix toFixed error
                          colors: colors, // Provide color data to avoid empty string errors
                          tabFilterOptions: [activeCategory?.title || ''],
                          wowDelay: `${i * 0.1}s`
                        }}
                      />
                    );
                  })
                ) : (
                  // No robots found
                  <div className="col-12 text-center">
                    <p>No robots found for this category.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
