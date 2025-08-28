"use client";

import { collections17 } from "@/data/collections";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
export default function Collections2() {
<<<<<<< HEAD
=======
  const { categories, loading, error } = useCategories();

  // Fallback data if API fails
  const fallbackCategories = [
    {
      _id: "fallback-1",
      name: "ACCESSORIES",
      description: "Clear sound, all-day comfort.",
      logoimage: "/images/collections/list-cls/gaming-1.jpg"
    },
    {
      _id: "fallback-2",
      name: "ACCESSORIES", 
      description: "Style meets functionality.",
      logoimage: "/images/collections/list-cls/gaming-2.jpg"
    },
    {
      _id: "fallback-3",
      name: "ROG GAMING MOUSE",
      description: "Unleash Speed, Accuracy, and Control for the Ultimate Gaming Edge!",
      logoimage: "/images/collections/list-cls/gaming-3.jpg"
    }
  ];

  // Function to get the correct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/images/collections/list-cls/gaming-1.jpg";
    
    // If the image path is already a full URL, return it as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // If it's a relative path starting with 'public/', construct the backend URL
    if (imagePath.startsWith('public/')) {
      return `http://localhost:5000/${imagePath}`;
    }
    
    // If it's just a filename, construct the backend URL
    if (!imagePath.includes('/')) {
      return `http://localhost:5000/public/images/category/${imagePath}`;
    }
    
    // For other cases, try to construct the backend URL
    return `http://localhost:5000/${imagePath}`;
  };

  // Use API data if available, otherwise fallback
  const displayCategories = categories && categories.length > 0 ? categories.slice(0, 3) : fallbackCategories;

  // Show loading state while fetching categories
  if (loading) {
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
            {[1, 2, 3].map((index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div
                  className="collection-default hover-button abs-left-bottom type-2 hover-img wow fadeInUp"
                  data-wow-delay="0s"
                >
                  <a className="img-style">
                    <Image
                      className="lazyload"
                      data-src="/images/collections/list-cls/gaming-1.jpg"
                      alt="Loading..."
                      src="/images/collections/list-cls/gaming-1.jpg"
                      width={410}
                      height={546}
                    />
                  </a>
                  <div className="content text-start">
                    <div className="box-title">
                      <h5 className="title">
                        <Link
                          href={`/shop-filter-canvas`}
                          className="link text-white fw-bold"
                        >
                          Loading...
                        </Link>
                      </h5>
                      <p className="text-white body-text">
                        Please wait while we fetch categories...
                      </p>
                    </div>
                    <div className="box-btn">
                      <Link
                        href={`/shop-filter-canvas`}
                        className="tf-btn btn-fill btn-white btn-md"
                      >
                        <span className="text">Shop now</span>
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

>>>>>>> ea24ee4 (Home page & admin panel fixed)
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
          {collections17.map((collection) => (
            <SwiperSlide className="swiper-slide" key={collection.id}>
              <div
                className="collection-default hover-button abs-left-bottom type-2 hover-img wow fadeInUp"
                data-wow-delay={collection.delay}
              >
                <a className="img-style">
                  <Image
                    className="lazyload"
                    data-src={collection.imageSrc}
                    alt={collection.alt}
                    src={collection.imageSrc}
                    width={410}
                    height={546}
                  />
                </a>
                <div className="content text-start">
                  <div className="box-title">
                    <h5 className="title">
                      <Link
                        href={`/shop-filter-canvas`}
                        className="link text-white fw-bold"
                      >
                        {collection.title}
                      </Link>
                    </h5>
                    <p className="text-white body-text">
                      {collection.description}
                    </p>
                  </div>
                  <div className="box-btn">
                    <Link
                      href={`/shop-filter-canvas`}
                      className="tf-btn btn-fill btn-white btn-md"
                    >
                      <span className="text">Shop now</span>
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
