import axios from 'axios';

// Base URL for the backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Slider API functions
export const sliderAPI = {
  // Get active sliders from backend
  getActiveSliders: async () => {
    try {
      const response = await api.get('/frontend/api/slider');
      return response.data;
    } catch (error) {
      console.error('Error fetching sliders:', error);
      throw error;
    }
  },
};

export default api;
