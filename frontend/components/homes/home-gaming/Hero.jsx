"use client";
import useSlider from "@/hooks/useSlider";
import React, { useState, useEffect } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";

// Fallback static data in case API fails
const fallbackSlides = [
  {
    _id: "fallback-1",
    title: "Powerful Sound",
    description: "Fill any space with immersive, high-quality audio.",
    buttonText: "View More",
    buttonLink: "/shop-filter-canvas",
    images: ["/images/slider/slider-gaming-1.jpg"]
  },
  {
    _id: "fallback-2", 
    title: "Seamless Listening",
    description: "Enjoy effortless connectivity and crystal-clear audio on the go.",
    buttonText: "Explore Collection",
    buttonLink: "/shop-filter-canvas",
    images: ["/images/slider/slider-gaming-2.jpg"]
  },
  {
    _id: "fallback-3",
    title: "Immerse Yourself", 
    description: "Experience rich, high-fidelity sound for music, gaming, and calls.",
    buttonText: "Explore Collection",
    buttonLink: "/shop-filter-canvas",
    images: ["/images/slider/slider-gaming-3.jpg"]
  }
];

export default function Hero() {
  const { sliders, loading, error } = useSlider();
  const [displaySlides, setDisplaySlides] = useState(fallbackSlides);

  // Function to get the correct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/images/slider/slider-gaming-1.jpg";
    
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
      return `http://localhost:5000/images/slider/${imagePath}`;
    }
    
    // For other cases, try to construct the backend URL
    return `http://localhost:5000/${imagePath}`;
  };

  // Function to render multiple images in equal partitions
  const renderMultipleImages = (images) => {
    if (!images || images.length === 0) {
      return (
        <div className={styles.imageContainer}>
          <Image
            src="/images/slider/slider-gaming-1.jpg"
            alt="default-slider-image"
            className={`lazyload ${styles.sliderImage}`}
            priority
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center center'
            }}
          />
        </div>
      );
    }

    if (images.length === 1) {
      // Single image - full width
      return (
        <div className={styles.imageContainer}>
          <Image
            src={getImageUrl(images[0])}
            alt="slider-image"
            className={`lazyload ${styles.sliderImage}`}
            priority
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center center'
            }}
          />
        </div>
      );
    }

    // Multiple images - create equal partitions
    return (
      <div className={styles.multipleImagesContainer}>
        {images.map((image, index) => (
          <div 
            key={index} 
            className={styles.imagePartition}
            style={{ width: `${100 / images.length}%` }}
          >
            <Image
              src={getImageUrl(image)}
              alt={`slider-image-${index + 1}`}
              className={`lazyload ${styles.partitionImage}`}
              priority
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center center'
              }}
            />
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (sliders && sliders.length > 0) {
      setDisplaySlides(sliders);
    } else if (!loading) {
      setDisplaySlides(fallbackSlides);
    }
  }, [sliders, loading]);

  // Always ensure we have slides to show
  const slidesToShow = displaySlides && displaySlides.length > 0 ? displaySlides : fallbackSlides;

  return (
    <div className="tf-slideshow slider-default slider-effect-fade">
      <Swiper
        dir="ltr"
        className="swiper tf-sw-slideshow"
        loop={slidesToShow.length > 1}
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
        {slidesToShow.map((slide, index) => (
          <SwiperSlide className="swiper-slide" key={slide._id || slide.id || index}>
            <div className={`wrap-slider ${styles.wrapSlider}`}>
              {renderMultipleImages(slide.images)}
              <div className="box-content type-2 type-3">
                <div className="content-slider">
                  <div className="box-title-slider">
                    <p className="fade-item fade-item-1 fw-bold text-white title-display font-5">
                      {slide.title || "Title"}
                    </p>
                    <p className="fade-item fade-item-2 body-text-1 text-white">
                      {slide.description || "Description"}
                    </p>
                  </div>
                  <div className="fade-item fade-item-3 box-btn-slider">
                    <Link
                      href={slide.buttonLink || "/shop-filter-canvas"}
                      className="tf-btn btn-fill btn-white"
                    >
                      <span className="text">{slide.buttonText || "View More"}</span>
                      <i className="icon icon-arrowUpRight" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="wrap-pagination stype-space-3">
        <div className="container">
          <div className="sw-dots sw-pagination-slider type-circle white-circle justify-content-center spd24" />
        </div>
      </div>
    </div>
  );
}
