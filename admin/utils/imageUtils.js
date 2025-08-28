/**
 * Utility functions for safely handling images in Next.js
 */

/**
 * Safely constructs an image URL with fallback
 * @param {string} baseUrl - Base API URL from environment
 * @param {string} imagePath - Image path from API response
 * @param {string} fallbackPath - Fallback image path
 * @returns {string} Safe image URL
 */
export const getSafeImageUrl = (baseUrl, imagePath, fallbackPath = '/assets/images/thumbnail.webp') => {
  try {
    // If no base URL, return fallback
    if (!baseUrl) {
      return fallbackPath;
    }

    // If no image path, return fallback
    if (!imagePath) {
      return `${baseUrl}${fallbackPath}`;
    }

    // Clean up the base URL (remove trailing slash if exists)
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    
    // Clean up the image path (remove leading slash if exists)
    const cleanImagePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    
    // Construct the full URL
    const fullUrl = `${cleanBaseUrl}/${cleanImagePath}`;
    
    // Validate the URL
    new URL(fullUrl);
    
    return fullUrl;
  } catch (error) {
    console.warn('Invalid image URL constructed:', { baseUrl, imagePath, error: error.message });
    // Return fallback URL
    return fallbackPath;
  }
};

/**
 * Checks if a URL is valid
 * @param {string} url - URL to validate
 * @returns {boolean} True if URL is valid
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Gets environment API URL with fallback
 * @returns {string} API URL
 */
export const getApiUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiUrl) {
    console.warn('NEXT_PUBLIC_API_URL is not defined, using fallback');
    return 'http://localhost:3000/';
  }
  
  return apiUrl;
};

/**
 * Gets backend API URL with fallback
 * @returns {string} Backend API URL
 */
export const getBackendApiUrl = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  
  if (!backendUrl) {
    console.warn('NEXT_PUBLIC_BACKEND_API_URL is not defined, using fallback');
    return 'http://localhost:5000/';
  }
  
  return backendUrl;
};

/**
 * Safely renders an image with error handling
 * @param {Object} props - Image props
 * @param {string} props.src - Image source
 * @param {string} props.alt - Alt text
 * @param {number} props.width - Image width
 * @param {number} props.height - Image height
 * @param {string} props.className - CSS classes
 * @param {Object} props.style - Inline styles
 * @param {boolean} props.unoptimized - Whether to skip optimization
 * @returns {JSX.Element} Safe Image component or fallback
 */
export const SafeImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  style, 
  unoptimized = false,
  fallbackSrc = '/assets/images/thumbnail.webp',
  ...props 
}) => {
  const apiUrl = getApiUrl();
  const backendUrl = getBackendApiUrl();
  
  // If src is already a full URL, use it directly
  if (src && (src.startsWith('http://') || src.startsWith('https://'))) {
    return (
      <img
        src={src}
        alt={alt || 'Image'}
        width={width}
        height={height}
        className={className}
        style={style}
        {...props}
      />
    );
  }
  
  // If src is a relative path, determine if it's a backend image or frontend image
  if (src) {
    let safeSrc;
    
    // Check if this is a backend image (contains 'images/slider', 'images/robot', etc.)
    if (src.includes('images/slider') || src.includes('images/robot') || src.includes('images/') && !src.startsWith('/assets/')) {
      // This is a backend image, use backend URL
      // Remove 'public/' prefix if it exists
      const cleanSrc = src.replace(/^public\//, '');
      safeSrc = `${backendUrl}${cleanSrc}`;
    } else {
      // This is a frontend image, use frontend URL
      safeSrc = getSafeImageUrl(apiUrl, src, fallbackSrc);
    }
    
    try {
      return (
        <img
          src={safeSrc}
          alt={alt || 'Image'}
          width={width}
          height={height}
          className={className}
          style={style}
          {...props}
        />
      );
    } catch (error) {
      console.warn('Failed to render image:', error);
    }
  }
  
  // Fallback to default image
  return (
    <img
      src={fallbackSrc}
      alt={alt || 'Default Image'}
      width={width}
      height={height}
      className={className}
      style={style}
      {...props}
    />
  );
};

