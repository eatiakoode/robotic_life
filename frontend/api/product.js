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
      
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        
        // Handle new response format with success/data structure
        const products = data.success && data.data ? data.data : data;

        




        // Transform backend data to match frontend structure
        const transformedProducts = products.map((product, index) => {
           // Safe price conversion
           const originalPrice = product.totalPrice;
           const convertedPrice = (() => {
             if (originalPrice === undefined || originalPrice === null || originalPrice === '') return 0;
             const numPrice = Number(originalPrice);
             return isNaN(numPrice) ? 0 : numPrice;
           })();
           
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
              slug: product.slug && product.slug.trim() ? product.slug : null,
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
        

        
        return transformedProducts;
      }
    } catch (error) {
      continue;
    }
  }
  
  return [];
};

// Get robot by slug
export const getRobotBySlug = async (slug) => {
  if (!slug) {
    console.warn('⚠️ No slug provided to getRobotBySlug');
    return null;
  }

  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];
  
  for (const baseUrl of urlsToTry) {
    try {
      const apiUrl = `${baseUrl}/frontend/api/robot/slug/${slug}`;

      
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        console.log('📥 Robot by slug response:', data);
        
        if (data.success && data.data) {
          // Transform backend data to match frontend structure
          const robot = data.data;
          
          // Safe price conversion
          const originalPrice = robot.totalPrice;
          const convertedPrice = (() => {
            if (originalPrice === undefined || originalPrice === null || originalPrice === '') return 0;
            const numPrice = Number(originalPrice);
            return isNaN(numPrice) ? 0 : numPrice;
          })();
          
          const transformedRobot = {
            id: robot._id,
            title: robot.title || 'Untitled Robot',
            price: convertedPrice,
            imgSrc: robot.images && robot.images[0] ? 
              (robot.images[0].startsWith('public/') ? 
                `${baseUrl}/${robot.images[0].replace('public/', '')}` : 
                `${baseUrl}/${robot.images[0]}`
              ) : 
              `${baseUrl}/images/products/default.jpg`,
            imgHover: robot.images && robot.images[1] ? 
              (robot.images[1].startsWith('public/') ? 
                `${baseUrl}/${robot.images[1].replace('public/', '')}` : 
                `${baseUrl}/${robot.images[1]}`
              ) : 
              (robot.images && robot.images[0] ? 
                (robot.images[0].startsWith('public/') ? 
                  `${baseUrl}/${robot.images[0].replace('public/', '')}` : 
                  `${baseUrl}/${robot.images[0]}`
                ) : 
                `${baseUrl}/images/products/default.jpg`
              ),
            description: robot.description || '',
            inStock: true,
            
            // Dynamic fields from backend
            filterBrands: robot.manufacturer ? [robot.manufacturer.name] : ['Default Brand'],
            filterColor: robot.color && robot.color.length > 0 ? 
              robot.color.map(c => c.name) : ['Default Color'],
            filterSizes: ['Default Size'],
            
            // Additional robot-specific fields
            oldPrice: null,
            category: robot.category,
            categoryId: robot.category?._id || robot.category,
            
            // Robot specifications
            slug: robot.slug || '',
            launchYear: robot.launchYear || null,
            version: robot.version || '',
            videoEmbedCode: robot.videoEmbedCode || '',
            
            // Dimensions and specifications
            dimensions: robot.dimensions || {},
            weight: robot.weight || {},
            batteryCapacity: robot.batteryCapacity || {},
            batteryChargeTime: robot.batteryChargeTime || {},
            loadCapacity: robot.loadCapacity || {},
            operatingTemperature: robot.operatingTemperature || {},
            range: robot.range || {},
            powerSource: robot.powerSource || {},
            runtime: robot.runtime || {},
            speed: robot.speed || {},
            accuracy: robot.accuracy || {},
            material: robot.material || [],
            
            // Additional populated fields
            manufacturer: robot.manufacturer,
            countryOfOrigin: robot.countryOfOrigin,
            navigationType: robot.navigationType,
            sensors: robot.sensors,
            primaryFunction: robot.primaryFunction,
            aiSoftwareFeatures: robot.aiSoftwareFeatures,
            operatingEnvironment: robot.operatingEnvironment,
            terrainCapability: robot.terrainCapability,
            autonomyLevel: robot.autonomyLevel,
            communicationMethod: robot.communicationMethod,
            payloadTypesSupported: robot.payloadTypesSupported
          };
          

          return transformedRobot;
        } else {
          console.log('No robot data found for slug:', slug);
          return null;
        }
      } else {
        console.log('Failed to fetch robot by slug, status:', response.status);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request timeout for:', baseUrl);
      } else {
        console.log('Error fetching robot by slug:', error);
      }
      continue; // Try next URL
    }
  }
  
  console.log('Failed to fetch robot by slug from all URLs');
  return null;
};

// Search products by query
export const searchProducts = async (query, filters = {}) => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];
  
  for (const baseUrl of urlsToTry) {
    try {
      // Build query parameters
      const params = new URLSearchParams({ 
        q: query.trim(),
        limit: filters.limit || 20,
        page: filters.page || 1
      });
      
      // Add additional filters if provided
      if (filters.category) {
        params.append('category', filters.category);
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
      
      const apiUrl = `${baseUrl}/frontend/api/robot/search?${params.toString()}`;
      
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

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
            
            return {
              id: product._id || index + 1,
              title: product.title || 'Untitled Product',
              price: convertedPrice,
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
              filterSizes: ['Default Size'],
              
              // Additional robot-specific fields
              oldPrice: null,
              category: product.category,
              categoryId: product.category?._id || product.category,
              
              // Robot specifications
              slug: product.slug && product.slug.trim() ? product.slug : null,
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
          
          return {
            products: transformedProducts,
            totalCount: data.totalCount || transformedProducts.length,
            currentPage: data.currentPage || 1,
            totalPages: data.totalPages || 1
          };
        } else {
          return { products: [], totalCount: 0, currentPage: 1, totalPages: 1 };
        }
      }
    } catch (error) {
      continue;
    }
  }
  
  return { products: [], totalCount: 0, currentPage: 1, totalPages: 1 };
};

// Get filtered products by category and additional filters
export const getProductsByCategory = async (category, additionalFilters = {}) => {
  // Validate category
  if (!category) {
    return [];
  }

  // Use category slug if available, otherwise use category ID
  const categoryParam = category.slug || category._id || category;
  
  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];
  
  for (const baseUrl of urlsToTry) {
    try {
      // Build query parameters
      const params = new URLSearchParams({ category: categoryParam });
      
      // Add additional filters if provided
      if (additionalFilters.colors && additionalFilters.colors.length > 0) {
        params.append('colors', additionalFilters.colors.join(','));
      }
      
      if (additionalFilters.manufacturers && additionalFilters.manufacturers.length > 0) {
        params.append('manufacturers', additionalFilters.manufacturers.join(','));
      }
      
      if (additionalFilters.minPrice !== undefined) {
        params.append('minPrice', additionalFilters.minPrice);
      }
      
      if (additionalFilters.maxPrice !== undefined) {
        params.append('maxPrice', additionalFilters.maxPrice);
      }
      
      const apiUrl = `${baseUrl}/frontend/api/robot/filter?${params.toString()}`;
      
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

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
              slug: product.slug && product.slug.trim() ? product.slug : null,
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
          
          return transformedProducts;
        } else {
          return [];
        }
      }
    } catch (error) {
      continue;
    }
  }
  
  return [];
};