import { useState, useEffect } from 'react';
import { testimonialAPI } from '@/api/testimonial';

// Shared testimonials hook to avoid duplicate API calls
export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await testimonialAPI.getTestimonials();
        
        if (response.success && response.data && response.data.length > 0) {
          setTestimonials(response.data);
        } else {
          setTestimonials([]);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to fetch testimonials");
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
};
