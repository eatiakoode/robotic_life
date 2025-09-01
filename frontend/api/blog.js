// Frontend API functions for fetching blog data

// Backend API base URL
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000';

// Fallback URLs in case the main one fails
const FALLBACK_URLS = [
  'http://localhost:5000',
  'http://localhost:3001',
  'http://localhost:8000'
];

// Get a single blog by ID
export const getBlogById = async (id) => {
  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];
  
  for (const baseUrl of urlsToTry) {
    try {
      const apiUrl = `${baseUrl}/frontend/api/blog/${id}`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        
        // Handle backend response format
        if (data.status === 'success' && data.data) {
          return data.data;
        } else if (data.data) {
          return data.data;
        }
      }
    } catch (error) {
      continue;
    }
  }
  
  return null;
};

// Get all blogs
export const getAllBlogs = async () => {
  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];
  
  for (const baseUrl of urlsToTry) {
    try {
      const apiUrl = `${baseUrl}/frontend/api/blog`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        
        // Handle backend response format
        if (Array.isArray(data)) {
          return data;
        } else if (data.data && Array.isArray(data.data)) {
          return data.data;
        }
      }
    } catch (error) {
      continue;
    }
  }
  
  return [];
};

// Get blog by slug
export const getBlogBySlug = async (slug) => {
  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];
  
  for (const baseUrl of urlsToTry) {
    try {
      const apiUrl = `${baseUrl}/frontend/api/blog/slug/${slug}`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        
        // Handle backend response format
        if (data.status === 'success' && data.data) {
          return data.data;
        } else if (data.data) {
          return data.data;
        }
      }
    } catch (error) {
      continue;
    }
  }
  
  return null;
};
