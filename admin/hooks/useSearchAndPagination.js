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

  // Search functionality
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
    
    if (!query.trim()) {
      setFilteredData(allData);
      return;
    }
    
    const filtered = allData.filter(item => {
      return searchFields.some(field => {
        const value = item[field];
        if (value === null || value === undefined) return false;
        return value.toString().toLowerCase().includes(query.toLowerCase());
      });
    });
    
    setFilteredData(filtered);
  }, [allData, searchFields]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    // Refetch data when page changes (for server-side pagination)
    if (page !== currentPage) {
      fetchData();
    }
  }, [currentPage, fetchData]);

  // Refresh data
  const refreshData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setFilteredData(allData);
    setCurrentPage(1);
  }, [allData]);

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
