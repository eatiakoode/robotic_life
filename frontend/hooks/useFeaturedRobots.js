import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://thebotsworld.onrender.com';

export const useFeaturedRobots = () => {
  const [robots, setRobots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeaturedRobots = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/frontend/api/robot/featured`);
      setRobots(response.data.data || response.data); // Handle both response formats
    } catch (err) {
      console.error('Error fetching featured robots:', err);
      setError(err.message || 'Failed to fetch featured robots');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedRobots();
  }, []);

  return { robots, loading, error, refetch: fetchFeaturedRobots };
};
