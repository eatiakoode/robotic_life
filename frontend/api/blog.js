// Frontend API functions for fetching blog data

// Backend API base URL
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000';

// Fallback URLs in case the main one fails
const FALLBACK_URLS = [
  'http://localhost:5000',
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

// Get all blogs with pagination
export const getAllBlogs = async (page = 1, limit = 4) => {
  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];
  
  for (const baseUrl of urlsToTry) {
    try {
      const apiUrl = `${baseUrl}/frontend/api/blog?page=${page}&limit=${limit}`;
      
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
        
        // Handle new backend response format with pagination
        if (data.blogs && data.pagination) {
          return {
            blogs: data.blogs,
            pagination: data.pagination
          };
        }
        // Handle old backend response format (fallback)
        else if (Array.isArray(data)) {
          return {
            blogs: data,
            pagination: {
              currentPage: 1,
              totalPages: 1,
              totalBlogs: data.length,
              hasNextPage: false,
              hasPrevPage: false,
              limit: limit
            }
          };
        } else if (data.data && Array.isArray(data.data)) {
          return {
            blogs: data.data,
            pagination: {
              currentPage: 1,
              totalPages: 1,
              totalBlogs: data.data.length,
              hasNextPage: false,
              hasPrevPage: false,
              limit: limit
            }
          };
        }
      }
    } catch (error) {
      continue;
    }
  }
  
  return {
    blogs: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalBlogs: 0,
      hasNextPage: false,
      hasPrevPage: false,
      limit: limit
    }
  };
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

// Get related blogs by blog ID
export const getRelatedBlogs = async (blogId) => {
  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];
  
  for (const baseUrl of urlsToTry) {
    try {
      const apiUrl = `${baseUrl}/frontend/api/blog/related/${blogId}`;
      
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
        if (data.success && data.data) {
          return data.data;
        } else if (data.data) {
          return data.data;
        }
      }
    } catch (error) {
      continue;
    }
  }
  
  return [];
};

// Get all blog categories
export const getBlogCategories = async () => {
  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];
  
  for (const baseUrl of urlsToTry) {
    try {
      const apiUrl = `${baseUrl}/frontend/api/blogcategory`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // Increased timeout
      
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
        if (data.success && data.data && Array.isArray(data.data)) {
          return data.data;
        } else if (Array.isArray(data)) {
          return data;
        } else if (data.data && Array.isArray(data.data)) {
          return data.data;
        }
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Categories fetch error:', error);
      }
      continue;
    }
  }
  
  return [];
};

// Get popular blog tags
export const getBlogTags = async () => {
  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];
  
  for (const baseUrl of urlsToTry) {
    try {
      const apiUrl = `${baseUrl}/frontend/api/blog/tags`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // Increased timeout
      
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
        if (data.success && data.data) {
          const tags = data.data.map(tag => tag._id); // Extract tag names from the aggregation result
          return tags;
        } else if (Array.isArray(data)) {
          const tags = data.map(tag => tag._id);
          return tags;
        }
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Tags fetch error:', error);
      }
      continue;
    }
  }
  
  return [];
};