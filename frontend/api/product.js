// Frontend product API functions for dynamic product fetching

// Backend API base URL
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000';

// Helper function to normalize image URLs
const normalizeImageUrl = (imagePath, baseUrl = BACKEND_API_URL) => {
  if (!imagePath) return `${baseUrl}/images/logo/logoB.png`;
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it starts with 'public/', remove it and add baseUrl
  if (imagePath.startsWith('public/')) {
    return `${baseUrl}/${imagePath.replace('public/', '')}`;
  }
  
  // If it starts with '/', it's already a proper path
  if (imagePath.startsWith('/')) {
    return `${baseUrl}${imagePath}`;
  }
  
  // Otherwise, add baseUrl and ensure it starts with /
  return `${baseUrl}/${imagePath.startsWith('/') ? imagePath.slice(1) : imagePath}`;
};

// Helper function to map color names to CSS classes
const getColorClass = (colorName) => {
  if (!colorName) return 'bg-primary';
  
  const colorMap = {
    'red': 'bg-red',
    'blue': 'bg-blue', 
    'green': 'bg-primary', // Use primary for green since bg-green doesn't exist
    'yellow': 'bg-yellow',
    'orange': 'bg-orange',
    'purple': 'bg-purple',
    'violet': 'bg-purple-2',
    'voilet': 'bg-purple-2', // Handle misspelling from backend
    'pink': 'bg-pink',
    'black': 'bg-black',
    'white': 'bg-white',
    'gray': 'bg-grey', // Now properly shows grey color
    'grey': 'bg-grey', // Now properly shows grey color
    'brown': 'bg-brown',
    'silver': 'bg-grey', // Use grey for silver
    'gold': 'bg-yellow', // Use yellow for gold
    'default': 'bg-primary',
    'beige': 'bg-beige', // Now uses proper beige color
    'light blue': 'bg-blue',
    'light green': 'bg-primary',
    'light pink': 'bg-pink',
    'dark blue': 'bg-blue',
    'dark grey': 'bg-grey',
    'dark gray': 'bg-grey'
  };
  
  const normalizedColor = colorName.toLowerCase().trim();
  return colorMap[normalizedColor] || 'bg-primary'; // Default to primary instead of creating non-existent classes
};

