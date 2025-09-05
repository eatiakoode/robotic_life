"use client";

import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const useAdjacentBlogs = (blogId) => {
  const [adjacentBlogs, setAdjacentBlogs] = useState({
    previous: null,
    next: null,
    current: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdjacentBlogs = async () => {
    if (!blogId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/frontend/api/blog/adjacent/${blogId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch adjacent blogs');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setAdjacentBlogs({
          previous: data.previous,
          next: data.next,
          current: data.current
        });
      } else {
        setAdjacentBlogs({
          previous: null,
          next: null,
          current: null
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch adjacent blogs');
      setAdjacentBlogs({
        previous: null,
        next: null,
        current: null
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdjacentBlogs();
  }, [blogId]);

  return { adjacentBlogs, loading, error, refetch: fetchAdjacentBlogs };
};
