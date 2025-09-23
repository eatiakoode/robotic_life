"use client";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { useBlogs } from "@/hooks/useBlogs";
import { Calendar } from "lucide-react"; // ✅ calendar icon import

export default function Blogs() {
  const { blogs, loading, error } = useBlogs();

  const transformedBlogs = blogs.map((blog, index) => {
    let imageSrc = "/images/blog/gaming-1.jpg";
    if (blog.logoimage) {
      if (blog.logoimage.startsWith("http")) {
        imageSrc = blog.logoimage;
      } else if (blog.logoimage.includes("/")) {
        const filename = blog.logoimage.split("/").pop();
        imageSrc = `${
          process.env.NEXT_PUBLIC_API_URL || "https://thebotsworld.onrender.com"
        }/images/blogs/${filename}`;
      } else {
        imageSrc = `${
          process.env.NEXT_PUBLIC_API_URL || "https://thebotsworld.onrender.com"
        }/images/blogs/${blog.logoimage}`;
      }
    }

    return {
      id: blog._id || blog.id || index + 1,
      slug: blog.slug || blog._id || blog.id || index + 1,
      imageSrc: imageSrc,
      alt: blog.title || "Blog Image",
      date: blog.createdAt
        ? new Date(blog.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
          })
        : "13 August",
      title: blog.title || "Blog Title",
      delay: `${index * 0.1}s`,
    };
  });

  if (loading) {
    return (
      <section>
        <div className="container">
          <div className="heading-section-2 align-items-center type-2 wow fadeInUp">
            <h3 className="heading font-5 fw-bold">Insights</h3>
            <Link href={`/blog-list`} className="btn-line">
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

  return (
    <section>
      <div className="container">
        <div className="heading-section-2 align-items-center type-2 wow fadeInUp">
          <h3 className="heading font-5 fw-bold">Insights</h3>
          <Link href={`/blog-list`} className="btn-line">
            View All
          </Link>
        </div>

        <Swiper
          className="swiper tf-sw-partner"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: { slidesPerView: 1, spaceBetween: 30 },
            768: { slidesPerView: 2 },
          }}
          modules={[Pagination]}
          pagination={{ clickable: true, el: ".spd29" }}
          dir="ltr"
        >
          {transformedBlogs.map((post) => (
            <SwiperSlide className="swiper-slide" key={post.id}>
              <div
                className="wg-blog style-abs hover-image wow fadeInUp"
                data-wow-delay={post.delay}
              >
                <Link href={`/blog-detail/${post.slug}`} className="image">
                  <img
                    className="lazyload"
                    data-src={post.imageSrc}
                    alt={post.alt}
                    src={post.imageSrc}
                    width={630}
                    height={472}
                    onError={(e) => {
                      e.target.src = "/images/blog/gaming-1.jpg";
                    }}
                  />
                </Link>
                <div className="content">
                  {/* ✅ Date with calendar icon */}
                  <p className="text-btn-uppercase text-secondary-2 text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {post.date}
                  </p>

                  {/* ✅ Title hover effect fix */}
                  <h4 className="title fw-5">
                    <Link
                      className="link"
                      href={`/blog-detail/${post.slug}`}
                      style={{ 
                        textDecoration: 'none',
                        color: 'white',
                        background: 'none',
                        backgroundImage: 'none'
                      }}
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
