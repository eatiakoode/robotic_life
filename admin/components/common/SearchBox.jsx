"use client";
import { useState, useCallback, useMemo } from 'react';

const SearchBox = ({ 
  onSearch, 
  placeholder = "Search...", 
  className = "",
  size = "default",
  showLoading = true 
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debug logging
  console.log('SearchBox render:', { onSearch: typeof onSearch, placeholder, searchValue });

  // Debounced search to prevent excessive API calls
  const debouncedSearch = useMemo(() => {
    let timeoutId;
    return (value) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        console.log('Debounced search executing with value:', value);
        if (onSearch && typeof onSearch === 'function') {
          onSearch(value);
        } else {
          console.error('onSearch is not a function:', onSearch);
        }
      }, 300);
    };
  }, [onSearch]);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    console.log('Search input change:', value);
    setSearchValue(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('Search form submit:', searchValue);
    if (onSearch && typeof onSearch === 'function') {
      onSearch(searchValue);
    } else {
      console.error('onSearch is not a function on submit:', onSearch);
    }
  }, [searchValue, onSearch]);

  const inputClasses = size === "small" ? "form-control-sm" : "form-control";
  const buttonClasses = size === "small" ? "btn-sm" : "";

  return (
    <form 
      className={`d-flex flex-wrap align-items-center my-2 ${className}`}
      onSubmit={handleSubmit}
    >
      <div className="position-relative flex-grow-1">
        <input
          className={`${inputClasses} mr-sm-2`}
          type="search"
          placeholder={placeholder}
          aria-label="Search"
          value={searchValue}
          onChange={handleInputChange}
          style={{ minWidth: size === "small" ? '150px' : '200px' }}
        />
        {showLoading && isSearching && (
          <div className="position-absolute top-50 end-0 translate-middle-y me-2">
            <div className="spinner-border spinner-border-sm text-primary" role="status">
              <span className="visually-hidden">Searching...</span>
            </div>
          </div>
        )}
      </div>
      <button 
        className={`btn btn-primary my-2 my-sm-0 ms-2 ${buttonClasses}`}
        type="submit"
        disabled={isSearching}
      >
        <span className="flaticon-magnifying-glass"></span>
      </button>
    </form>
  );
};

export default SearchBox;
