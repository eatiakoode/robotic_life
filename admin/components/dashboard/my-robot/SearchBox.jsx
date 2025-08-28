"use client";
import { useState, useCallback, useMemo } from 'react';

const SearchBox = ({ onSearch, placeholder = "Search robots...", className = "" }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search to prevent excessive API calls
  const debouncedSearch = useMemo(() => {
    let timeoutId;
    return (value) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        onSearch(value);
      }, 300);
    };
  }, [onSearch]);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSearch(searchValue);
  }, [searchValue, onSearch]);

  return (
    <form 
      className={`d-flex flex-wrap align-items-center my-2 ${className}`}
      onSubmit={handleSubmit}
    >
      <div className="position-relative flex-grow-1">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder={placeholder}
          aria-label="Search"
          value={searchValue}
          onChange={handleInputChange}
          style={{ minWidth: '200px' }}
        />
        {isSearching && (
          <div className="position-absolute top-50 end-0 translate-middle-y me-2">
            <div className="spinner-border spinner-border-sm text-primary" role="status">
              <span className="visually-hidden">Searching...</span>
            </div>
          </div>
        )}
      </div>
      <button 
        className="btn btn-primary my-2 my-sm-0 ms-2" 
        type="submit"
        disabled={isSearching}
      >
        <span className="flaticon-magnifying-glass"></span>
      </button>
    </form>
  );
};

export default SearchBox;
