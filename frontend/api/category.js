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

      }
    } catch (error) {

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


      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

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



        // Since backend now filters by parent, we don't need to filter again
        // Just return the categories directly

        return categories;
      } else {
        const errorText = await response.text();

      }
    } catch (error) {
      if (error.name === 'AbortError') {

      } else {

      }
      continue; // Try next URL
    }
  }


  return [];
};

// Get all categories (both parent and sub) for counting purposes
export const getAllCategories = async () => {
  // Try multiple backend URLs
  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];
  
  for (const baseUrl of urlsToTry) {
    try {
      const apiUrl = `${baseUrl}/frontend/api/category`;

      
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

      }
    } catch (error) {
      if (error.name === 'AbortError') {

      } else {

      }
      continue; // Try next URL
    }
  }
  

  return [];
};

// Get robots by category slug (handles both parent and subcategory)
export const getRobotsByCategorySlug = async (categorySlug) => {
  // Validate categorySlug
  if (!categorySlug) {
    console.warn('⚠️ No categorySlug provided to getRobotsByCategorySlug');
    return [];
  }




  // Try multiple backend URLs
  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];

  for (const baseUrl of urlsToTry) {
    try {
      // Try the original slug first
      let apiUrl = `${baseUrl}/frontend/api/category/${categorySlug}`;
      
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      let response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);


      
      // If not found, try with different case variations
      if (!response.ok && response.status === 404) {

        
        // Try capitalized version
        const capitalizedSlug = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
        apiUrl = `${baseUrl}/frontend/api/category/${capitalizedSlug}`;
        
        const controller2 = new AbortController();
        const timeoutId2 = setTimeout(() => controller2.abort(), 10000);
        
        response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller2.signal
        });
        
        clearTimeout(timeoutId2);

      }

      if (response.ok) {
        const data = await response.json();


        // Handle different response formats
        let robots = [];
        if (data.success && data.data && Array.isArray(data.data)) {
          // Backend returns { success: true, data: [...] }
          robots = data.data;

        } else if (Array.isArray(data)) {
          // Backend returns array directly
          robots = data;

        } else {

          continue; // Try next URL
        }



        return robots;
      } else {
        const errorText = await response.text();

      }
    } catch (error) {
      if (error.name === 'AbortError') {

      } else {

      }
      continue; // Try next URL
    }
  }


  return [];
};

// Get robots by parent category slug (includes all subcategories)
export const getRobotsByParentCategory = async (parentSlug) => {
  // Validate parentSlug
  if (!parentSlug) {
    console.warn('⚠️ No parentSlug provided to getRobotsByParentCategory');
    return [];
  }

  // Try multiple backend URLs
  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];

  for (const baseUrl of urlsToTry) {
    try {
      const apiUrl = `${baseUrl}/frontend/api/category/filter/${parentSlug}`;
      
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

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
        let robots = [];
        if (data.success && data.data && Array.isArray(data.data)) {
          // Backend returns { success: true, data: [...] }
          robots = data.data;
        } else if (Array.isArray(data)) {
          // Backend returns array directly
          robots = data;
        } else {
          continue; // Try next URL
        }

        return robots;
      } else {
        const errorText = await response.text();
        console.warn(`Failed to fetch robots for parent category ${parentSlug}:`, errorText);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.warn(`Request timeout for parent category ${parentSlug}`);
      } else {
        console.warn(`Error fetching robots for parent category ${parentSlug}:`, error);
      }
      continue; // Try next URL
    }
  }

  return [];
};