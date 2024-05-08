import React, { useState } from 'react';
import './ProductFilters.css';

interface Filters {
  brandFilter: string;
  nameFilter: string;
  minPrice: number;
  maxPrice: number;
}

interface ProductFiltersProps {
  onFilter: (filters: Filters) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ onFilter }) => {
  const [brandFilter, setBrandFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);

  const handleFilterChange = () => {
    onFilter({ brandFilter, nameFilter, minPrice, maxPrice });
  };

  return (
    <div className="product-filters-container">
      <input
        type="text"
        placeholder="Brand"
        value={brandFilter}
        onChange={(e) => {
          setBrandFilter(e.target.value);
          handleFilterChange();
        }}
        className="product-filters-input"
      />
      <input
        type="text"
        placeholder="Name"
        value={nameFilter}
        onChange={(e) => {
          setNameFilter(e.target.value);
          handleFilterChange();
        }}
        className="product-filters-input"
      />
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => {
          setMinPrice(parseFloat(e.target.value));
          handleFilterChange();
        }}
        className="product-filters-input"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => {
          setMaxPrice(parseFloat(e.target.value));
          handleFilterChange();
        }}
        className="product-filters-input"
      />
    </div>
  );
};

export default ProductFilters;
