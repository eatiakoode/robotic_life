"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import { products52 } from "@/data/products";
import React, { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
const tabItems = [
  "Headphone",
  "Mouse",
  "Keyboard",
  "Mousepad",
  "Cables",
  "Networking",
];
export default function Products() {
  const [activeItem, setActiveItem] = useState(tabItems[0]); // Default the first item as active
  const [selectedItems, setSelectedItems] = useState(products52);
  useEffect(() => {
<<<<<<< HEAD
    document.getElementById("newArrivals2").classList.remove("filtered");
    setTimeout(() => {
      setSelectedItems(
        products52.filter((elm) => elm.tabFilterOptions.includes(activeItem))
      );
      document.getElementById("newArrivals2").classList.add("filtered");
    }, 300);
  }, [activeItem]);
=======
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
            <Link href={`/shop-filter-canvas`} className="btn-line">
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
            <Link href={`/shop-filter-canvas`} className="btn-line">
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
            <Link href={`/shop-filter-canvas`} className="btn-line">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    );
  }

>>>>>>> ea24ee4 (Home page & admin panel fixed)
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
              {tabItems.map((item) => (
                <React.Fragment key={item}>
                  <li className="nav-tab-item">
                    <a
                      href={`#`} // Generate href dynamically
                      className={activeItem === item ? "active" : ""}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default anchor behavior
                        setActiveItem(item);
                      }}
                    >
                      {item}
                    </a>
                  </li>{" "}
                  <li className="text-line d-none d-sm-block">/</li>
                </React.Fragment>
              ))}
            </ul>
          </div>
          <Link href={`/shop-filter-canvas`} className="btn-line">
            View All Products
          </Link>
        </div>
        <div className="flat-animate-tab">
          <div className="tab-content">
            <div
              className="tab-pane active show   tabFilter filtered"
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
                {selectedItems.map((product, i) => (
                  <SwiperSlide className="swiper-slide" key={i}>
                    <ProductCard1 product={product} isNotImageRatio />
                  </SwiperSlide>
                ))}

                <div className="sw-pagination-latest sw-dots type-circle justify-content-center spd25" />
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
