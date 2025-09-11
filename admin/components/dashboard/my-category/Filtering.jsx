const Filtering = ({ onFilterChange }) => {
  const handleFilterChange = (e) => {
    const value = e.target.value;
    onFilterChange(value);
  };

  return (
    <select className="selectpicker show-tick form-select c_select" onChange={handleFilterChange}>
      <option value="Featured First">Featured First</option>
      <option value="Recent">Recent</option>
      <option value="Old Review">Old Review</option>
      <option value="Name A-Z">Name A-Z</option>
      <option value="Name Z-A">Name Z-A</option>
    </select>
  );
};

export default Filtering;
