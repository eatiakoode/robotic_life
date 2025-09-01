// Additional filtering API functions

// Backend API base URL
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000';

// Fallback URLs in case the main one fails
const FALLBACK_URLS = [
  'http://localhost:5000',
  'http://localhost:3001',
  'http://localhost:8000'
];

// Get filtered products with multiple filters (without requiring category)
export const getFilteredProducts = async (filters = {}) => {
  console.log('🔍 Starting getFilteredProducts with filters:', filters);
  
  try {
    // Build query parameters
    const params = new URLSearchParams();
    
    // Add filters if provided
    if (filters.category) {
      const categoryParam = filters.category.slug || filters.category._id || filters.category;
      params.append('category', categoryParam);
    }
    
    if (filters.colors && filters.colors.length > 0) {
      params.append('colors', filters.colors.join(','));
    }
    
    if (filters.manufacturers && filters.manufacturers.length > 0) {
      params.append('manufacturers', filters.manufacturers.join(','));
    }
    
    if (filters.minPrice !== undefined) {
      params.append('minPrice', filters.minPrice);
    }
    
    if (filters.maxPrice !== undefined) {
      params.append('maxPrice', filters.maxPrice);
    }
    
    const apiUrl = `http://localhost:5000/frontend/api/robot/filter?${params.toString()}`;
    console.log('🔍 Making direct API call to:', apiUrl);
    
    // Simple fetch without timeout for debugging
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('🔍 Response received:', response.status, response.ok);
    
    if (response.ok) {
      const data = await response.json();
      console.log('🔍 API response data:', data);
      
      if (data.success && data.data) {
        console.log('🔍 Raw backend data:', data.data);
        // Transform backend data to match frontend structure
        const transformedProducts = data.data.map((product, index) => {
          // Safe price conversion
          const originalPrice = product.totalPrice;
          const convertedPrice = (() => {
            if (originalPrice === undefined || originalPrice === null || originalPrice === '') return 0;
            const numPrice = Number(originalPrice);
            return isNaN(numPrice) ? 0 : numPrice;
          })();
          
          const transformedProduct = {
            id: product._id || index + 1,
            title: product.title || 'Untitled Product',
            price: convertedPrice,
            imgSrc: product.images && product.images[0] ? 
              (product.images[0].startsWith('public/') ? 
                `http://localhost:5000/${product.images[0].replace('public/', '')}` : 
                `http://localhost:5000/${product.images[0]}`
              ) : 
              `http://localhost:5000/images/products/default.jpg`,
            imgHover: product.images && product.images[1] ? 
              (product.images[1].startsWith('public/') ? 
                `http://localhost:5000/${product.images[1].replace('public/', '')}` : 
                `http://localhost:5000/${product.images[1]}`
              ) : 
              (product.images && product.images[0] ? 
                (product.images[0].startsWith('public/') ? 
                  `http://localhost:5000/${product.images[0].replace('public/', '')}` : 
                  `http://localhost:5000/${product.images[0]}`
                ) : 
                `http://localhost:5000/images/products/default.jpg`
              ),
            description: product.description || '',
            inStock: true,
            
            // Dynamic fields from backend
            filterBrands: product.manufacturer ? [product.manufacturer.name] : ['Default Brand'],
            filterColor: product.color && product.color.length > 0 ? 
              product.color.map(c => c.name) : ['Default Color'],
            filterSizes: ['Default Size'],
            
            // Additional robot-specific fields
            oldPrice: null,
            category: product.category,
            categoryId: product.category?._id || product.category,
            
            // Robot specifications
            slug: product.slug || '',
            launchYear: product.launchYear || null,
            version: product.version || '',
            videoEmbedCode: product.videoEmbedCode || '',
            
            // Dimensions and specifications
            dimensions: product.dimensions || {},
            weight: product.weight || {},
            batteryCapacity: product.batteryCapacity || {},
            batteryChargeTime: product.batteryChargeTime || {},
            loadCapacity: product.loadCapacity || {},
            operatingTemperature: product.operatingTemperature || {},
            range: product.range || {},
            powerSource: product.powerSource || {},
            runtime: product.runtime || {},
            speed: product.speed || {},
            accuracy: product.accuracy || {},
            material: product.material || []
          };
          
          console.log('🔍 Transformed product:', transformedProduct);
          return transformedProduct;
        });
        
        console.log('🔍 Final transformed products:', transformedProducts);
        return transformedProducts;
      } else {
        console.log('🔍 API returned success: false or no data');
        return [];
      }
    } else {
      console.log('🔍 API response not ok:', response.status);
      return [];
    }
  } catch (error) {
    console.error('🔍 Filtering API error:', error);
    return [];
  }
};
