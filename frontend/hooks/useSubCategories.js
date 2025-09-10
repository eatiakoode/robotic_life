import { useState, useEffect } from 'react';
import { getParentCategories, getSubCategories } from '@/api/category';

const useSubCategories = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First get parent categories
        const parentCategories = await getParentCategories();
        
        if (parentCategories.length === 0) {
          setSubcategories([]);
          return;
        }
        
        // Get subcategories for all parent categories
        const subcategoryPromises = parentCategories.map(async (parentCategory) => {
          try {
            const subs = await getSubCategories(parentCategory._id);
            return subs;
          } catch (error) {
            console.error(`Error fetching subcategories for ${parentCategory.name}:`, error);
            return [];
          }
        });
        
        const subcategoryResults = await Promise.all(subcategoryPromises);
        
        // Flatten all subcategories into a single array
        const allSubcategories = subcategoryResults.flat();
        
        // Transform the data to match the expected format
        const transformedSubcategories = allSubcategories.map((subcategory, index) => ({
          _id: subcategory._id || `subcategory-${index + 1}`,
          name: subcategory.name || 'Subcategory',
          description: subcategory.description || 'No description available',
          logoimage: subcategory.logoimage || null,
          slug: subcategory.slug || 'subcategory',
          parent: subcategory.parent || null
        }));
        
        setSubcategories(transformedSubcategories);
      } catch (err) {
        console.error('Error fetching subcategories:', err);
        setError(err.message);
        setSubcategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, []);

  return { subcategories, loading, error };
};

export default useSubCategories;
