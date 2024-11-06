import { useState, useEffect } from 'react';
import { IProduct, IProductFilters } from '../types';

export const useProducts = () => {
  const [products, setProducts] = useState([] as IProduct[]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: [],
    priceRange: { min: 0, max: 0 },
    type: 'all'
  } as IProductFilters);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    filters,
    setFilters
  };
}; 