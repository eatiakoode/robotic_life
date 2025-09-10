"use client";
import React, { useState, useEffect } from "react";
import { testimonialAPI } from "@/api/testimonial";
import { Navigation } from "swiper/modules";
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
      <section className="flat-spacing pt-0">
        <div className="container">
          <div className="flat-sw-navigation flat-spacing bg-surface radius-20 px_15 home-gaming-testimonials">
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="flat-spacing pt-0">
        <div className="container">
          <div className="flat-sw-navigation flat-spacing bg-surface radius-20 px_15 home-gaming-testimonials">
            <div className="text-center">
              <p className="text-danger">Failed to load testimonials. Please try again later.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No testimonials
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="flat-spacing pt-0">
        <div className="container">
          <div className="flat-sw-navigation flat-spacing bg-surface radius-20 px_15 home-gaming-testimonials">
            <div className="text-center">
              <p>No testimonials available at the moment.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="flat-sw-navigation flat-spacing bg-surface radius-20 px_15 home-gaming-testimonials">
          <Swiper
            dir="ltr"
            className="swiper tf-sw-testimonial"
            spaceBetween={30}
            modules={[Navigation]}
            navigation={{
              prevEl: ".snbp28",
              nextEl: ".snbn28",
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide className="swiper-slide" key={testimonial._id}>
                <div className="testimonial-item-v2 type-space-2 text-center">
                  <div className="quote-box">
                    <span className="icon icon-quote" />
                    <div className="text-btn-uppercase text-secondary-2">
                      Customer Say!
                    </div>
                  </div>
                  <h4>"{testimonial.message}"</h4>
                  <div className="rate-box">
                    <div className="list-star-default">
                      {Array.from({ length: testimonial.rating || 5 }, (_, i) => (
                        <i key={i} className="icon icon-star" />
                      ))}
                    </div>
                    <h6>
                      {testimonial.name}
                      <span className="text-title text-se">
                        / {testimonial.designation}
                      </span>
                    </h6>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="nav-prev-testimonial d-none d-lg-flex nav-sw style-line nav-sw-left space-md snbp28">
            <i className="icon icon-arrLeft" />
          </div>
          <div className="nav-next-testimonial d-none d-lg-flex nav-sw style-line nav-sw-right space-md snbn28">
            <i className="icon icon-arrRight" />
          </div>
        </div>
      </div>
    </section>
  );
}
