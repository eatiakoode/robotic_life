"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { blogPosts6 } from "@/data/blogs";
import { getAllBlogs, getRelatedBlogs, getBlogCategories, getBlogTags } from "@/api/blog";

/**
 * SidebarWithRelated Component
 * 
 * A dynamic sidebar that can show either related posts or recent posts
 * 
 * @param {string} blogId - Optional blog ID. If provided, shows related posts for that blog.
 *                         If null/undefined, shows recent posts instead.
 * 
 * Usage examples:
 * - <SidebarWithRelated /> - Shows recent posts
 * - <SidebarWithRelated blogId="64a1b2c3d4e5f6789012345" /> - Shows related posts
 */
export default function SidebarWithRelated({ blogId = null }) {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [tagsLoading, setTagsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        let response;
        
        if (blogId) {
          // Fetch related posts if blogId is provided
          response = await getRelatedBlogs(blogId);
          setPosts(response || []);
        } else {
          // Fetch recent posts if no blogId
          const recentResponse = await getAllBlogs(1, 5);
          setPosts(recentResponse.blogs || []);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
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

    fetchPosts();
    fetchCategories();
    fetchTags();
  }, [blogId]);

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
      <div className="sidebar-item sidebar-search">
        <form className="form-search" onSubmit={(e) => e.preventDefault()}>
          <fieldset className="text">
            <input
              type="email"
              placeholder="Your email address"
              className=""
              name="email"
              tabIndex={0}
              defaultValue=""
              aria-required="true"
              required
            />
          </fieldset>
          <button className="" type="submit">
            <svg
              className="icon"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="#181818"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.35 21.0004L17 16.6504"
                stroke="#181818"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
      <div className="sidebar-item sidebar-relatest-post">
        <h5 className="sidebar-heading">{blogId ? "Related Post" : "Relatest Post"}</h5>
        <div>
          {loading ? (
            <div className="text-center">
              <p>Loading posts...</p>
            </div>
          ) : posts.length > 0 ? (
            posts.map((post, i) => (
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
              <p>No posts available</p>
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