// Fallback URLs in case the main one fails
const FALLBACK_URLS = [
  'http://localhost:5000' // Only use the main backend URL
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
                normalizeImageUrl(product.images[0], baseUrl) : 
                `${baseUrl}/images/products/logoB.png`,
              imgHover: product.images && product.images[1] ? 
                normalizeImageUrl(product.images[1], baseUrl) : 
                // If no second image, use the same image for hover (no broken hover effect)
                (product.images && product.images[0] ? 
                  (product.images[0].startsWith('public/') ? 
                    `${baseUrl}/${product.images[0].replace('public/', '')}` : 
                    `${baseUrl}/${product.images[0]}`
                  ) : 
                  `${baseUrl}/images/products/logoB.png`
                ),
              description: product.description || '',
              inStock: true, // Default to true since backend doesn't have this field
              
              // Dynamic fields from backend
              filterBrands: product.manufacturer ? [product.manufacturer.name] : ['Default Brand'],
              filterColor: product.specifications?.color && product.specifications?.color.length > 0 ? 
                product.specifications?.color.map(c => c.name) : ['Default Color'],
              filterSizes: ['Default Size'], // Robots don't have sizes like clothes
              
              // Colors array for ProductCard component
              colors: product.specifications?.color && product.specifications?.color.length > 0 ? 
                product.specifications?.color.map((colorItem, colorIndex) => {
                  // Use different images for different colors if available
                  const imageIndex = colorIndex < (product.images?.length || 0) ? colorIndex : 0;
                  const imageSrc = product.images && product.images[imageIndex] ? 
                    normalizeImageUrl(product.images[imageIndex], baseUrl) : 
                    `${baseUrl}/images/products/logoB.png`;
                  
                  return {
                    imgSrc: imageSrc,
                    bgColor: getColorClass(colorItem.name),
                    name: colorItem.name || 'Default',
                    color: colorItem.name?.toLowerCase().replace(/\s+/g, '-') || 'default'
                  };
                }) : 
                [{
                  imgSrc: product.images && product.images[0] ? 
                    (product.images[0].startsWith('public/') ? 
                      `${baseUrl}/${product.images[0].replace('public/', '')}` : 
                      `${baseUrl}/${product.images[0]}`
                    ) : 
                    `${baseUrl}/images/products/logoB.png`,
                  bgColor: getColorClass('Default'),
                  name: 'Default',
                  color: 'default'
                }],
              
              // Additional robot-specific fields
              oldPrice: null, // No old price in backend
              category: product.category, // Keep original category from backend
              categoryId: product.category?._id || product.category,
              
              // Manufacturer data for ProductCard display
              manufacturer: product.manufacturer,
              
              // Robot specifications
              slug: product.slug && product.slug.trim() ? product.slug : null,
              launchYear: product.launchYear || null,
              version: product.version || '',
              videoEmbedCode: product.videoEmbedCode || product.videoembedcode || '',
            metaTitle: product.metaTitle || product.metatitle || '',
            metaDescription: product.metaDescription || product.metadescription || '',
              
              // Dimensions and specifications
              dimensions: product.specifications?.dimensions || {},
              weight: product.specifications?.weight || {},
              batteryCapacity: product.specifications?.batteryCapacity || {},
              batteryChargeTime: product.specifications?.batteryChargeTime || {},
              loadCapacity: product.specifications?.loadCapacity || {},
              operatingTemperature: product.specifications?.operatingTemperature || {},
              range: product.specifications?.range || {},
              powerSource: product.specifications?.powerSource || {},
              runtime: product.specifications?.runtime || {},
              speed: product.specifications?.speed || {},
              accuracy: product.specifications?.accuracy || {},
              material: product.specifications?.materials || []
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
    // Silently return null instead of warning
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
              normalizeImageUrl(robot.images[0], baseUrl) : 
              `${baseUrl}/images/products/logoB.png`,
            imgHover: robot.images && robot.images[1] ? 
              normalizeImageUrl(robot.images[1], baseUrl) : 
              (robot.images && robot.images[0] ? 
                (robot.images[0].startsWith('public/') ? 
                  `${baseUrl}/${robot.images[0].replace('public/', '')}` : 
                  `${baseUrl}/${robot.images[0]}`
                ) : 
                `${baseUrl}/images/products/logoB.png`
              ),
            description: robot.description || '',
            inStock: true,
            
            // Dynamic fields from backend
            filterBrands: robot.manufacturer ? [robot.manufacturer.name] : ['Default Brand'],
            filterColor: robot.specifications?.color && robot.specifications?.color.length > 0 ? 
              robot.specifications?.color.map(c => c.name) : ['Default Color'],
            filterSizes: ['Default Size'],
            
            // Additional robot-specific fields
            oldPrice: null,
            category: robot.category,
            categoryId: robot.category?._id || robot.category,
            
            // Robot specifications
            slug: robot.slug || '',
            launchYear: robot.launchYear || null,
            version: robot.version || '',
            videoEmbedCode: robot.videoEmbedCode || robot.videoembedcode || '',
            metaTitle: robot.metaTitle || robot.metatitle || '',
            metaDescription: robot.metaDescription || robot.metadescription || '',
            
            // Preserve the complete nested structure from backend
            specifications: robot.specifications || {},
            capabilities: robot.capabilities || {},
            operationalEnvironmentAndApplications: robot.operationalEnvironmentAndApplications || {},
            sensorsAndSoftware: robot.sensorsAndSoftware || {},
            payloadsAndAttachments: robot.payloadsAndAttachments || {},
            
            // Legacy individual fields for backward compatibility
            dimensions: robot.specifications?.dimensions || {},
            weight: robot.specifications?.weight || {},
            batteryCapacity: robot.specifications?.batteryCapacity || {},
            batteryChargeTime: robot.specifications?.batteryChargeTime || {},
            loadCapacity: robot.specifications?.loadCapacity || {},
            operatingTemperature: robot.specifications?.operatingTemperature || {},
            range: robot.specifications?.range || {},
            powerSource: robot.specifications?.powerSource || {},
            runtime: robot.specifications?.runtime || {},
            speed: robot.specifications?.speed || {},
            accuracy: robot.specifications?.accuracy || {},
            material: robot.specifications?.materials || [],
            
            // Colors array for ColorSelect component
            colors: robot.specifications?.color && robot.specifications?.color.length > 0 ? 
              robot.specifications?.color.map((colorItem, colorIndex) => {
                // Use different images for different colors if available
                const imageIndex = colorIndex < (robot.images?.length || 0) ? colorIndex : 0;
                const imageSrc = robot.images && robot.images[imageIndex] ? 
                  normalizeImageUrl(robot.images[imageIndex], baseUrl) : 
                  `${baseUrl}/images/products/logoB.png`;
                
                return {
                  id: `values-${colorItem.name?.toLowerCase().replace(/\s+/g, '-') || 'default'}`,
                  value: colorItem.name || 'Default',
                  color: colorItem.name?.toLowerCase().replace(/\s+/g, '-') || 'default',
                  bgColor: getColorClass(colorItem.name),
                  imgSrc: imageSrc,
                  name: colorItem.name || 'Default'
                };
              }) : 
              [{
                id: 'values-default',
                value: 'Default',
                color: 'default',
                bgColor: getColorClass('Default'),
                imgSrc: robot.images && robot.images[0] ? 
                  (robot.images[0].startsWith('public/') ? 
                    `${baseUrl}/${robot.images[0].replace('public/', '')}` : 
                    `${baseUrl}/${robot.images[0]}`
                  ) : 
                  `${baseUrl}/images/products/logoB.png`,
                name: 'Default'
              }],
            
            // Images array for slider
            images: robot.images && robot.images.length > 0 ? 
              robot.images.map(img => 
                normalizeImageUrl(img, baseUrl)
              ) : 
              [`${baseUrl}/images/products/logoB.png`],
            
            // Additional populated fields
            manufacturer: robot.manufacturer,
            countryOfOrigin: robot.countryOfOrigin,
            
            // Legacy individual fields for backward compatibility
            navigationType: robot.capabilities?.navigationTypes,
            sensors: robot.sensorsAndSoftware?.sensors,
            primaryFunction: robot.capabilities?.primaryFunction,
            aiSoftwareFeatures: robot.sensorsAndSoftware?.aiSoftwareFeatures,
            operatingEnvironment: robot.operationalEnvironmentAndApplications?.operatingEnvironment,
            terrainCapability: robot.operationalEnvironmentAndApplications?.terrainCapabilities,
            autonomyLevel: robot.capabilities?.autonomyLevel,
            communicationMethod: robot.capabilities?.communicationMethods,
            payloadTypesSupported: robot.payloadsAndAttachments?.payloadTypes
          };
          

          return transformedRobot;
        } else {
          // Silently return null when no data found
          return null;
        }
      } else {
        // Silently handle failed requests to reduce console noise
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        // Request timeout - silently continue to next URL
      } else {
        // Silently handle errors to reduce console noise
      }
      continue; // Try next URL
    }
  }
  
  // Silently return null when all URLs fail
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
                normalizeImageUrl(product.images[0], baseUrl) : 
                `${baseUrl}/images/products/logoB.png`,
              imgHover: product.images && product.images[1] ? 
                normalizeImageUrl(product.images[1], baseUrl) : 
                (product.images && product.images[0] ? 
                  (product.images[0].startsWith('public/') ? 
                    `${baseUrl}/${product.images[0].replace('public/', '')}` : 
                    `${baseUrl}/${product.images[0]}`
                  ) : 
                  `${baseUrl}/images/products/logoB.png`
                ),
              description: product.description || '',
              inStock: true,
              
              // Dynamic fields from backend
              filterBrands: product.manufacturer ? [product.manufacturer.name] : ['Default Brand'],
              filterColor: product.specifications?.color && product.specifications?.color.length > 0 ? 
                product.specifications?.color.map(c => c.name) : ['Default Color'],
              filterSizes: ['Default Size'],
              
              // Colors array for ProductCard component
              colors: product.specifications?.color && product.specifications?.color.length > 0 ? 
                product.specifications?.color.map(colorItem => ({
                  imgSrc: normalizeImageUrl(product.images?.[0], baseUrl),
                  bgColor: getColorClass(colorItem.name),
                  name: colorItem.name || 'Default'
                })) : 
                [{
                  imgSrc: normalizeImageUrl(product.images?.[0], baseUrl),
                  bgColor: getColorClass('Default'),
                  name: 'Default'
                }],
              
              // Additional robot-specific fields
              oldPrice: null,
              category: product.category,
              categoryId: product.category?._id || product.category,
              
              // Manufacturer data for ProductCard display
              manufacturer: product.manufacturer,
              
              // Robot specifications
              slug: product.slug && product.slug.trim() ? product.slug : null,
              launchYear: product.launchYear || null,
              version: product.version || '',
              videoEmbedCode: product.videoEmbedCode || product.videoembedcode || '',
            metaTitle: product.metaTitle || product.metatitle || '',
            metaDescription: product.metaDescription || product.metadescription || '',
              
              // Dimensions and specifications
              dimensions: product.specifications?.dimensions || {},
              weight: product.specifications?.weight || {},
              batteryCapacity: product.specifications?.batteryCapacity || {},
              batteryChargeTime: product.specifications?.batteryChargeTime || {},
              loadCapacity: product.specifications?.loadCapacity || {},
              operatingTemperature: product.specifications?.operatingTemperature || {},
              range: product.specifications?.range || {},
              powerSource: product.specifications?.powerSource || {},
              runtime: product.specifications?.runtime || {},
              speed: product.specifications?.speed || {},
              accuracy: product.specifications?.accuracy || {},
              material: product.specifications?.materials || []
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
                normalizeImageUrl(product.images[0], baseUrl) : 
                `${baseUrl}/images/products/logoB.png`,
              imgHover: product.images && product.images[1] ? 
                normalizeImageUrl(product.images[1], baseUrl) : 
                // If no second image, use the same image for hover (no broken hover effect)
                (product.images && product.images[0] ? 
                  (product.images[0].startsWith('public/') ? 
                    `${baseUrl}/${product.images[0].replace('public/', '')}` : 
                    `${baseUrl}/${product.images[0]}`
                  ) : 
                  `${baseUrl}/images/products/logoB.png`
                ),
              description: product.description || '',
              inStock: true,
              
              // Dynamic fields from backend
              filterBrands: product.manufacturer ? [product.manufacturer.name] : ['Default Brand'],
              filterColor: product.specifications?.color && product.specifications?.color.length > 0 ? 
                product.specifications?.color.map(c => c.name) : ['Default Color'],
              filterSizes: ['Default Size'], // Robots don't have sizes like clothes
              
              // Colors array for ProductCard component
              colors: product.specifications?.color && product.specifications?.color.length > 0 ? 
                product.specifications?.color.map((colorItem, colorIndex) => {
                  // Use different images for different colors if available
                  const imageIndex = colorIndex < (product.images?.length || 0) ? colorIndex : 0;
                  const imageSrc = product.images && product.images[imageIndex] ? 
                    normalizeImageUrl(product.images[imageIndex], baseUrl) : 
                    `${baseUrl}/images/products/logoB.png`;
                  
                  return {
                    imgSrc: imageSrc,
                    bgColor: getColorClass(colorItem.name),
                    name: colorItem.name || 'Default',
                    color: colorItem.name?.toLowerCase().replace(/\s+/g, '-') || 'default'
                  };
                }) : 
                [{
                  imgSrc: product.images && product.images[0] ? 
                    (product.images[0].startsWith('public/') ? 
                      `${baseUrl}/${product.images[0].replace('public/', '')}` : 
                      `${baseUrl}/${product.images[0]}`
                    ) : 
                    `${baseUrl}/images/products/logoB.png`,
                  bgColor: getColorClass('Default'),
                  name: 'Default',
                  color: 'default'
                }],
              
              // Additional robot-specific fields
              oldPrice: null, // No old price in backend
              category: product.category, // Keep original category from backend
              categoryId: product.category?._id || product.category,
              
              // Manufacturer data for ProductCard display
              manufacturer: product.manufacturer,
              
              // Robot specifications
              slug: product.slug && product.slug.trim() ? product.slug : null,
              launchYear: product.launchYear || null,
              version: product.version || '',
              videoEmbedCode: product.videoEmbedCode || product.videoembedcode || '',
            metaTitle: product.metaTitle || product.metatitle || '',
            metaDescription: product.metaDescription || product.metadescription || '',
              
              // Dimensions and specifications
              dimensions: product.specifications?.dimensions || {},
              weight: product.specifications?.weight || {},
              batteryCapacity: product.specifications?.batteryCapacity || {},
              batteryChargeTime: product.specifications?.batteryChargeTime || {},
              loadCapacity: product.specifications?.loadCapacity || {},
              operatingTemperature: product.specifications?.operatingTemperature || {},
              range: product.specifications?.range || {},
              powerSource: product.specifications?.powerSource || {},
              runtime: product.specifications?.runtime || {},
              speed: product.specifications?.speed || {},
              accuracy: product.specifications?.accuracy || {},
              material: product.specifications?.materials || []
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

