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
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search and pagination state
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from API - use server-side pagination
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
      
      // Always call with pagination parameters for server-side pagination
      const data = await fetchFunction({
        limit: itemsPerPage,
        page: currentPage,
        search: searchQuery.trim()
      });
      
      // Handle different response formats
      let dataArray = [];
      let totalCount = 0;
      
      if (Array.isArray(data)) {
        dataArray = data;
      } else if (data && Array.isArray(data.items)) {
        dataArray = data.items;
        totalCount = data.totalCount || data.total || 0;
      } else if (data && typeof data === 'object') {
        const arrayProps = Object.values(data).filter(val => Array.isArray(val));
        if (arrayProps.length > 0) {
          dataArray = arrayProps[0];
        }
        totalCount = data.totalCount || data.total || 0;
      }
      
      setAllData(dataArray);
      setFilteredData(dataArray);
      setTotalCount(totalCount);
      
    } catch (err) {
      setError(err.message || "Failed to fetch data");
      setAllData([]);
      setFilteredData([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, itemsPerPage, currentPage, searchQuery]);

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
      let totalCount = 0;
      
      if (Array.isArray(data)) {
        dataArray = data;
      } else if (data && Array.isArray(data.items)) {
        dataArray = data.items;
        totalCount = data.totalCount || data.total || 0;
      } else if (data && typeof data === 'object') {
        const arrayProps = Object.values(data).filter(val => Array.isArray(val));
        if (arrayProps.length > 0) {
          dataArray = arrayProps[0];
        }
        totalCount = data.totalCount || data.total || 0;
      }
      
      setFilteredData(dataArray);
      setTotalCount(totalCount);
      
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

  // Server-side pagination - use data directly from API response
  const currentData = filteredData;
  
  // Get total pages from API response or calculate from total count
  const totalPages = useMemo(() => {
    // Use totalCount from server response for accurate pagination
    if (totalCount > 0) {
      return Math.ceil(totalCount / itemsPerPage);
    }
    // Fallback to current data length if no totalCount
    return Math.ceil(filteredData.length / itemsPerPage);
  }, [totalCount, filteredData.length, itemsPerPage]);

  // Handle page change - always use server-side pagination
  const handlePageChange = useCallback(async (page) => {
    setCurrentPage(page);
    
    try {
      setLoading(true);
      setError(null);
      
      // Always call API with pagination parameters
      const data = await fetchFunction({
        limit: itemsPerPage,
        page: page,
        search: searchQuery.trim()
      });
      
      // Handle different response formats
      let dataArray = [];
      let totalCount = 0;
      
      if (Array.isArray(data)) {
        dataArray = data;
      } else if (data && Array.isArray(data.items)) {
        dataArray = data.items;
        totalCount = data.totalCount || data.total || 0;
      } else if (data && typeof data === 'object') {
        const arrayProps = Object.values(data).filter(val => Array.isArray(val));
        if (arrayProps.length > 0) {
          dataArray = arrayProps[0];
        }
        totalCount = data.totalCount || data.total || 0;
      }
      
      setFilteredData(dataArray);
      
      // Update allData reference for total count
      if (!searchQuery.trim()) {
        setAllData(dataArray);
      }
      
    } catch (err) {
      setError(err.message || "Failed to fetch page data");
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, fetchFunction, itemsPerPage]);

  // Refresh data
  const refreshData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // Clear search
  const clearSearch = useCallback(async () => {
    setSearchQuery("");
    setCurrentPage(1);
    
    // Refetch all data without search using server-side pagination
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchFunction({
        limit: itemsPerPage,
        page: 1,
        search: ""
      });
      
      // Handle different response formats
      let dataArray = [];
      let totalCount = 0;
      
      if (Array.isArray(data)) {
        dataArray = data;
      } else if (data && Array.isArray(data.items)) {
        dataArray = data.items;
        totalCount = data.totalCount || data.total || 0;
      } else if (data && typeof data === 'object') {
        const arrayProps = Object.values(data).filter(val => Array.isArray(val));
        if (arrayProps.length > 0) {
          dataArray = arrayProps[0];
        }
        totalCount = data.totalCount || data.total || 0;
      }
      
      setAllData(dataArray);
      setFilteredData(dataArray);
      setTotalCount(totalCount);
      
    } catch (err) {
      setError(err.message || "Failed to clear search");
      setFilteredData([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, itemsPerPage]);

  // Memoized values
  const searchInfo = useMemo(() => ({
    hasSearchQuery: searchQuery.trim().length > 0,
    totalResults: totalCount, // Use server total count instead of current page data length
    totalItems: totalCount,
    currentPage,
    totalPages,
    itemsPerPage
  }), [searchQuery, totalCount, currentPage, totalPages, itemsPerPage]);


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
