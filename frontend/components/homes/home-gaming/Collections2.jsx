"use client";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import useSubCategories from "@/hooks/useSubCategories";

export default function Collections2() {
  const { subcategories, loading, error } = useSubCategories();

  // Function to get the correct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/images/collections/list-cls/gaming-1.jpg";

    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }

    if (imagePath.startsWith('public/')) {
      return `${process.env.NEXT_PUBLIC_API_URL || 'https://thebotsworld.onrender.com'}/${imagePath}`;
    }

    if (!imagePath.includes('/')) {
      return `${process.env.NEXT_PUBLIC_API_URL || 'https://thebotsworld.onrender.com'}/public/images/category/${imagePath}`;
    }

    return `${process.env.NEXT_PUBLIC_API_URL || 'https://thebotsworld.onrender.com'}/${imagePath}`;
  };

  // Use only API data
  const displayCategories = subcategories && subcategories.length > 0 ? subcategories.slice(0, 3) : [];

  // Show loading state while fetching categories
  if (loading) {
    return (
      <section className="flat-spacing">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading categories...</span>
            </div>
            <p className="mt-3 text-muted">Loading categories...</p>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state if no categories available
  if (error || !displayCategories || displayCategories.length === 0) {
    return (
      <section className="flat-spacing">
        <div className="container">
          <div className="text-center py-5">
            <h4 className="text-muted">No subcategories available</h4>
            <p className="text-muted">Please check your subcategory configuration in the admin panel.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flat-spacing">
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-sw-recent"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            992: {
              spaceBetween: 30,
              slidesPerView: 3,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd26",
          }}
        >
          {displayCategories.map((category, index) => (
            <SwiperSlide className="swiper-slide" key={category._id || category.id || index}>
              <div
                className="collection-default hover-button abs-left-bottom type-2 hover-img wow fadeInUp"
                data-wow-delay={`${index * 0.1}s`}
              >
                <a className="img-style">
                  <Image
                    className="lazyload"
                    data-src={getImageUrl(category.logoimage || category.imageSrc)}
                    alt={category.name || category.alt || 'Category'}
                    src={getImageUrl(category.logoimage || category.imageSrc)}
                    width={410}
                    height={546}
                    onError={(e) => {
                      e.target.src = '/images/collections/list-cls/gaming-1.jpg';
                    }}
                  />
                </a>
                <div className="content text-start">
                  <div className="box-title">
                    <h5 className="title">
                      <Link
                        href={`/shop-default-grid`}
                        className="link text-white fw-bold"
                      >
                        {category.name || category.title || 'Category'}
                      </Link>
                    </h5>
                    <p className="text-white body-text">
                      {category.description || 'No description available'}
                    </p>
                  </div>
                  <div className="box-btn">
                    <Link
                      href={`/shop-default-grid`}
                      className="tf-btn btn-fill btn-white btn-md"
                    >
                      <span className="text">Explore Now</span>
                      <i className="icon icon-arrowUpRight" />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-pagination-recent sw-dots type-circle justify-content-center spd26" />
        </Swiper>
      </div>
    </section>
  );
}