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
      const apiUrl = `${baseUrl}/frontend/api/category`;
      console.log('🔍 Trying to fetch parent categories from:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      if (response.ok) {
        const data = await response.json();
        console.log('📦 Raw API response:', data);
        
        // Handle different response formats
        let categories = [];
        if (data.success && data.data && Array.isArray(data.data)) {
          // Backend returns { success: true, data: [...] }
          categories = data.data;
          console.log('✅ Using success.data format');
        } else if (Array.isArray(data)) {
          // Backend returns array directly
          categories = data;
          console.log('✅ Using direct array format');
        } else {
          console.error('❌ Unexpected response format:', data);
          continue; // Try next URL
        }
        
        // Filter to only parent categories (no parent field or parent is null)
        const parentCategories = categories.filter(category => !category.parent);
        console.log('🎯 Filtered parent categories:', parentCategories);
        console.log('✅ Successfully connected to:', baseUrl);
        
        return parentCategories;
      } else {
        const errorText = await response.text();
        console.error('❌ Response error text:', errorText);
        console.log('❌ Failed to fetch from:', baseUrl);
      }
    } catch (error) {
      console.error('❌ Error fetching from:', baseUrl, error);
      continue; // Try next URL
    }
  }
  
  console.error('❌ Failed to fetch parent categories from all URLs');
  return [];
};

// Get sub-categories by parent category ID
export const getSubCategories = async (parentId) => {
  // Try multiple backend URLs
  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];
  
  for (const baseUrl of urlsToTry) {
    try {
      const apiUrl = `${baseUrl}/frontend/api/category`;
      console.log('Trying to fetch sub-categories from:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Raw sub-categories API response:', data);
        
        // Handle different response formats
        let categories = [];
        if (data.success && data.data && Array.isArray(data.data)) {
          // Backend returns { success: true, data: [...] }
          categories = data.data;
        } else if (Array.isArray(data)) {
          // Backend returns array directly
          categories = data;
        } else {
          console.error('Unexpected response format:', data);
          continue; // Try next URL
        }
        
        // Filter to only sub-categories (parent field matches the given parentId)
        const subCategories = categories.filter(category => category.parent === parentId);
        console.log('Filtered sub-categories:', subCategories);
        console.log('Successfully connected to:', baseUrl);
        
        return subCategories;
      } else {
        console.log('Failed to fetch sub-categories from:', baseUrl);
      }
    } catch (error) {
      console.error('Error fetching sub-categories from:', baseUrl, error);
      continue; // Try next URL
    }
  }
  
  console.error('Failed to fetch sub-categories from all URLs');
  return [];
};

// Get all categories (both parent and sub) for counting purposes
export const getAllCategories = async () => {
  // Try multiple backend URLs
  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];
  
  for (const baseUrl of urlsToTry) {
    try {
      const apiUrl = `${baseUrl}/frontend/api/category`;
      console.log('Trying to fetch all categories from:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Raw all categories API response:', data);
        
        // Handle different response formats
        let categories = [];
        if (data.success && data.data && Array.isArray(data.data)) {
          // Backend returns { success: true, data: [...] }
          categories = data.data;
        } else if (Array.isArray(data)) {
          // Backend returns array directly
          categories = data;
        } else {
          console.error('Unexpected response format:', data);
          continue; // Try next URL
        }
        
        console.log('Successfully connected to:', baseUrl);
        return categories;
      } else {
        console.log('Failed to fetch all categories from:', baseUrl);
      }
    } catch (error) {
      console.error('Error fetching all categories from:', baseUrl, error);
      continue; // Try next URL
    }
  }
  
  console.error('Failed to fetch all categories from all URLs');
  return [];
};
