"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useContextElement } from "@/context/Context";
import { Pagination } from "swiper/modules";
import { useTestimonials } from "@/hooks/useTestimonials";

export default function Testimonials2() {
  const { setQuickViewItem } = useContextElement();
  const { testimonials, loading, error } = useTestimonials();
  // Loading state
  if (loading) {
    return (
      <section className="flat-spacing-6">
        <div className="container">
          <div className="heading-section text-center">
            <h3 className="heading wow fadeInUp">Customer Say!</h3>
            <p className="subheading wow fadeInUp">
              Our customers adore our products, and we constantly aim to delight
              them.
            </p>
          </div>
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="flat-spacing-6">
        <div className="container">
          <div className="heading-section text-center">
            <h3 className="heading wow fadeInUp">Customer Say!</h3>
            <p className="subheading wow fadeInUp">
              Our customers adore our products, and we constantly aim to delight
              them.
            </p>
          </div>
          <div className="text-center">
            <p className="text-danger">Failed to load testimonials. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  // No testimonials
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="flat-spacing-6">
        <div className="container">
          <div className="heading-section text-center">
            <h3 className="heading wow fadeInUp">Customer Say!</h3>
            <p className="subheading wow fadeInUp">
              Our customers adore our products, and we constantly aim to delight
              them.
            </p>
          </div>
          <div className="text-center">
            <p>No testimonials available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flat-spacing-6">
      <div className="container">
        <div className="heading-section text-center">
          <h3 className="heading wow fadeInUp">Customer Say!</h3>
          <p className="subheading wow fadeInUp">
            Our customers adore our products, and we constantly aim to delight
            them.
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-sw-testimonial wow fadeInUp"
          data-wow-delay="0.1s"
          spaceBetween={15}
          breakpoints={{
            1024: { slidesPerView: 2 }, // data-preview for larger screens
            768: { slidesPerView: 1.3 }, // data-tablet
            0: { slidesPerView: 1 }, // data-mobile
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd32",
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={item._id || index}>
              <div className="testimonial-item hover-img">
                <div className="img-style">
                  <Image
                    data-src="/images/testimonial/default-testimonial.jpg"
                    alt="Testimonial"
                    src="/images/testimonial/default-testimonial.jpg"
                    width={351}
                    height={468}
                  />
                </div>
                <div className="content">
                  <div className="content-top">
                    <div className="list-star-default">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <i className="icon icon-star" key={i} />
                      ))}
                    </div>
                    <p className="text-secondary">"{item.message}"</p>
                    <div className="box-author">
                      <div className="text-title author">{item.name}</div>
                      <svg
                        className="icon"
                        width={20}
                        height={21}
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0)">
                          <path
                            d="M6.875 11.6255L8.75 13.5005L13.125 9.12549"
                            stroke="#3DAB25"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 18.5005C14.1421 18.5005 17.5 15.1426 17.5 11.0005C17.5 6.85835 14.1421 3.50049 10 3.50049C5.85786 3.50049 2.5 6.85835 2.5 11.0005C2.5 15.1426 5.85786 18.5005 10 18.5005Z"
                            stroke="#3DAB25"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0">
                            <rect
                              width={20}
                              height={20}
                              fill="white"
                              transform="translate(0 0.684082)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div className="box-avt">
                    <div className="avatar avt-60 round">
                      <Image
                        alt="avatar"
                        src="/images/avatar/default-avatar.jpg"
                        width={90}
                        height={91}
                      />
                    </div>
                    <div className="box-price">
                      <p className="text-title text-line-clamp-1">
                        {item.designation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-pagination-testimonial sw-dots type-circle d-flex justify-content-center spd32" />
        </Swiper>
      </div>
    </section>
  );
}
