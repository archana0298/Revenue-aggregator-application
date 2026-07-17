import React, { useState, useEffect, useMemo, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import RevenueTable from './components/RevenueTable';
import { aggregateProducts, calculateTotalRevenue, filterProductsByName } from './utils/aggregateProducts';

const BRANCH_ENDPOINTS = ['/api/branch1.json', '/api/branch2.json', '/api/branch3.json'];

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let isMounted = true;

    const loadBranches = async () => {
      try {
        const responses = await Promise.all(
          BRANCH_ENDPOINTS.map((endpoint) => fetch(endpoint))
        );

        responses.forEach((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch ${response.url}`);
          }
        });

        const branchesData = await Promise.all(responses.map((response) => response.json()));

        if (isMounted) {
          setProducts(aggregateProducts(branchesData));
          setStatus('success');
        }
      } catch (error) {
        if (isMounted) {
          setStatus('error');
        }
      }
    };

    loadBranches();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  const filteredProducts = useMemo(
    () => filterProductsByName(products, searchTerm),
    [products, searchTerm]
  );

  const filteredTotalRevenue = useMemo(
    () => calculateTotalRevenue(filteredProducts),
    [filteredProducts]
  );

  if (status === 'loading') {
    return (
      <div className="app-container">
        <p className="status-message">Loading revenue data...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="app-container">
        <p className="status-message error">Unable to load revenue data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>Revenue Aggregator</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <RevenueTable products={filteredProducts} totalRevenue={filteredTotalRevenue} />
    </div>
  );
};

export default App;
