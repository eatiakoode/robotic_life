import { useState, useEffect } from 'react';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try multiple backend URLs for robustness
        const backendUrls = [
          process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://thebotsworld.onrender.com',
          'http://localhost:8000',
          process.env.NEXT_PUBLIC_API_URL
        ].filter(Boolean);
        
        let response = null;
        let lastError = null;
        
        for (const backendUrl of backendUrls) {
          try {
            const apiUrl = `${backendUrl}/frontend/api/category`;

            
            response = await fetch(apiUrl);

            
            if (response.ok) {

              break;
            }
          } catch (err) {
            // Failed to fetch from backend
            lastError = err;
            continue;
          }
        }
        
        if (!response || !response.ok) {
          throw new Error(lastError?.message || 'Failed to fetch categories from any backend URL');
        }
        
        const data = await response.json();

        
        if (data.success && data.data && Array.isArray(data.data)) {
          // Function to generate slug from name
          const generateSlug = (name) => {
            if (!name) return 'category';
            return name.toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
              .replace(/\s+/g, '-') // Replace spaces with hyphens
              .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
              .trim();
          };

          // Transform the data to match the expected format
          const transformedCategories = data.data.map((category, index) => {
            try {
              return {
                _id: category._id || `category-${index + 1}`,
                name: category.name || 'Category',
                description: category.description || 'No description available',
                logoimage: category.logoimage || null,
                slug: category.slug || generateSlug(category.name) || 'category',
                parent: category.parent || null
              };
            } catch (error) {
              // Silently handle transformation errors
              return {
                _id: `category-${index + 1}`,
                name: 'Category',
                description: 'No description available',
                logoimage: null,
                slug: 'category',
                parent: null
              };
            }
          });
          

          setCategories(transformedCategories);
        } else {
          // Silently set empty categories when no data
          setCategories([]);
        }
      } catch (err) {
        // Silently handle errors in production
        setError(err.message);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategories;
