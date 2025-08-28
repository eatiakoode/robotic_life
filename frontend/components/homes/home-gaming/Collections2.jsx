"use client";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import useCategories from "@/hooks/useCategories";

export default function Collections2() {
  const { categories, loading, error } = useCategories();

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

  // Display dynamic categories (first 3 categories)
  const displayCategories = categories.slice(0, 3);

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
            <SwiperSlide className="swiper-slide" key={category.id}>
              <div
                className="collection-default hover-button abs-left-bottom type-2 hover-img wow fadeInUp"
                data-wow-delay={`${index * 0.1}s`}
              >
                <a className="img-style">
                  <Image
                    className="lazyload"
                    data-src={category.imageSrc}
                    alt={category.title}
                    src={category.imageSrc}
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
                        href={`/shop-filter-canvas`}
                        className="link text-white fw-bold"
                      >
                        {category.title}
                      </Link>
                    </h5>
                    <p className="text-white body-text">
                      {category.description}
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
