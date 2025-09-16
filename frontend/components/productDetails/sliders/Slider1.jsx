"use client";
import { slides } from "@/data/singleProductSliders";
import { useEffect, useRef, useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

export default function Slider1({
  activeColor = "gray",
  setActiveColor = () => {},
  firstItem,
  slideItems = slides,
  thumbSlidePerView = 6,
  thumbSlidePerViewOnMobile = 6,
  productImages = [], // New prop for robot images
}) {
  // Use robot images if available, otherwise fall back to static slides
  const items =
    productImages && productImages.length > 0
      ? productImages.map((img, index) => ({
          id: index + 1,
          color: activeColor,
          src: img,
          alt: `Robot image ${index + 1}`,
          width: 600,
          height: 800,
        }))
      : [...slideItems];

  // Set first item if provided
  if (firstItem && items.length > 0) {
    items[0].src = firstItem;
  }



  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (items && items.length > 0 && items[activeIndex] && !(items[activeIndex].color == activeColor)) {
      const slideIndex =
        items.filter((elm) => elm.color == activeColor)[0]?.id - 1;
      if (slideIndex >= 0) {
        swiperRef.current?.slideTo(slideIndex);
      }
    }
  }, [activeColor, items, activeIndex]);

  useEffect(() => {
    if (items && items.length > 0) {
      setTimeout(() => {
        if (swiperRef.current) {
          swiperRef.current.slideTo(1);
          const slideIndex = items.filter((elm) => elm.color == activeColor)[0]?.id - 1;
          if (slideIndex >= 0) {
            swiperRef.current.slideTo(slideIndex);
          }
        }
      });
    }
  }, [items, activeColor]);

  // Don't render if no items
  if (!items || items.length === 0) {
    return (
      <div className="thumbs-slider">
        <div className="swiper tf-product-media-main">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="item">
                <Image
                  className="lazyload"
                  src={firstItem || "/images/section/no-image.png"}
                  alt="No image available"
                  width={600}
                  height={800}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="thumbs-slider">
      <Swiper
        className="swiper tf-product-media-thumbs"
        dir="ltr"
        direction="vertical"
        spaceBetween={10}
        slidesPerView={thumbSlidePerView}
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        initialSlide={1}
        breakpoints={{
          0: {
            direction: "horizontal",
            slidesPerView: thumbSlidePerViewOnMobile,
          },
          820: {
            direction: "horizontal",
            slidesPerView:
              thumbSlidePerViewOnMobile < 4
                ? thumbSlidePerViewOnMobile + 1
                : thumbSlidePerViewOnMobile,
          },
          920: {
            direction: "horizontal",
            slidesPerView:
              thumbSlidePerViewOnMobile < 4
                ? thumbSlidePerViewOnMobile + 2
                : thumbSlidePerViewOnMobile,
          },
          1020: {
            direction: "horizontal",
            slidesPerView:
              thumbSlidePerViewOnMobile < 4
                ? thumbSlidePerViewOnMobile + 2.5
                : thumbSlidePerViewOnMobile,
          },
          1200: {
            direction: "vertical",
            slidesPerView: thumbSlidePerView,
          },
        }}
      >
        {items.map((slide, index) => (
          <SwiperSlide
            className="swiper-slide stagger-item"
            data-color={slide.color}
            key={index}
          >
            <div className="item">
              <Image
                className="lazyload"
                data-src={slide.src}
                alt={slide.alt}
                src={slide.src}
                width={slide.width}
                height={slide.height}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        dir="ltr"
        className="swiper tf-product-media-main"
        id="gallery-swiper-started"
        spaceBetween={10}
        slidesPerView={1}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        modules={[Thumbs]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          if (items[swiper.activeIndex]) {
            setActiveIndex(swiper.activeIndex);
            setActiveColor(items[swiper.activeIndex]?.color.toLowerCase());
          }
        }}
      >
        {items.map((slide, index) => (
          <SwiperSlide key={index} className="swiper-slide" data-color="gray">
            <div className="item">
              <Image
                className="lazyload"
                data-src={slide.src}
                alt={slide.alt}
                src={slide.src}
                width={slide.width}
                height={slide.height}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
