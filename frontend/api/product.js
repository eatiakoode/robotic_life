// Frontend product API functions for dynamic product fetching

// Backend API base URL
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000';

// Fallback URLs in case the main one fails
const FALLBACK_URLS = [
  'http://localhost:5000',
  'http://localhost:3001',
  'http://localhost:8000'
];

// Get all products (robots) from backend
export const getAllProducts = async () => {
  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];
  
  for (const baseUrl of urlsToTry) {
    try {
      const apiUrl = `${baseUrl}/frontend/api/robot/all`;
      console.log('🔍 Trying to fetch products from:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 Products response status:', response.status);

            if (response.ok) {
        const data = await response.json();
        console.log('📦 Raw products response:', data);
        
        // Handle new response format with success/data structure
        const products = data.success && data.data ? data.data : data;
        console.log('📦 Processing products:', products.length);
        
        // Transform backend data to match frontend structure
        const transformedProducts = products.map((product, index) => {
           // Debug price conversion
           const originalPrice = product.totalPrice;
           const convertedPrice = (() => {
             if (originalPrice === undefined || originalPrice === null || originalPrice === '') return 0;
             const numPrice = Number(originalPrice);
             return isNaN(numPrice) ? 0 : numPrice;
           })();
           
           console.log(`🔢 Price conversion for ${product.title}: "${originalPrice}" (${typeof originalPrice}) → ${convertedPrice} (${typeof convertedPrice})`);
           
                       return {
              id: product._id || index + 1,
              title: product.title || 'Untitled Product',
              price: convertedPrice, // Safe price conversion with fallback
                             imgSrc: product.images && product.images[0] ? 
                 (product.images[0].startsWith('public/') ? 
                   `${BACKEND_API_URL}/${product.images[0].replace('public/', '')}` : 
                   `${BACKEND_API_URL}/${product.images[0]}`
                 ) : 
                 `${BACKEND_API_URL}/images/products/default.jpg`,
                                           imgHover: product.images && product.images[1] ? 
                (product.images[1].startsWith('public/') ? 
                  `${BACKEND_API_URL}/${product.images[1].replace('public/', '')}` : 
                  `${BACKEND_API_URL}/${product.images[1]}`
                ) : 
                // If no second image, use the same image for hover (no broken hover effect)
                (product.images && product.images[0] ? 
                  (product.images[0].startsWith('public/') ? 
                    `${BACKEND_API_URL}/${product.images[0].replace('public/', '')}` : 
                    `${BACKEND_API_URL}/${product.images[0]}`
                  ) : 
                  `${BACKEND_API_URL}/images/products/default.jpg`
                ),
              description: product.description || '',
              inStock: true, // Default to true since backend doesn't have this field
              
              // Dynamic fields from backend
              filterBrands: product.manufacturer ? [product.manufacturer.name] : ['Default Brand'],
              filterColor: product.color && product.color.length > 0 ? 
                product.color.map(c => c.name) : ['Default Color'],
              filterSizes: ['Default Size'], // Robots don't have sizes like clothes
              
              // Additional robot-specific fields
              oldPrice: null, // No old price in backend
              category: product.category, // Keep original category from backend
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
         });
        
        console.log('✅ Successfully transformed products:', transformedProducts.length);
        console.log('✅ Successfully connected to:', baseUrl);
        
        return transformedProducts;
      } else {
        console.log('❌ Failed to fetch products from:', baseUrl);
      }
    } catch (error) {
      console.error('❌ Error fetching products from:', baseUrl, error);
      continue;
    }
  }
  
  console.error('❌ Failed to fetch products from all URLs');
  return [];
};

// Get filtered products by category
export const getProductsByCategory = async (categoryId) => {
  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];
  
  for (const baseUrl of urlsToTry) {
    try {
      const apiUrl = `${baseUrl}/frontend/api/robot/filter?category=${categoryId}`;
      console.log('🔍 Trying to fetch products by category from:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('📦 Raw category products response:', data);
        
                 if (data.success && data.data) {
           // Transform backend data to match frontend structure
           const transformedProducts = data.data.map((product, index) => {
             // Debug price conversion
             const originalPrice = product.totalPrice;
             const convertedPrice = (() => {
               if (originalPrice === undefined || originalPrice === null || originalPrice === '') return 0;
               const numPrice = Number(originalPrice);
               return isNaN(numPrice) ? 0 : numPrice;
             })();
             
             console.log(`🔢 Category price conversion for ${product.title}: "${originalPrice}" (${typeof originalPrice}) → ${convertedPrice} (${typeof convertedPrice})`);
             
             return {
               id: product._id || index + 1,
               title: product.title || 'Untitled Product',
               price: convertedPrice, // Safe price conversion with fallback
                               imgSrc: product.images && product.images[0] ? 
                  (product.images[0].startsWith('public/') ? 
                    `${baseUrl}/${product.images[0].replace('public/', '')}` : 
                    `${baseUrl}/${product.images[0]}`
                  ) : 
                  `${baseUrl}/images/products/default.jpg`,
                                               imgHover: product.images && product.images[1] ? 
                  (product.images[1].startsWith('public/') ? 
                    `${baseUrl}/${product.images[1].replace('public/', '')}` : 
                    `${baseUrl}/${product.images[1]}`
                  ) : 
                  // If no second image, use the same image for hover (no broken hover effect)
                  (product.images && product.images[0] ? 
                    (product.images[0].startsWith('public/') ? 
                      `${baseUrl}/${product.images[0].replace('public/', '')}` : 
                      `${baseUrl}/${product.images[0]}`
                    ) : 
                    `${baseUrl}/images/products/default.jpg`
                  ),
               description: product.description || '',
               inStock: true,
               
               // Dynamic fields from backend
               filterBrands: product.manufacturer ? [product.manufacturer.name] : ['Default Brand'],
               filterColor: product.color && product.color.length > 0 ? 
                 product.color.map(c => c.name) : ['Default Color'],
               filterSizes: ['Default Size'], // Robots don't have sizes like clothes
               
               // Additional robot-specific fields
               oldPrice: null, // No old price in backend
               category: product.category, // Keep original category from backend
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
           });
          
          console.log('✅ Successfully filtered products by category:', transformedProducts.length);
          return transformedProducts;
        }
      } else {
        console.log('❌ Failed to fetch category products from:', baseUrl);
      }
    } catch (error) {
      console.error('❌ Error fetching category products from:', baseUrl, error);
      continue;
    }
  }
  
  console.error('❌ Failed to fetch category products from all URLs');
  return [];
};
