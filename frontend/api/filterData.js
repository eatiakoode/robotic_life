// Frontend API functions for fetching filter data (colors, manufacturers)

// Backend API base URL
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://thebotsworld.onrender.com';

// Fallback URLs in case the main one fails
const FALLBACK_URLS = [
  'https://thebotsworld.onrender.com',
  'http://localhost:8000'
];

// Get all colors from backend
export const getAllColors = async () => {
  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];
  
  for (const baseUrl of urlsToTry) {
    try {
      const apiUrl = `${baseUrl}/frontend/api/color`;
      
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
        const colors = data.success && data.data ? data.data : data;
        
        // Transform to match frontend structure with CSS classes
        const transformedColors = colors.map(color => ({
          name: color.name,
          bgColor: getColorClassName(color.name) // Map to CSS class
        }));
        
        return transformedColors;
      }
    } catch (error) {
      continue;
    }
  }
  
  return [];
};

// Get all manufacturers from backend
export const getAllManufacturers = async () => {
  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];
  
  for (const baseUrl of urlsToTry) {
    try {
      const apiUrl = `${baseUrl}/frontend/api/manufacturer`;
      
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
        const manufacturers = data.success && data.data ? data.data : data;
        
        // Transform to match frontend structure
        const transformedManufacturers = manufacturers.map(manufacturer => ({
          id: manufacturer._id,
          label: manufacturer.name,
          count: manufacturer.robotCount || 0
        }));
        
        return transformedManufacturers;
      }
    } catch (error) {
      continue;
    }
  }
  
  return [];
};

// Helper function to map color names to CSS classes
const getColorClassName = (colorName) => {
  const colorMappings = {
    'Pink': 'bg-light-pink-2',
    'Red': 'bg-red',
    'Beige': 'bg-beige-2',
    'Orange': 'bg-orange-2',
    'Green': 'bg-light-green',
    'Black': 'bg-main',
    'White': 'bg-white line-black',
    'Purple': 'bg-purple-2',
    'Violet': 'bg-purple-2',
    'Voilet': 'bg-purple-2', // Handle misspelling from backend
    'Grey': 'bg-grey',
    'Gray': 'bg-grey',
    'Light Blue': 'bg-light-blue-5',
    'Blue': 'bg-light-blue-5',
    'Dark Blue': 'bg-dark-blue',
    'Yellow': 'bg-yellow',
    'Brown': 'bg-brown',
    'Silver': 'bg-grey',
    'Gold': 'bg-yellow'
  };
  
  return colorMappings[colorName] || 'bg-grey'; // Default to grey if not found
};
