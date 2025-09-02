"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { blogPosts6 } from "@/data/blogs";
import { getAllBlogs, getBlogCategories, getBlogTags } from "@/api/blog";

export default function Sidebar() {
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [tagsLoading, setTagsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        setLoading(true);
        const response = await getAllBlogs(1, 5); // Get 5 recent posts
        setRecentPosts(response.blogs || []);
      } catch (error) {
        console.error('Error fetching recent posts:', error);
        setRecentPosts([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const response = await getBlogCategories();
        setCategories(response || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    const fetchTags = async () => {
      try {
        setTagsLoading(true);
        const response = await getBlogTags();
        setTags(response || []);
      } catch (error) {
        console.error('Error fetching tags:', error);
        setTags([]);
      } finally {
        setTagsLoading(false);
      }
    };

    fetchRecentPosts();
    fetchCategories();
    fetchTags();
  }, []);

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
  return (
    <div className="sidebar maxw-360">

      <div className="sidebar-item sidebar-relatest-post">
        <h5 className="sidebar-heading">Relatest Post</h5>
        <div>
          {loading ? (
            <div className="text-center">
              <p>Loading recent posts...</p>
            </div>
          ) : recentPosts.length > 0 ? (
            recentPosts.map((post, i) => (
              <div
                key={post._id || i}
                className={`relatest-post-item ${
                  i != 0 ? "style-row" : ""
                } hover-image `}
              >
                <div className="image">
                  <Image
                    className="lazyload"
                    alt={post.title}
                    src={getImageUrl(post.logoimage)}
                    width={540}
                    height={360}
                  />
                </div>
                <div className="content">
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
                  <h6 className="title fw-5">
                    <Link className="link" href={`/blog-detail/${post.slug || post._id}`}>
                      {post.title ? post.title.split(" ").slice(0, 8).join(" ") : "No title"}
                    </Link>
                  </h6>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <p>No recent posts available</p>
            </div>
          )}
        </div>
      </div>
      <div className="sidebar-item sidebar-categories">
        <h5 className="sidebar-heading">Categories</h5>
        <ul>
          {categoriesLoading ? (
            <li>
              <span className="text-button">Loading categories...</span>
            </li>
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <li key={category._id}>
                {/* Category links can be used to filter blogs by category */}
                <a className="text-button link" href={`/blogs?category=${category._id}`}>
                  {category.title}
                </a>
              </li>
            ))
          ) : (
            <li>
              <span className="text-button">No categories available</span>
            </li>
          )}
        </ul>
      </div>
      <div className="sidebar-item sidebar-tag">
        <h5 className="sidebar-heading">Popular Tag</h5>
        <ul className="list-tags">
          {tagsLoading ? (
            <li>
              <span className="text-caption-1">Loading tags...</span>
            </li>
          ) : tags.length > 0 ? (
            tags.map((tag, index) => (
              <li key={index}>
                {/* Tag links can be used to filter blogs by tag */}
                <a href={`/blogs?tag=${encodeURIComponent(tag)}`} className="text-caption-1 link">
                  {tag}
                </a>
              </li>
            ))
          ) : (
            <li>
              <span className="text-caption-1">No tags available</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
