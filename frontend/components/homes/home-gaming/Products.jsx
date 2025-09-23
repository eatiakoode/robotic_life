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

  // Set first category as active when categories are loaded
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  // Fetch robots when active category changes
  useEffect(() => {
    if (activeCategory) {
      fetchRobotsByCategory(activeCategory.slug);
    }
  }, [activeCategory]);

  const fetchRobotsByCategory = async (categorySlug) => {
    try {
      setLoading(true);
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://thebotsworld.onrender.com';
      const apiUrl = `${backendUrl}/frontend/api/category/${categorySlug}`;
      
      const response = await fetch(apiUrl);
      
      if (response.ok) {
        const data = await response.json();
        
        // Handle both new format { success: true, data: [...] } and old format [...]
        let robotsData = [];
        if (data.success && Array.isArray(data.data)) {
          // New format: { success: true, data: [...] }
          robotsData = data.data;
        } else if (Array.isArray(data)) {
          // Old format: direct array
          robotsData = data;
        } else {
          console.error('Robots data is not in expected format:', data);
          setRobots([]);
          return;
        }
        
        if (robotsData.length > 0) {
          // Limit to 4 robots per category for Popular Categories display
          const limitedRobotsData = robotsData.slice(0, 4);
          // Limit robots for Popular Categories display
          const transformedRobots = limitedRobotsData.map(robot => {
            const imgSrc = robot.images && robot.images.length > 0 ? 
              (robot.images[0].startsWith('public/') ? 
                `${backendUrl}/${robot.images[0].replace('public/', '')}` : 
                `${backendUrl}/${robot.images[0]}`
              ) : 
              null; // No fallback image - let ProductCard handle it

            const imgHover = robot.images && robot.images.length > 1 ? 
              (robot.images[1].startsWith('public/') ? 
                `${backendUrl}/${robot.images[1].replace('public/', '')}` : 
                `${backendUrl}/${robot.images[1]}`
              ) : 
              imgSrc; // Use imgSrc as fallback for imgHover

            let colors = [];
            if (robot.color && Array.isArray(robot.color) && robot.color.length > 0) {
              colors = robot.color.map(colorItem => ({
                imgSrc: imgSrc,
                bgColor: colorItem.name ? `bg-${colorItem.name.toLowerCase().replace(/\s+/g, '-')}` : 'bg-primary',
                name: colorItem.name || 'Default'
              }));
            } else if (robot.color && typeof robot.color === 'object' && robot.color.name) {
              colors = [{
                imgSrc: imgSrc,
                bgColor: `bg-${robot.color.name.toLowerCase().replace(/\s+/g, '-')}`,
                name: robot.color.name
              }];
            } else if (robot.color && typeof robot.color === 'string' && robot.color.trim() !== '') {
              colors = [{
                imgSrc: imgSrc,
                bgColor: `bg-${robot.color.toLowerCase().replace(/\s+/g, '-')}`,
                name: robot.color
              }];
            } else {
              colors = [{
                imgSrc: imgSrc,
                bgColor: 'bg-secondary',
                name: 'No Color Data'
              }];
            }
            
          // Create the transformed robot object - PRESERVE ALL BACKEND DATA
          const transformedRobot = {
            // Spread the original robot data FIRST to preserve all nested structures
            ...robot,
            
            // Override specific fields for display
            id: robot._id,
            imgSrc: imgSrc,
            imgHover: imgHover,
            price: robot.totalPrice || 0,
            inStock: robot.status !== false,
            oldPrice: robot.oldPrice || null,
            rating: robot.rating || 0,
            isOnSale: robot.isOnSale || false,
            sizes: robot.sizes || null,
            wowDelay: "0.1s",
            colors: colors,
            tabFilterOptions: [activeCategory?.name || ''],
          };
          
            
          return transformedRobot;
          });
          
          setRobots(transformedRobots);
        } else {
          // No robots found for this category
          setRobots([]);
        }
      } else {
        const errorText = await response.text();
        console.error('Robots error response:', errorText);
        setRobots([]);
      }
    } catch (error) {
      console.error('Error fetching robots:', error);
      setRobots([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  if (categoriesLoading) {
    return (
      <section>
        <div className="container">
          <div className="heading-section-4 wow fadeInUp">
            <div className="heading-left">
              <h3 className="heading font-5 fw-bold">Popular Categories</h3>
              <ul className="tab-product style-2 justify-content-sm-center mb-0" role="tablist">
                {[...Array(6)].map((_, index) => (
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
            <Link href="/shop-default-grid" className="btn-line">
              View All Robots
            </Link>
          </div>
          <div className="flat-animate-tab">
            <div className="tab-content">
              <div className="tab-pane active show tabFilter filtered" id="newArrivals2" role="tabpanel">
                <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
                  {[...Array(4)].map((_, index) => (
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

  if (categoriesError || !categories || categories.length === 0) {
    return (
      <section>
        <div className="container">
          <div className="heading-section-4 wow fadeInUp">
            <div className="heading-left">
              <h3 className="heading font-5 fw-bold">Popular Categories</h3>
              <div className="text-center">
                <p className="text-danger">Error loading categories or no categories available.</p>
              </div>
            </div>
            <Link href="/shop-default-grid" className="btn-line">
              View All Robots
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
            <h3 className="heading font-5 fw-bold">Popular Categories</h3>
            <div className="categories-scroll-container">
              <ul
                className="tab-product style-2 justify-content-sm-center mb-0 categories-list"
                role="tablist"
              >
                {categories.map((category, index) => (
                  <React.Fragment key={category._id}>
                    <li className="nav-tab-item">
                      <a
                        href="#"
                        className={activeCategory && activeCategory._id === category._id ? "active" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          handleCategoryClick(category);
                        }}
                      >
                        {category.name}
                      </a>
                    </li>
                    {index < categories.length - 1 && (
                      <li className="text-line d-none d-sm-block">/</li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </div>
          <Link href="/shop-default-grid" className="btn-line">
            View All Robots
          </Link>
        </div>
        <div className="flat-animate-tab">
          <div className="tab-content">
            <div
              className="tab-pane active show tabFilter filtered"
              id="newArrivals2"
              role="tabpanel"
            >
              <Swiper
                dir="ltr"
                className="swiper tf-sw-latest"
                spaceBetween={15}
                modules={[Pagination]}
                slidesPerView={4}
                pagination={{
                  clickable: true,
                  el: ".spd25",
                }}
                breakpoints={{
                  0: { slidesPerView: 2 },
                  575: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  992: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                }}
              >
                {loading ? (
                  [...Array(4)].map((_, index) => (
                    <SwiperSlide className="swiper-slide" key={index}>
                      <div className="card-product wow fadeInUp">
                        <div className="card-product-wrapper">
                          <div className="product-img" style={{ height: '300px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span>Loading...</span>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                ) : (
                  robots.map((product, i) => (
                    <SwiperSlide className="swiper-slide" key={product._id || i}>
                      <ProductCard1 product={product} isNotImageRatio priority={i < 4} />
                    </SwiperSlide>
                  ))
                )}
                <div className="sw-pagination-latest sw-dots type-circle justify-content-center spd25" />
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}