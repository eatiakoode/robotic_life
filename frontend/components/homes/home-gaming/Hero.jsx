"use client";
import useSlider from "@/hooks/useSlider";
import React, { useState, useEffect } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  const { sliders, loading, error } = useSlider();
  const [displaySlides, setDisplaySlides] = useState([]);

  useEffect(() => {
    if (sliders && sliders.length > 0) {
      setDisplaySlides(sliders);
    } else {
      setDisplaySlides([]);
    }
  }, [sliders]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/images/slider/slider-13-1.jpg";

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    if (imagePath.startsWith("public/")) {
      return `http://localhost:5000/${imagePath}`;
    }

    if (!imagePath.includes("/")) {
      return `http://localhost:5000/images/slider/${imagePath}`;
    }

    return `http://localhost:5000/${imagePath}`;
  };

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="tf-slideshow slider-default slider-effect-fade">
        <div className="wrap-slider" style={{ height: '756px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading sliders...</span>
            </div>
            <p className="mt-3 text-muted">Loading slider content...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state if no slides available
  if (!displaySlides || displaySlides.length === 0) {
    return (
      <div className="tf-slideshow slider-default slider-effect-fade">
        <div className="wrap-slider" style={{ height: '756px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="text-center">
            <h3 className="text-muted">No slider content available</h3>
            <p className="text-muted">Please check your slider configuration in the admin panel.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tf-slideshow slider-default slider-effect-fade">
      <Swiper
        dir="ltr"
        className="swiper tf-sw-slideshow"
        loop={displaySlides.length > 1}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 2000,
        }}
        speed={2000}
        pagination={{
          clickable: true,
          el: ".spd24",
        }}
      >
        {displaySlides.map((slide, index) => (
          <SwiperSlide className="swiper-slide" key={slide._id || slide.id || index}>
            <div className="wrap-slider">
              <Image
                src={getImageUrl(slide.images?.[0] || slide.imageSrc)}
                alt={slide.alt || "slider-image"}
                className="lazyload"
                width={1920}
                height={756}
                priority
              />
              <div className="box-content type-2 type-3 hero-content-responsive">
                <div className="content-slider">
                  <div className="box-title-slider">
                    <span className="fade-item fade-item-1 fw-bold text-white title-display font-5 hero-title-responsive">
                      {slide.title || "Title"}
                    </span>
                    <p className="fade-item fade-item-2 body-text-1 text-white hero-description-responsive">
                      {slide.description || "Description"}
                    </p>
                  </div>
                  <div className="fade-item fade-item-3 box-btn-slider">
                    <Link
                      href={slide.buttonLink || "/shop-default-grid"}
                      className="tf-btn btn-fill btn-white hero-button-responsive"
                    >
                      <span className="text">{slide.buttonText || "Explore Robots"}</span>
                      <i className="icon icon-arrowUpRight" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {displaySlides.length > 1 && (
        <div className="wrap-pagination stype-space-3">
          <div className="container">
            <div className="sw-dots sw-pagination-slider type-circle white-circle justify-content-center spd24" />
          </div>
        </div>
      )}
    </div>
  );
}