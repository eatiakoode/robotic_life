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
          'http://localhost:5000',
          'http://localhost:3001',
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
            console.log('Failed to fetch from', backendUrl, ':', err.message);
            lastError = err;
            continue;
          }
        }
        
        if (!response || !response.ok) {
          throw new Error(lastError?.message || 'Failed to fetch categories from any backend URL');
        }
        
        const data = await response.json();

        
        if (data.success && data.data && Array.isArray(data.data)) {
          // Transform the data to match the expected format
          const transformedCategories = data.data.map((category, index) => {
            try {
              return {
                _id: category._id || `category-${index + 1}`,
                name: category.name || 'Category',
                description: category.description || 'No description available',
                logoimage: category.logoimage || null,
                slug: category.slug || 'category',
                parent: category.parent || null
              };
            } catch (error) {
              console.error('Error transforming category:', category, error);
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
          console.log('No data or success false:', data);
          setCategories([]);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
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
