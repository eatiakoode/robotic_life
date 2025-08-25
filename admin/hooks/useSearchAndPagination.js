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
      
      console.log('Fetching data with function:', fetchFunction.name || 'anonymous function');
      
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
        console.log('Trying with pagination parameters...');
        data = await fetchFunction({
          limit: itemsPerPage,
          page: currentPage
        });
      }
      
      console.log('Data received:', data);
      console.log('Data type:', typeof data);
      console.log('Is array:', Array.isArray(data));
      console.log('Data keys:', data && typeof data === 'object' ? Object.keys(data) : 'N/A');
      
      // Handle different response formats
      let dataArray = [];
      if (Array.isArray(data)) {
        // Direct array response
        dataArray = data;
        console.log('Processing as direct array, length:', dataArray.length);
      } else if (data && Array.isArray(data.items)) {
        // Response with items property
        dataArray = data.items;
        console.log('Processing as items array, length:', dataArray.length);
      } else if (data && typeof data === 'object') {
        // Try to find any array property
        const arrayProps = Object.values(data).filter(val => Array.isArray(val));
        if (arrayProps.length > 0) {
          dataArray = arrayProps[0];
          console.log('Processing as object with array property, length:', dataArray.length);
        } else {
          console.log('No array properties found in object');
        }
      }
      
      console.log('Final dataArray:', dataArray);
      console.log('Final dataArray length:', dataArray.length);
      console.log('Data array sample item:', dataArray[0]);
      
      setAllData(dataArray);
      setFilteredData(dataArray);
      
      console.log('State updated - allData and filteredData set to:', dataArray.length, 'items');
      
      // Force a re-render check
      setTimeout(() => {
        console.log('State after timeout - allData length:', dataArray.length);
        console.log('State after timeout - allData content:', dataArray);
      }, 100);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message || "Failed to fetch data");
      setAllData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, itemsPerPage, currentPage]);

  // Search functionality
  const handleSearch = useCallback((query) => {
    console.log('Search query:', query, 'All data length:', allData.length);
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
    
    console.log('Filtered results:', filtered.length);
    setFilteredData(filtered);
  }, [allData, searchFields]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = useCallback((page) => {
    console.log('Page change to:', page);
    setCurrentPage(page);
    // Refetch data when page changes (for server-side pagination)
    if (page !== currentPage) {
      fetchData();
    }
  }, [currentPage, fetchData]);

  // Refresh data
  const refreshData = useCallback(() => {
    console.log('Refreshing data');
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

  // Debug logging
  useEffect(() => {
    console.log('Hook state update:', {
      allDataLength: allData.length,
      filteredDataLength: filteredData.length,
      currentDataLength: currentData.length,
      loading,
      error,
      searchQuery,
      currentPage,
      totalPages
    });
  }, [allData.length, filteredData.length, currentData.length, loading, error, searchQuery, currentPage, totalPages]);

  // Monitor data changes
  useEffect(() => {
    console.log('Data state changed:', {
      allData: allData,
      filteredData: filteredData,
      currentData: currentData
    });
  }, [allData, filteredData, currentData]);

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
