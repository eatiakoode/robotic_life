import { useState, useEffect } from 'react';

const useSlider = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        setLoading(true);
        
        // Try different possible backend URLs
        const backendUrls = [
          '/frontend/api/slider',
          'http://localhost:5000/frontend/api/slider',
          'http://localhost:3001/frontend/api/slider',
          'http://127.0.0.1:5000/frontend/api/slider',
          'http://127.0.0.1:3001/frontend/api/slider'
        ];

        let response = null;
        let lastError = null;

        for (const url of backendUrls) {
          try {
            response = await fetch(url);
            if (response.ok) {
              break;
            }
          } catch (err) {
            lastError = err;
            continue;
          }
        }

        if (!response || !response.ok) {
          throw new Error(lastError?.message || 'Failed to fetch sliders from any backend URL');
        }

        const data = await response.json();
        
        if (data.success) {
          setSliders(data.data);
        } else {
          throw new Error(data.error || 'Failed to fetch sliders');
        }
      } catch (err) {
        setError(err.message);
        // Fallback to empty array if API fails
        setSliders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  return { sliders, loading, error };
};

export default useSlider;
