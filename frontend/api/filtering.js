// Additional filtering API functions

// Backend API base URL
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000';

// Helper function to map color names to CSS classes
const getColorClass = (colorName) => {
  if (!colorName) return 'bg-primary';
  
  const colorMap = {
    'red': 'bg-red',
    'blue': 'bg-blue', 
    'green': 'bg-green',
    'yellow': 'bg-yellow',
    'orange': 'bg-orange',
    'purple': 'bg-purple',
    'violet': 'bg-purple-2',
    'voilet': 'bg-purple-2', // Handle misspelling from backend
    'pink': 'bg-pink',
    'black': 'bg-black',
    'white': 'bg-white',
    'gray': 'bg-gray',
    'grey': 'bg-gray',
    'brown': 'bg-brown',
    'silver': 'bg-silver',
    'gold': 'bg-gold',
    'default': 'bg-primary'
  };
  
  const normalizedColor = colorName.toLowerCase().trim();
  return colorMap[normalizedColor] || `bg-${normalizedColor.replace(/\s+/g, '-')}`;
};

// Fallback URLs in case the main one fails
const FALLBACK_URLS = [
  'http://localhost:5000',
  'http://localhost:8000'
];

// Get filtered products with multiple filters (without requiring category)
export const getFilteredProducts = async (filters = {}) => {
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
    
    if (filters.minWeight !== undefined) {
      params.append('minWeight', filters.minWeight);
    }
    
    if (filters.maxWeight !== undefined) {
      params.append('maxWeight', filters.maxWeight);
    }
    
    if (filters.weightUnit !== undefined) {
      params.append('weightUnit', filters.weightUnit);
    }
    
    const apiUrl = `http://localhost:5000/frontend/api/robot/filter?${params.toString()}`;
    
    // Simple fetch without timeout for debugging
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      
      if (data.success && data.data) {
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
              `http://localhost:5000/images/products/logo1.svg`,
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
                `http://localhost:5000/images/products/logo1.svg`
              ),
            description: product.description || '',
            inStock: true,
            
            // Dynamic fields from backend
            filterBrands: product.manufacturer ? [product.manufacturer.name] : ['Default Brand'],
            filterColor: product.color && product.color.length > 0 ? 
              product.color.map(c => c.name) : ['Default Color'],
            filterSizes: ['Default Size'],
            
            // Colors array for ProductCard component
            colors: product.color && product.color.length > 0 ? 
              product.color.map(colorItem => ({
                imgSrc: product.images && product.images[0] ? 
                  (product.images[0].startsWith('public/') ? 
                    `http://localhost:5000/${product.images[0].replace('public/', '')}` : 
                    `http://localhost:5000/${product.images[0]}`
                  ) : 
                  `http://localhost:5000/images/products/logo1.svg`,
                bgColor: getColorClass(colorItem.name),
                name: colorItem.name || 'Default'
              })) : 
              [{
                imgSrc: product.images && product.images[0] ? 
                  (product.images[0].startsWith('public/') ? 
                    `http://localhost:5000/${product.images[0].replace('public/', '')}` : 
                    `http://localhost:5000/${product.images[0]}`
                  ) : 
                  `http://localhost:5000/images/products/logo1.svg`,
                                  bgColor: getColorClass('Default'),
                name: 'Default'
              }],
            
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
          
          return transformedProduct;
        });
        
        return transformedProducts;
      } else {
        return [];
      }
    } else {
      return [];
    }
  } catch (error) {
    console.error('Filtering API error:', error);
    return [];
  }
};
