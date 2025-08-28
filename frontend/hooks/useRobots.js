import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const useRobots = () => {
  const [robots, setRobots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecentRobots = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/frontend/api/robot/recent`);
      setRobots(response.data);
    } catch (err) {
      console.error('Error fetching recent robots:', err);
      setError(err.message || 'Failed to fetch robots');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentRobots();
  }, []);

  return { robots, loading, error, refetch: fetchRecentRobots };
};
