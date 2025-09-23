import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Custom hook for managing search and pagination functionality
 * @param {Function} fetchFunction - Function to fetch data from API
 * @param {number} itemsPerPage - Number of items per page (default: 10)
 * @param {Array} searchFields - Array of field names to search in
 * @returns {Object} Object containing all necessary state and functions
 */
export const useSearchAndPagination = (fetchFunction, itemsPerPage = 10, searchFields = []) => {
  // Data state
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search and pagination state
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from API
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!fetchFunction) {
        throw new Error('fetchFunction is not provided');
      }
      
      
      if (typeof fetchFunction !== 'function') {
        throw new Error('fetchFunction is not a function');
      }
      
      // Check if the function expects parameters (like pagination filters)
      // If it has parameters, pass the current pagination state
      let data;
      try {
        // First try calling without parameters (for simple API functions)
        data = await fetchFunction();
      } catch (paramError) {
        // If that fails, try calling with pagination parameters
        data = await fetchFunction({
          limit: itemsPerPage,
          page: currentPage
        });
      }
      
      
      // Handle different response formats
      let dataArray = [];
      if (Array.isArray(data)) {
        // Direct array response
        dataArray = data;
      } else if (data && Array.isArray(data.items)) {
        // Response with items property
        dataArray = data.items;
      } else if (data && typeof data === 'object') {
        // Try to find any array property
        const arrayProps = Object.values(data).filter(val => Array.isArray(val));
        if (arrayProps.length > 0) {
          dataArray = arrayProps[0];
        } else {
        }
      }
      
      
      setAllData(dataArray);
      setFilteredData(dataArray);
      
      
    } catch (err) {
      setError(err.message || "Failed to fetch data");
      setAllData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, itemsPerPage, currentPage]);

  // Search functionality - now uses server-side search
  const handleSearch = useCallback(async (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
    
    try {
      setLoading(true);
      setError(null);
      
      // Call the API with search parameter
      const data = await fetchFunction({
        limit: itemsPerPage,
        page: 1,
        search: query.trim()
      });
      
      // Handle different response formats
      let dataArray = [];
      if (Array.isArray(data)) {
        dataArray = data;
      } else if (data && Array.isArray(data.items)) {
        dataArray = data.items;
      } else if (data && typeof data === 'object') {
        const arrayProps = Object.values(data).filter(val => Array.isArray(val));
        if (arrayProps.length > 0) {
          dataArray = arrayProps[0];
        }
      }
      
      setFilteredData(dataArray);
      
      // Update allData for reference (keep original data for comparison)
      if (!query.trim()) {
        setAllData(dataArray);
      }
      
    } catch (err) {
      setError(err.message || "Failed to search data");
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, itemsPerPage]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = useCallback(async (page) => {
    setCurrentPage(page);
    
    // If we have a search query, refetch with search + pagination
    if (searchQuery.trim()) {
      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchFunction({
          limit: itemsPerPage,
          page: page,
          search: searchQuery.trim()
        });
        
        // Handle different response formats
        let dataArray = [];
        if (Array.isArray(data)) {
          dataArray = data;
        } else if (data && Array.isArray(data.items)) {
          dataArray = data.items;
        } else if (data && typeof data === 'object') {
          const arrayProps = Object.values(data).filter(val => Array.isArray(val));
          if (arrayProps.length > 0) {
            dataArray = arrayProps[0];
          }
        }
        
        setFilteredData(dataArray);
        
      } catch (err) {
        setError(err.message || "Failed to fetch page data");
        setFilteredData([]);
      } finally {
        setLoading(false);
      }
    } else {
      // No search query, use regular pagination
      if (page !== currentPage) {
        fetchData();
      }
    }
  }, [currentPage, fetchData, searchQuery, fetchFunction, itemsPerPage]);

  // Refresh data
  const refreshData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // Clear search
  const clearSearch = useCallback(async () => {
    setSearchQuery("");
    setCurrentPage(1);
    
    // Refetch all data without search
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchFunction({
        limit: itemsPerPage,
        page: 1
      });
      
      // Handle different response formats
      let dataArray = [];
      if (Array.isArray(data)) {
        dataArray = data;
      } else if (data && Array.isArray(data.items)) {
        dataArray = data.items;
      } else if (data && typeof data === 'object') {
        const arrayProps = Object.values(data).filter(val => Array.isArray(val));
        if (arrayProps.length > 0) {
          dataArray = arrayProps[0];
        }
      }
      
      setAllData(dataArray);
      setFilteredData(dataArray);
      
    } catch (err) {
      setError(err.message || "Failed to clear search");
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, itemsPerPage]);

  // Memoized values
  const searchInfo = useMemo(() => ({
    hasSearchQuery: searchQuery.trim().length > 0,
    totalResults: filteredData.length,
    totalItems: allData.length,
    currentPage,
    totalPages,
    itemsPerPage
  }), [searchQuery, filteredData.length, allData.length, currentPage, totalPages, itemsPerPage]);


  return {
    // Data
    allData,
    filteredData,
    currentData,
    loading,
    error,

    // Search
    searchQuery,
    handleSearch,
    clearSearch,

    // Pagination
    currentPage,
    totalPages,
    handlePageChange,

    // Actions
    refreshData,

    // Info
    searchInfo
  };
};
