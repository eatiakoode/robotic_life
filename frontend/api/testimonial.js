const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const testimonialAPI = {
  // Get all testimonials
  getTestimonials: async () => {
    try {
      console.log('API_BASE_URL:', API_BASE_URL);
      const url = `${API_BASE_URL}/frontend/api/testimonial`;
      console.log('Fetching from URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      // Return a fallback response instead of throwing
      return {
        success: false,
        data: [],
        error: error.message
      };
    }
  },
};
