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
    buttonText: "Explore Robots",
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
  const [displaySlides, setDisplaySlides] = useState(slides13); // Start with static data

  useEffect(() => {
    if (sliders && sliders.length > 0) {
      setDisplaySlides(sliders);
    } else if (!loading) {
      setDisplaySlides(slides13); // Revert to static data if API fails
    }
  }, [sliders, loading]);

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

  const slidesToShow =
    displaySlides && displaySlides.length > 0 ? displaySlides : slides13;

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
            <div className="wrap-slider">
              <Image
                src={getImageUrl(slide.images?.[0] || slide.imageSrc)}
                alt={slide.alt || "slider-image"}
                className="lazyload"
                width={1920}
                height={756}
                priority
              />
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
                      href={slide.buttonLink || "/shop-default-grid"}
                      className="tf-btn btn-fill btn-white"
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
      <div className="wrap-pagination stype-space-3">
        <div className="container">
          <div className="sw-dots sw-pagination-slider type-circle white-circle justify-content-center spd24" />
        </div>
      </div>
    </div>
  );
}