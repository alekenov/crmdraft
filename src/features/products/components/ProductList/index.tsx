import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import styles from './styles.module.css';
import type { IProduct } from '../../types';

interface ProductListProps {
  // добавьте пропсы если нужно
}

export const ProductList = (props: ProductListProps) => {
  const { products, loading, filters, setFilters } = useProducts();

  const renderTableView = () => (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Изображение</th>
            <th>Название</th>
            <th>Тип</th>
            <th>Цена</th>
            <th>Склад</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className={styles.productImage}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.type === 'combo' ? 'Комбо' : 'Товар'}</td>
              <td>{product.price} ₽</td>
              <td>{product.stock}</td>
              <td>
                <button className={styles.actionButton}>Изменить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCardView = () => (
    <div className={styles.cardGrid}>
      {products.map(product => (
        <div key={product.id} className={styles.card}>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className={styles.cardImage}
          />
          <div className={styles.cardContent}>
            <h3>{product.name}</h3>
            <p>{product.type === 'combo' ? 'Комбо' : 'Товар'}</p>
            <p>{product.price} ₽</p>
            {product.type === 'combo' && (
              <div className={styles.comboItems}>
                {product.items.map(item => (
                  <span key={item.productId}>
                    {item.quantity}x {/* Здесь нужно добавить название товара */}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        {/* Фильтры здесь */}
      </div>
      <div className={styles.content}>
        {/* Используем CSS медиа-запросы для переключения видов */}
        {renderTableView()}
        {renderCardView()}
      </div>
    </div>
  );
}; 