// Get related products by slug
export const getRelatedProducts = async (slug) => {
  if (!slug) {
    // Silently return empty array instead of warning
    return [];
  }

  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];
  
  for (const baseUrl of urlsToTry) {
    try {
      const apiUrl = `${baseUrl}/frontend/api/robot/related/${slug}`;
      
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
        if (data.success && data.data && Array.isArray(data.data)) {
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
                normalizeImageUrl(product.images[0], baseUrl) : 
                `${baseUrl}/images/products/logoB.png`,
              imgHover: product.images && product.images[1] ? 
                normalizeImageUrl(product.images[1], baseUrl) : 
                (product.images && product.images[0] ? 
                  (product.images[0].startsWith('public/') ? 
                    `${baseUrl}/${product.images[0].replace('public/', '')}` : 
                    `${baseUrl}/${product.images[0]}`
                  ) : 
                  `${baseUrl}/images/products/logoB.png`
                ),
              description: product.description || '',
              inStock: true,
              
              // Dynamic fields from backend
              filterBrands: product.manufacturer ? [product.manufacturer.name] : ['Default Brand'],
              filterColor: product.specifications?.color && product.specifications?.color.length > 0 ? 
                product.specifications?.color.map(c => c.name) : ['Default Color'],
              filterSizes: ['Default Size'],
              
              // Colors array for ProductCard component
              colors: product.specifications?.color && product.specifications?.color.length > 0 ? 
                product.specifications?.color.map((colorItem, colorIndex) => {
                  // Use different images for different colors if available
                  const imageIndex = colorIndex < (product.images?.length || 0) ? colorIndex : 0;
                  const imageSrc = product.images && product.images[imageIndex] ? 
                    normalizeImageUrl(product.images[imageIndex], baseUrl) : 
                    `${baseUrl}/images/products/logoB.png`;
                  
                  return {
                    imgSrc: imageSrc,
                    bgColor: getColorClass(colorItem.name),
                    name: colorItem.name || 'Default',
                    color: colorItem.name?.toLowerCase().replace(/\s+/g, '-') || 'default'
                  };
                }) : 
                [{
                  imgSrc: product.images && product.images[0] ? 
                    (product.images[0].startsWith('public/') ? 
                      `${baseUrl}/${product.images[0].replace('public/', '')}` : 
                      `${baseUrl}/${product.images[0]}`
                    ) : 
                    `${baseUrl}/images/products/logoB.png`,
                  bgColor: getColorClass('Default'),
                  name: 'Default',
                  color: 'default'
                }],
              
              // Additional robot-specific fields
              oldPrice: null,
              category: product.category,
              categoryId: product.category?._id || product.category,
              
              // Manufacturer data for ProductCard display
              manufacturer: product.manufacturer,
              
              // Robot specifications
              slug: product.slug && product.slug.trim() ? product.slug : null,
              launchYear: product.launchYear || null,
              version: product.version || '',
              videoEmbedCode: product.videoEmbedCode || product.videoembedcode || '',
            metaTitle: product.metaTitle || product.metatitle || '',
            metaDescription: product.metaDescription || product.metadescription || '',
              
              // Dimensions and specifications
              dimensions: product.specifications?.dimensions || {},
              weight: product.specifications?.weight || {},
              batteryCapacity: product.specifications?.batteryCapacity || {},
              batteryChargeTime: product.specifications?.batteryChargeTime || {},
              loadCapacity: product.specifications?.loadCapacity || {},
              operatingTemperature: product.specifications?.operatingTemperature || {},
              range: product.specifications?.range || {},
              powerSource: product.specifications?.powerSource || {},
              runtime: product.specifications?.runtime || {},
              speed: product.specifications?.speed || {},
              accuracy: product.specifications?.accuracy || {},
              material: product.specifications?.materials || []
            };
          });
          
          return transformedProducts;
        } else {
          // No related products found - this is normal
          return [];
        }
      } else {
        // Silently handle failed requests to reduce console noise
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        // Request timeout - silently continue to next URL
      } else {
        // Silently handle errors to reduce console noise
      }
      continue; // Try next URL
    }
  }
  
  // Silently return empty array when all URLs fail
  return [];
};

