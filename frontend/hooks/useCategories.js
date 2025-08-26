import { useState, useEffect } from 'react';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        
        // Use the same approach as the working slider implementation
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const apiUrl = `${backendUrl}/frontend/api/category`;
        
        console.log('Fetching categories from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
          // Transform the data to match the expected format
          const transformedCategories = data.data.map((category, index) => ({
            id: category._id || index + 1,
            imageSrc: category.logoimage ? `${backendUrl}/${category.logoimage}` : '/images/collections/grid-cls/gaming-1.jpg',
            title: category.name || 'Category',
            description: category.description || 'No description available',
            slug: category.slug || 'category'
          }));
          
          setCategories(transformedCategories);
        } else {
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
