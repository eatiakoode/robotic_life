"use client";

import React, { useState, useEffect } from "react";
import { testimonialAPI } from "@/api/testimonial";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await testimonialAPI.getTestimonials();
        if (response.success) {
          setTestimonials(response.data);
        } else {
          setError("Failed to fetch testimonials");
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to fetch testimonials");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);
  // Loading state
  if (loading) {
    return (
      <section className="flat-spacing">
        <div className="container">
          <div className="heading-section text-center wow fadeInUp">
            <h3 className="heading">Testimonials</h3>
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
      <section className="flat-spacing">
        <div className="container">
          <div className="heading-section text-center wow fadeInUp">
            <h3 className="heading">Testimonials</h3>
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
      <section className="flat-spacing">
        <div className="container">
          <div className="heading-section text-center wow fadeInUp">
            <h3 className="heading">Testimonials</h3>
          </div>
          <div className="text-center">
            <p>No testimonials available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Testimonials</h3>
        </div>
        <Swiper
          className="tf-sw-testimonial wow fadeInUp"
          data-wow-delay="0.1s"
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            768: { slidesPerView: 3 },
            576: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd81",
          }}
          dir="ltr"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={item._id || index}>
              <div
                className="testimonial-item style-4"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="content-top">
                  <div className="box-icon">
                    <i className="icon icon-quote" />
                  </div>
                  <div className="text-title">{item.designation}</div>
                  <p className="text-secondary">"{item.message}"</p>
                  <div className="box-rate-author">
                    <div className="box-author">
                      <div className="text-title author">{item.name}</div>
                    </div>
                    <div className="list-star-default color-primary">
                      {Array(item.rating || 5)
                        .fill(0)
                        .map((_, starIndex) => (
                          <i key={starIndex} className="icon icon-star" />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-pagination-testimonial sw-dots type-circle d-flex justify-content-center spd81" />
        </Swiper>
      </div>
    </section>
  );
}
