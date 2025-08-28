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
            console.log(`Trying to fetch from: ${url}`);
            response = await fetch(url);
            console.log(`Response from ${url}:`, response.status, response.statusText);
            if (response.ok) {
              console.log(`Successfully connected to: ${url}`);
              break;
            }
          } catch (err) {
            console.log(`Failed to fetch from ${url}:`, err.message);
            lastError = err;
            continue;
          }
        }

        if (!response || !response.ok) {
          throw new Error(lastError?.message || 'Failed to fetch sliders from any backend URL');
        }

        const data = await response.json();
        console.log('Slider data received:', data);
        
        if (data.success) {
          setSliders(data.data);
        } else {
          throw new Error(data.error || 'Failed to fetch sliders');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching sliders:', err);
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
