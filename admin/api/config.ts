// API Configuration for Admin Panel
// This file provides centralized API configuration and fallback URLs

// Default API configuration
const DEFAULT_API_CONFIG = {
  // Backend API URL (fallback to Render URL if env var not set)
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://thebotsworld.onrender.com/',
  
  // Admin API URL (fallback to Render URL if env var not set)
  ADMIN_URL: process.env.NEXT_PUBLIC_ADMIN_API_URL || 'https://thebotsworld.onrender.com/',
  
  // Frontend API URL (fallback to localhost:3000 if env var not set)
  FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_API_URL || 'http://localhost:3000/',
  
  // Public API URL for assets
  PUBLIC_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/',
};

// Helper function to get API base URL
export const getApiBaseUrl = (type: 'backend' | 'admin' | 'frontend' | 'public' = 'admin') => {
  switch (type) {
    case 'backend':
      return DEFAULT_API_CONFIG.BACKEND_URL;
    case 'admin':
      return DEFAULT_API_CONFIG.ADMIN_URL;
    case 'frontend':
      return DEFAULT_API_CONFIG.FRONTEND_URL;
    case 'public':
      return DEFAULT_API_CONFIG.PUBLIC_URL;
    default:
      return DEFAULT_API_CONFIG.ADMIN_URL;
  }
};

// Helper function to build full API URL
export const buildApiUrl = (endpoint: string, type: 'backend' | 'admin' | 'frontend' | 'public' = 'admin') => {
  const baseUrl = getApiBaseUrl(type);
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${baseUrl}${cleanEndpoint}`;
};

// Helper function to get auth token
export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") {
    return null; // No localStorage during SSR
  }
  try {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    return userData?.token || null;
  } catch {
    return null;
  }
};

// Helper function to create auth headers
export const getAuthHeaders = (token?: string) => {
  const authToken = token || getAuthToken();
  if (!authToken) {
    throw new Error("User not authenticated!");
  }
  
  return {
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
  };
};

// Export the config for direct access if needed
export const API_CONFIG = DEFAULT_API_CONFIG;

// Log configuration in development
if (process.env.NODE_ENV === 'development') {
  console.log('API Configuration loaded:', DEFAULT_API_CONFIG);
}
