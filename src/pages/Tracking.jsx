import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../mockData';

export default function Tracking() {
  // Sadece takip edilenleri göster
  const [products, setProducts] = useState(mockProducts.filter(p => p.isTracking));

  const handleToggleTrack = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Takip Ettiklerim</h2>
      <p style={styles.subtext}>{products.length} ürün izleniyor.</p>
      
      <div style={styles.list}>
        {products.length === 0 ? (
          <div style={styles.emptyState}>Henüz takip edilen ürün yok.</div>
        ) : (
          products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onToggleTrack={handleToggleTrack}
            />
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '1.5rem 1rem',
  },
  heading: {
    fontSize: '1.5rem',
    marginBottom: '0.25rem'
  },
  subtext: {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    marginBottom: '1.5rem'
  },
  list: {
    display: 'flex',
    flexDirection: 'column'
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem 1rem',
    color: 'var(--text-secondary)',
    backgroundColor: 'var(--bg-card)',
    borderRadius: '12px',
    border: '1px dashed var(--border-color)'
  }
};
