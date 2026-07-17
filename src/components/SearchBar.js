import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar">
      <label htmlFor="product-search">Search</label>
      <input
        id="product-search"
        type="text"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search by product name"
      />
    </div>
  );
};

export default React.memo(SearchBar);