// Get recently viewed products by IDs
export const getRecentlyViewed = async (ids) => {
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    // Silently return empty array instead of warning
    return [];
  }

  const urlsToTry = [BACKEND_API_URL, ...FALLBACK_URLS];
  
  for (const baseUrl of urlsToTry) {
    try {
      const apiUrl = `${baseUrl}/frontend/api/robot/recentlyviewed`;
      
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify({ ids }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data && Array.isArray(data.data)) {
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
                normalizeImageUrl(product.images[0], baseUrl) : 
                `${baseUrl}/images/products/logoB.png`,
              imgHover: product.images && product.images[1] ? 
                normalizeImageUrl(product.images[1], baseUrl) : 
                (product.images && product.images[0] ? 
                  (product.images[0].startsWith('public/') ? 
                    `${baseUrl}/${product.images[0].replace('public/', '')}` : 
                    `${baseUrl}/${product.images[0]}`
                  ) : 
                  `${baseUrl}/images/products/logoB.png`
                ),
              description: product.description || '',
              inStock: true,
              
              // Dynamic fields from backend
              filterBrands: product.manufacturer ? [product.manufacturer.name] : ['Default Brand'],
              filterColor: product.specifications?.color && product.specifications?.color.length > 0 ? 
                product.specifications?.color.map(c => c.name) : ['Default Color'],
              filterSizes: ['Default Size'],
              
              // Colors array for ProductCard component
              colors: product.specifications?.color && product.specifications?.color.length > 0 ? 
                product.specifications?.color.map((colorItem, colorIndex) => {
                  // Use different images for different colors if available
                  const imageIndex = colorIndex < (product.images?.length || 0) ? colorIndex : 0;
                  const imageSrc = product.images && product.images[imageIndex] ? 
                    normalizeImageUrl(product.images[imageIndex], baseUrl) : 
                    `${baseUrl}/images/products/logoB.png`;
                  
                  return {
                    imgSrc: imageSrc,
                    bgColor: getColorClass(colorItem.name),
                    name: colorItem.name || 'Default',
                    color: colorItem.name?.toLowerCase().replace(/\s+/g, '-') || 'default'
                  };
                }) : 
                [{
                  imgSrc: product.images && product.images[0] ? 
                    (product.images[0].startsWith('public/') ? 
                      `${baseUrl}/${product.images[0].replace('public/', '')}` : 
                      `${baseUrl}/${product.images[0]}`
                    ) : 
                    `${baseUrl}/images/products/logoB.png`,
                  bgColor: getColorClass('Default'),
                  name: 'Default',
                  color: 'default'
                }],
              
              // Additional robot-specific fields
              oldPrice: null,
              category: product.category,
              categoryId: product.category?._id || product.category,
              
              // Manufacturer data for ProductCard display
              manufacturer: product.manufacturer,
              
              // Robot specifications
              slug: product.slug && product.slug.trim() ? product.slug : null,
              launchYear: product.launchYear || null,
              version: product.version || '',
              videoEmbedCode: product.videoEmbedCode || product.videoembedcode || '',
            metaTitle: product.metaTitle || product.metatitle || '',
            metaDescription: product.metaDescription || product.metadescription || '',
              
              // Dimensions and specifications
              dimensions: product.specifications?.dimensions || {},
              weight: product.specifications?.weight || {},
              batteryCapacity: product.specifications?.batteryCapacity || {},
              batteryChargeTime: product.specifications?.batteryChargeTime || {},
              loadCapacity: product.specifications?.loadCapacity || {},
              operatingTemperature: product.specifications?.operatingTemperature || {},
              range: product.specifications?.range || {},
              powerSource: product.specifications?.powerSource || {},
              runtime: product.specifications?.runtime || {},
              speed: product.specifications?.speed || {},
              accuracy: product.specifications?.accuracy || {},
              material: product.specifications?.materials || []
            };
          });
          
          return transformedProducts;
        } else {
          // No recently viewed products found - this is normal
          return [];
        }
      } else {
        // Silently handle failed requests to reduce console noise
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        // Request timeout - silently continue to next URL
      } else {
        // Silently handle errors to reduce console noise
      }
      continue; // Try next URL
    }
  }
  
  // Silently return empty array when all URLs fail
  return [];
};