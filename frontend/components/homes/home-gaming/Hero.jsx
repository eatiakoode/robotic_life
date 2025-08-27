"use client";
import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { useSliders } from "@/hooks/useSliders";

export default function Hero() {
  const { sliders, loading, error } = useSliders();

  // Handle image load error - fallback to static image
  const handleImageError = (e, fallbackSrc) => {
    console.warn("Image failed to load, using fallback:", {
      failedSrc: e.target.src,
      fallbackSrc: fallbackSrc
    });
    e.target.src = fallbackSrc;
  };

  // Handle image load success
  const handleImageLoad = (e, imageSrc) => {
    console.log("Image loaded successfully:", imageSrc);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="tf-slideshow slider-default slider-effect-fade">
        <div className="wrap-slider" style={{ height: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading sliders...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state (but still display fallback sliders)
  if (error) {
    console.warn("Slider API error, using fallback data:", error);
  }

  // Debug: Log current sliders
  console.log('Current sliders in Hero component:', sliders);
  console.log(`Rendering ${sliders.length} slides in the slider`);

  return (
    <div className="tf-slideshow slider-default slider-effect-fade">
      <Swiper
        dir="ltr"
        className="swiper tf-sw-slideshow"
        loop
        slidesPerView={1}
        spaceBetween={0}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={2000}
        pagination={{
          clickable: true,
          el: ".spd24",
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
      >
        {sliders.map((slide, index) => (
          <SwiperSlide className="swiper-slide" key={slide.id}>
            <div className="wrap-slider">
              <div className="image-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image
                  src={slide.imageSrc}
                  alt={slide.alt}
                  className="lazyload"
                  width={1920}
                  height={756}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center'
                  }}
                  onError={(e) => handleImageError(e, "/images/slider/slider-gaming-1.jpg")}
                  onLoad={(e) => handleImageLoad(e, slide.imageSrc)}
                  priority={index === 0}
                />
              </div>
              <div className="box-content type-2 type-3">
                <div className="content-slider">
                  <div className="box-title-slider">
                    <p className="fade-item fade-item-1 fw-bold text-white title-display font-5">
                      {slide.title}
                    </p>
                    <p className="fade-item fade-item-2 body-text-1 text-white">
                      {slide.description}
                    </p>
                  </div>
                  <div className="fade-item fade-item-3 box-btn-slider">
                    <Link
                      href={slide.buttonLink}
                      className="tf-btn btn-fill btn-white"
                    >
                      <span className="text">{slide.buttonText}</span>
                      <i className="icon icon-arrowUpRight" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="sw-pagination-categories sw-dots type-circle justify-content-center spd24"></div>
    </div>
  );
}
