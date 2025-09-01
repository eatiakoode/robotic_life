// Frontend category API functions for product filters

// Backend API base URL - you can change this to match your backend URL
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000';

// Fallback URLs in case the main one fails
const FALLBACK_URLS = [
  'http://localhost:5000',
  'http://localhost:3001', 
  'http://localhost:8000'
];

// Get all parent categories (categories with no parent)
export const getParentCategories = async () => {
  // Try multiple backend URLs
  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];
  
  for (const baseUrl of urlsToTry) {
    try {
      const apiUrl = `${baseUrl}/frontend/api/category?parent=null`;
      console.log('🔍 Fetching parent categories from:', apiUrl);
      
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
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
        console.log('📥 Parent categories response:', data);
        
        // Handle different response formats
        let categories = [];
        if (data.success && data.data && Array.isArray(data.data)) {
          // Backend returns { success: true, data: [...] }
          categories = data.data;
        } else if (Array.isArray(data)) {
          // Backend returns array directly
          categories = data;
        } else {
          continue; // Try next URL
        }
        
        console.log('✅ Parent categories found:', categories.length);
        return categories;
      } else {
        console.log('❌ Failed to fetch parent categories, status:', response.status);
      }
    } catch (error) {
      console.log('❌ Error fetching parent categories:', error);
      continue; // Try next URL
    }
  }
  
  return [];
};

// Get sub-categories by parent category ID
export const getSubCategories = async (parentId) => {
  // Validate parentId
  if (!parentId) {
    console.warn('⚠️ No parentId provided to getSubCategories');
    return [];
  }

  // Try multiple backend URLs
  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];
  
  for (const baseUrl of urlsToTry) {
    try {
      const apiUrl = `${baseUrl}/frontend/api/category?parent=${parentId}`;
      console.log('🔍 Trying to fetch sub-categories from:', apiUrl, 'for parent:', parentId);
      
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
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
        console.log('📥 Raw response from backend:', data);
        
        // Handle different response formats
        let categories = [];
        if (data.success && data.data && Array.isArray(data.data)) {
          // Backend returns { success: true, data: [...] }
          categories = data.data;
        } else if (Array.isArray(data)) {
          // Backend returns array directly
          categories = data;
        } else {
          console.log('⚠️ Unexpected response format:', data);
          continue; // Try next URL
        }
        
        console.log('📋 All categories from backend:', categories);
        
        // Filter to only sub-categories (parent field matches the given parentId)
        const subCategories = categories.filter(category => {
          console.log(`🔍 Checking category: ${category.name}, parent: ${category.parent}, looking for: ${parentId}`);
          return category.parent === parentId;
        });
        
        console.log(`✅ Filtered subcategories for parent ${parentId}:`, subCategories);
        return subCategories;
      } else {
        console.log('❌ Failed to fetch sub-categories from:', baseUrl, 'Status:', response.status);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('⏰ Request timeout for:', baseUrl);
      } else {
        console.log('❌ Error fetching sub-categories from:', baseUrl, error.message);
      }
      continue; // Try next URL
    }
  }
  
  console.log('⚠️ Failed to fetch sub-categories from all URLs, returning empty array');
  return [];
};

// Get all categories (both parent and sub) for counting purposes
export const getAllCategories = async () => {
  // Try multiple backend URLs
  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];
  
  for (const baseUrl of urlsToTry) {
    try {
      const apiUrl = `${baseUrl}/frontend/api/category`;
      console.log('🔍 Trying to fetch all categories from:', apiUrl);
      
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
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
        
        // Handle different response formats
        let categories = [];
        if (data.success && data.data && Array.isArray(data.data)) {
          // Backend returns { success: true, data: [...] }
          categories = data.data;
        } else if (Array.isArray(data)) {
          // Backend returns array directly
          categories = data;
        } else {
          continue; // Try next URL
        }
        
        return categories;
      } else {
        console.log('❌ Failed to fetch all categories from:', baseUrl, 'Status:', response.status);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('⏰ Request timeout for:', baseUrl);
      } else {
        console.log('❌ Error fetching all categories from:', baseUrl, error.message);
      }
      continue; // Try next URL
    }
  }
  
  console.log('⚠️ Failed to fetch all categories from all URLs, returning empty array');
  return [];
};
