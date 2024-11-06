import React, { useState } from 'react';
import { useSupabase } from '../../hooks/useSupabase';
import { Search, Edit2, Plus, ChevronDown, ArrowUpDown } from 'lucide-react';
import ProductForm from './components/ProductForm';
import styles from './ProductsPage.module.css';

const ProductsPage = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProductForm, setShowProductForm] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const { 
    supabase, 
    data: products, 
    loading, 
    error,
    refetch: refetchProducts 
  } = useSupabase('products', {
    select: `
      id,
      name,
      description,
      price,
      category,
      sku,
      status,
      inventory (
        id,
        quantity,
        location,
        status
      )
    `
  });

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterCategory === 'all' || product.category === filterCategory) &&
    (filterStatus === 'all' || product.status === filterStatus)
  ).sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  if (loading) return <div className={styles.loading}>Загрузка данных...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  if (showProductForm) {
    return <ProductForm onClose={() => setShowProductForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 border-b bg-white border-gray-200">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Товары</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="w-full md:w-1/3 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full rounded-lg border border-gray-200 p-2"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="rounded-lg border border-gray-200 p-2"
            >
              <option value="all">Все категории</option>
              <option value="Букеты">Букеты</option>
              <option value="Композиции">Композиции</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-gray-200 p-2"
            >
              <option value="all">Все статусы</option>
              <option value="active">Активные</option>
              <option value="inactive">Неактивные</option>
            </select>
            <button
              onClick={() => setShowProductForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Добавить товар
            </button>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left w-[80px]">Фото</th>
                <th className="p-4 text-left cursor-pointer" onClick={() => handleSort('name')}>
                  Название {sortBy === 'name' && <ArrowUpDown size={16} className="inline ml-2" />}
                </th>
                <th className="p-4 text-left cursor-pointer" onClick={() => handleSort('category')}>
                  Категория {sortBy === 'category' && <ArrowUpDown size={16} className="inline ml-2" />}
                </th>
                <th className="p-4 text-right cursor-pointer" onClick={() => handleSort('inventory')}>
                  Остаток {sortBy === 'inventory' && <ArrowUpDown size={16} className="inline ml-2" />}
                </th>
                <th className="p-4 text-right cursor-pointer" onClick={() => handleSort('price')}>
                  Цена {sortBy === 'price' && <ArrowUpDown size={16} className="inline ml-2" />}
                </th>
                <th className="p-4 text-left cursor-pointer" onClick={() => handleSort('active')}>
                  Статус {sortBy === 'active' && <ArrowUpDown size={16} className="inline ml-2" />}
                </th>
                <th className="p-4 text-right w-[100px]">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts?.map(product => (
                <tr key={product.id} className={`border-b ${product.status === 'inactive' ? 'text-gray-400' : ''}`}>
                  <td className="p-4">
                    <img 
                      src={product.image_url || '/placeholder.jpg'} 
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  </td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4 text-right">
                    {product.inventory?.reduce((sum, inv) => sum + inv.quantity, 0) || 0}
                  </td>
                  <td className="p-4 text-right">{product.price.toLocaleString()} ₸</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.status === 'active'
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.status === 'active' ? 'Активный' : 'Неактивный'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="relative inline-block">
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <ChevronDown size={20} />
                      </button>
                      {/* Здесь можно добавить выпадающее меню */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;