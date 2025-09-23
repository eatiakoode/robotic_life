const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://thebotsworld.onrender.com';

export const testimonialAPI = {
  // Get all testimonials
  getTestimonials: async () => {
    try {
      const url = `${API_BASE_URL}/frontend/api/testimonial`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
      });

      // Process response

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // API response processed
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
