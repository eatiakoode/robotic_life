import { useState, useEffect } from 'react';
import { sliderAPI } from '@/services/api';

export const useSliders = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default fallback sliders
  const fallbackSliders = [
    {
      id: 1,
      imageSrc: "/images/slider/slider-gaming-1.jpg",
      alt: "gaming-slideshow",
      title: "Powerful Sound",
      description: "Fill any space with immersive, high-quality audio.",
      buttonText: "Shop now",
      buttonLink: "/shop-default-grid"
    },
    {
      id: 2,
      imageSrc: "/images/slider/slider-gaming-2.jpg",
      alt: "gaming-slideshow",
      title: "Seamless Listening",
      description: "Enjoy effortless connectivity and crystal-clear audio on the go.",
      buttonText: "Explore Collection",
      buttonLink: "/shop-default-grid"
    },
    {
      id: 3,
      imageSrc: "/images/slider/slider-gaming-3.jpg",
      alt: "gaming-slideshow",
      title: "Immerse Yourself",
      description: "Experience rich, high-fidelity sound for music, gaming, and calls.",
      buttonText: "Explore Collection",
      buttonLink: "/shop-default-grid"
    }
  ];

  // Helper function to construct proper image URL
  const constructImageUrl = (imagePath) => {
    if (!imagePath) return fallbackSliders[0].imageSrc;
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // If it's a relative path starting with /, return as is
    if (imagePath.startsWith('/')) {
      return imagePath;
    }
    
    // If the path already contains 'public/images/slider/', just prepend the backend URL
    if (imagePath.includes('public/images/slider/')) {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const fullUrl = `${backendUrl}/${imagePath}`;
      
      console.log('Image URL construction (full path):', {
        original: imagePath,
        backendUrl: backendUrl,
        fullUrl: fullUrl,
        envVar: process.env.NEXT_PUBLIC_API_URL
      });
      
      return fullUrl;
    }
    
    // If it's just a filename (like upload-1756127975889.png), construct the backend URL
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const fullUrl = `${backendUrl}/public/images/slider/${imagePath}`;
    
    console.log('Image URL construction (filename only):', {
      original: imagePath,
      backendUrl: backendUrl,
      fullUrl: fullUrl,
      envVar: process.env.NEXT_PUBLIC_API_URL
    });
    
    return fullUrl;
  };



  // Transform backend data to frontend format
  const transformSliderData = (backendData) => {
    return backendData.map((slider, index) => ({
      id: slider._id || index + 1,
      imageSrc: slider.images && slider.images.length > 0 
        ? constructImageUrl(slider.images[0]) 
        : fallbackSliders[index]?.imageSrc || fallbackSliders[0].imageSrc,
      alt: slider.title || `slider-${index + 1}`,
      title: slider.title || fallbackSliders[index]?.title || "Default Title",
      description: slider.description || fallbackSliders[index]?.description || "Default description",
      buttonText: slider.buttonText || fallbackSliders[index]?.buttonText || "Shop now",
      buttonLink: slider.buttonLink || fallbackSliders[index]?.buttonLink || "/shop-default-grid"
    }));
  };

  // Fetch sliders from backend
  const fetchSliders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching sliders from backend...');
      const response = await sliderAPI.getActiveSliders();
      
      console.log('Backend response:', response);
      
      if (response.success && response.data && response.data.length > 0) {
        console.log('Backend data received:', response.data);
        const transformedSliders = transformSliderData(response.data);
        console.log('Transformed sliders:', transformedSliders);
        console.log(`Created ${transformedSliders.length} slides from ${response.data.length} sliders`);
        setSliders(transformedSliders);
      } else {
        console.log('No backend data, using fallback sliders');
        // Use fallback data if API returns empty or no data
        setSliders(fallbackSliders);
      }
    } catch (err) {
      console.error("Error fetching sliders:", err);
      setError(err.message);
      // Use fallback data on error
      setSliders(fallbackSliders);
    } finally {
      setLoading(false);
    }
  };

  // Refresh sliders
  const refreshSliders = () => {
    fetchSliders();
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  return {
    sliders,
    loading,
    error,
    refreshSliders
  };
};
