const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const testimonialAPI = {
  // Get all testimonials
  getTestimonials: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/frontend/api/testimonial`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  },
};
