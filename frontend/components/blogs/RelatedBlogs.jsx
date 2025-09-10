"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { blogPosts6 } from "@/data/blogs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useRelatedBlogs } from "@/hooks/useRelatedBlogs";

export default function RelatedBlogs({ blogId }) {
  // Fetch related blogs from backend
  const { relatedBlogs, loading, error } = useRelatedBlogs(blogId);
  
  // Only use dynamic data, no fallback to static data
  const displayBlogs = relatedBlogs;
  
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center">
              <h3>Related Articles</h3>
              <p className="body-text-1">
                Discover the Hottest Robots News and Research Straight from the
                Runway
              </p>
            </div>
            
            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading related articles...</span>
                </div>
              </div>
            )}
            
            {error && (
              <div className="alert alert-info text-center" role="alert">
                <i className="fas fa-info-circle me-2"></i>
                {error}
              </div>
            )}
            
            {!loading && !error && displayBlogs.length === 0 && (
              <div className="text-center py-5">
                <div className="empty-state">
                  <i className="fas fa-newspaper fa-3x text-muted mb-3"></i>
                  <h5 className="text-muted">No Related Articles Available</h5>
                  <p className="text-muted">
                    There are currently no related articles for this blog post.
                  </p>
                </div>
              </div>
            )}
            
            {displayBlogs.length > 0 && (
              <Swiper
                dir="ltr"
                className="swiper tf-sw-recent"
                slidesPerView={3} 
                spaceBetween={15} 
                breakpoints={{
                  0: {
                    slidesPerView: 1, 
                    spaceBetween: 15,
                  },
                  768: {
                    slidesPerView: 2, 
                    spaceBetween: 15,
                  },
                  1024: {
                    slidesPerView: 3, 
                    spaceBetween: 30,
                  },
                }}
                pagination={{
                  clickable: true, 
                  el: ".spd123",
                }}
                modules={[Pagination]}
              >
                {displayBlogs.map((post, i) => (
                  <SwiperSlide key={post.id || i} className="swiper-slide">
                    <div className="wg-blog style-1 hover-image">
                      <div className="image">
                        <Image
                          className="lazyload"
                          alt={post.alt || ""}
                          src={post.imgSrc}
                          width={615}
                          height={461}
                          onError={(e) => {
                            e.target.src = "/images/blog/blog-details-1.jpg"; 
                          }}
                        />
                      </div>
                      <div className="content">
                        <div className="meta">
                          <div className="meta-item gap-8">
                            <div className="icon">
                              <i className="icon-calendar" />
                            </div>
                            <p className="text-caption-1">{post.date}</p>
                          </div>
                          <div className="meta-item gap-8">
                            <div className="icon">
                              <i className="icon-user" />
                            </div>
                            <p className="text-caption-1">
                              by{" "}
                              <a className="link" href="#">
                                {post.author}
                              </a>
                            </p>
                          </div>
                        </div>
                        <div>
                          <h6 className="title fw-5">
                            <Link
                              className="link"
                              href={`/blog-detail/${post.slug || post.id}`}
                            >
                              {post.title}
                            </Link>
                          </h6>
                          <div className="body-text">
                            {post.description.split(" ").slice(0, 10).join(" ")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

                <div className="sw-pagination-recent sw-dots type-circle d-flex justify-content-center spd123" />
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
