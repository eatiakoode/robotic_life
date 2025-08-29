"use client";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { useBlogs } from "@/hooks/useBlogs";

export default function Blogs() {
  const { blogs, loading, error } = useBlogs();


  
  // Transform backend blog data to match the expected format
  const transformedBlogs = blogs.map((blog, index) => {
    // Fix the image URL - backend stores just filename, need full path
    let imageSrc = "/images/blog/gaming-1.jpg"; // Default fallback
    
    if (blog.logoimage) {
      if (blog.logoimage.startsWith('http')) {
        imageSrc = blog.logoimage; // Already full URL
      } else if (blog.logoimage.includes('/')) {
        // Handle case where backend still returns full path
        const filename = blog.logoimage.split('/').pop();
        imageSrc = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/images/blogs/${filename}`;
      } else {
        // Backend stores just filename, construct full URL
        imageSrc = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/images/blogs/${blog.logoimage}`;
      }
    }
    
    console.log(`Blog ${index}:`, { 
      original: blog.logoimage, 
      transformed: imageSrc,
      title: blog.title,
      hasImage: !!blog.logoimage,
      finalUrl: imageSrc
    });
    
    return {
      id: blog._id || blog.id || index + 1,
      imageSrc: imageSrc,
      alt: blog.title || "Blog Image",
      date: blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'long' 
      }) : "13 August",
      title: blog.title || "Blog Title",
      delay: `${index * 0.1}s`
    };
  });

  if (loading) {
    return (
      <section>
        <div className="container">
          <div className="heading-section-2 align-items-center type-2 wow fadeInUp">
            <h3 className="heading font-5 fw-bold">News &amp; Reviews</h3>
            <Link href={`/shop-filter-canvas`} className="btn-line">
              View All
            </Link>
          </div>
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    // Fallback to original data if there's an error
    const fallbackData = [
      {
        id: 33,
        imageSrc: "/images/blog/gaming-1.jpg",
        alt: "",
        date: "13 August",
        title: "How to Choose the Perfect Gaming Accessories for Maximum Performance",
        delay: "0s",
      },
      {
        id: 34,
        imageSrc: "/images/blog/gaming-2.jpg",
        alt: "",
        date: "17 August",
        title: "Essential Gaming Gear You Need to Enhance Your Setup and Dominate",
        delay: "0s",
      },
    ];
    
    return (
      <section>
        <div className="container">
          <div className="heading-section-2 align-items-center type-2 wow fadeInUp">
            <h3 className="heading font-5 fw-bold">News &amp; Reviews</h3>
            <Link href={`/shop-filter-canvas`} className="btn-line">
              View All
            </Link>
          </div>
          <Swiper
            className="swiper tf-sw-partner"
            spaceBetween={15}
            breakpoints={{
              0: { slidesPerView: 1 },
              575: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 2,
              },
            }}
            modules={[Pagination]}
            pagination={{
              clickable: true,
              el: ".spd29",
            }}
            dir="ltr"
          >
            {fallbackData.map((post) => (
              <SwiperSlide className="swiper-slide" key={post.id}>
                <div
                  className="wg-blog style-abs hover-image wow fadeInUp"
                  data-wow-delay={post.delay}
                >
                  <Link href={`/blog-detail/${post.id}`} className="image">
                    <img
                      className="lazyload"
                      data-src={post.imageSrc}
                      alt={post.alt}
                      src={post.imageSrc}
                      width={630}
                      height={472}
                      onError={(e) => {
                        console.log('Image failed to load:', post.imageSrc);
                        e.target.src = "/images/blog/gaming-1.jpg"; // Fallback image
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully:', post.imageSrc);
                      }}
                    />
                  </Link>
                  <div className="content">
                    <p className="text-btn-uppercase text-secondary-2 text-white">
                      {post.date}
                    </p>
                    <h4 className="title fw-5">
                      <Link
                        className="link text-white"
                        href={`/blog-detail/${post.id}`}
                      >
                        {post.title}
                      </Link>
                    </h4>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="sw-pagination-partner sw-dots type-circle justify-content-center spd29" />
          </Swiper>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container">
        <div className="heading-section-2 align-items-center type-2 wow fadeInUp">
          <h3 className="heading font-5 fw-bold">News &amp; Reviews</h3>
          <Link href={`/shop-filter-canvas`} className="btn-line">
            View All
          </Link>
        </div>
        

        <Swiper
          className="swiper tf-sw-partner"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 2,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd29",
          }}
          dir="ltr"
        >
          {transformedBlogs.map((post) => (
            <SwiperSlide className="swiper-slide" key={post.id}>
              <div
                className="wg-blog style-abs hover-image wow fadeInUp"
                data-wow-delay={post.delay}
              >
                <Link href={`/blog-detail/${post.id}`} className="image">
                  <img
                    className="lazyload"
                    data-src={post.imageSrc}
                    alt={post.alt}
                    src={post.imageSrc}
                    width={630}
                    height={472}
                    onError={(e) => {
                      console.log('Image failed to load:', post.imageSrc);
                      e.target.src = "/images/blog/gaming-1.jpg"; // Fallback image
                    }}
                    onLoad={() => {
                      console.log('Image loaded successfully:', post.imageSrc);
                    }}
                  />
                </Link>
                <div className="content">
                  <p className="text-btn-uppercase text-secondary-2 text-white">
                    {post.date}
                  </p>
                  <h4 className="title fw-5">
                    <Link
                      className="link text-white"
                      href={`/blog-detail/${post.id}`}
                    >
                      {post.title}
                    </Link>
                  </h4>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="sw-pagination-partner sw-dots type-circle justify-content-center spd29" />
        </Swiper>
      </div>
    </section>
  );
}
