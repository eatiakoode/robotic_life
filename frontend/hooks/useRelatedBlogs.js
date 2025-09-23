"use client";

import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://thebotsworld.onrender.com';

export const useRelatedBlogs = (blogId) => {
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRelatedBlogs = async () => {
    if (!blogId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/frontend/api/blog/related/${blogId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch related blogs');
      }
      
      const data = await response.json();
      
      if (data.success && data.data) {
        // Transform the backend data to match the expected format
        const transformedBlogs = data.data.map(blog => ({
          id: blog._id,
          imgSrc: blog.logoimage ? 
            (blog.logoimage.startsWith('http') ? 
              blog.logoimage : 
              `${API_BASE_URL}/images/blogs/${blog.logoimage.split('/').pop()}`
            ) : '/images/blog/blog-details-1.jpg',
          alt: blog.title || "Blog Image",
          date: blog.date ? new Date(blog.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }) : "Unknown Date",
          author: blog.source || "Admin",
          title: blog.title || "Blog Title",
          description: blog.description || "No description available",
          slug: blog.slug || blog._id
        }));
        
        setRelatedBlogs(transformedBlogs);
      } else {
        setRelatedBlogs([]);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch related blogs');
      setRelatedBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRelatedBlogs();
  }, [blogId]);

  return { relatedBlogs, loading, error, refetch: fetchRelatedBlogs };
};
