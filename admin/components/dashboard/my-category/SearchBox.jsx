import { useState } from "react";

const SearchBox = ({ onSearch, placeholder = "Search" }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    // Debounce search - trigger search after 500ms of no typing
    if (handleChange.timeout) {
      clearTimeout(handleChange.timeout);
    }
    handleChange.timeout = setTimeout(() => {
      onSearch(value);
    }, 500);
  };

  return (
    <form className="d-flex flex-wrap align-items-center my-2" onSubmit={handleSubmit}>
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder={placeholder}
        aria-label="Search"
        value={query}
        onChange={handleChange}
      />
      <button className=" my-2 my-sm-0" type="submit">
        <span className="flaticon-magnifying-glass"></span>
      </button>
    </form>
  );
};

export default SearchBox;
