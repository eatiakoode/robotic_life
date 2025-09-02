"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Pagination from "../common/Pagination";
import Link from "next/link";
import Image from "next/image";
import { getAllBlogs } from "@/api/blog";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalBlogs: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 4
  });
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getAllBlogs(page, 4);
      setBlogs(response.blogs || []);
      setPagination(response.pagination || pagination);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(1);
  }, []);

  const handlePageChange = (page) => {
    fetchBlogs(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/images/blog/blog-details-1.jpg"; // fallback image
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it's a filename, construct the backend URL
    if (!imagePath.includes('/')) {
      return `http://localhost:5000/images/blogs/${imagePath}`;
    }
    
    // If it's a full path, extract filename and construct URL
    const filename = imagePath.split('/').pop();
    return `http://localhost:5000/images/blogs/${filename}`;
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="main-content-page">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h3>Loading blogs...</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content-page">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mb-lg-30">
            {blogs.length === 0 ? (
              <div className="text-center">
                <h3>No blogs found</h3>
                <p>There are no blogs available at the moment.</p>
              </div>
            ) : (
              blogs.map((post, i) => (
                <div key={i} className="wg-blog style-row hover-image mb_40">
                  <div className="image">
                    <Image
                      className="lazyload"
                      alt={post.title}
                      src={getImageUrl(post.logoimage)}
                      width={600}
                      height={399}
                    />
                  </div>
                  <div className="content">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-10">
                      <div className="meta">
                        <div className="meta-item gap-8">
                          <div className="icon">
                            <i className="icon-calendar" />
                          </div>
                          <p className="text-caption-1">{formatDate(post.date || post.createdAt)}</p>
                        </div>
                        <div className="meta-item gap-8">
                          <div className="icon">
                            <i className="icon-user" />
                          </div>
                          <p className="text-caption-1">
                            by{" "}
                            <a className="link" href="#">
                              {post.source || "Admin"}
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <h5 className="title">
                      <Link className="link" href={`/blog-detail/${post.slug || post._id}`}>
                        {post.title}
                      </Link>
                    </h5>
                    <p>{post.description ? post.description.split(" ").slice(0, 20).join(" ") + "..." : "No description available"}</p>
                    <Link
                      href={`/blog-detail/${post.slug || post._id}`}
                      className="link text-button bot-button"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))
            )}
            {pagination.totalPages > 1 && (
              <ul className="wg-pagination">
                <Pagination 
                  totalPages={pagination.totalPages}
                  currentPage={pagination.currentPage}
                  onPageChange={handlePageChange}
                  totalItems={pagination.totalBlogs}
                  itemsPerPage={pagination.limit}
                />
              </ul>
            )}
          </div>
          <div className="col-lg-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
