"use client";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import useSubCategories from "@/hooks/useSubCategories";

// Static fallback data from your provided static code
const staticCollections17 = [
  {
    id: 1,
    imageSrc: "/images/collections/list-cls/gaming-1.jpg",
    alt: "Category 1",
    title: "Headphones Collection",
    description: "Clear sound, all-day comfort.",
    delay: "0s",
  },
  {
    id: 2,
    imageSrc: "/images/collections/list-cls/gaming-2.jpg",
    alt: "Category 2",
    title: "Laptop Collection",
    description: "Style meets functionality.",
    delay: "0.1s",
  },
  {
    id: 3,
    imageSrc: "/images/collections/list-cls/gaming-3.jpg",
    alt: "Category 3",
    title: "Mouse & Keyboard",
    description: "Unleash Speed, Accuracy, and Control for the Ultimate Gaming Edge!",
    delay: "0.2s",
  },
];

export default function Collections2() {
  const { subcategories, loading, error } = useSubCategories();

  // Function to get the correct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/images/collections/list-cls/gaming-1.jpg";

    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }

    if (imagePath.startsWith('public/')) {
      return `http://localhost:5000/${imagePath}`;
    }

    if (!imagePath.includes('/')) {
      return `http://localhost:5000/public/images/category/${imagePath}`;
    }

    return `http://localhost:5000/${imagePath}`;
  };

  // Use API data if available, otherwise fallback to static data
  const displayCategories = subcategories && subcategories.length > 0 ? subcategories.slice(0, 3) : staticCollections17;

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
            <SwiperSlide className="swiper-slide" key={category._id || category.id || index}>
              <div
                className="collection-default hover-button abs-left-bottom type-2 hover-img wow fadeInUp"
                data-wow-delay={`${index * 0.1}s`}
              >
                <a className="img-style">
                  <Image
                    className="lazyload"
                    data-src={getImageUrl(category.logoimage || category.imageSrc)}
                    alt={category.name || category.alt || 'Category'}
                    src={getImageUrl(category.logoimage || category.imageSrc)}
                    width={410}
                    height={546}
                    onError={(e) => {
                      e.target.src = staticCollections17[index]?.imageSrc || '/images/collections/list-cls/gaming-1.jpg';
                    }}
                  />
                </a>
                <div className="content text-start">
                  <div className="box-title">
                    <h5 className="title">
                      <Link
                        href="/shop-filter-canvas"
                        className="link text-white fw-bold"
                      >
                        {category.name || category.title || 'Category'}
                      </Link>
                    </h5>
                    <p className="text-white body-text">
                      {category.description || 'No description available'}
                    </p>
                  </div>
                  <div className="box-btn">
                    <Link
                      href="/shop-filter-canvas"
                      className="tf-btn btn-fill btn-white btn-md"
                    >
                      <span className="text">Explore Now</span>
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