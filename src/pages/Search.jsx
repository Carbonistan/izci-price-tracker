import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../mockData';

export default function Search() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState(mockProducts);
  const navigate = useNavigate();

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('API Error:', err));
  }, []);

  const handleToggleTrack = (id) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, isTracking: !p.isTracking } : p
    ));
  };

  const filteredProducts = query.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.store.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          <ArrowLeft size={24} />
        </button>
        <div style={styles.searchBar}>
          <SearchIcon size={18} style={styles.searchIcon} />
          <input 
            autoFocus
            type="text"
            placeholder="Tüm internette ürün ara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.results}>
        {query.trim() === '' ? (
          <div style={styles.emptyState}>
            <SearchIcon size={48} color="var(--border-color)" style={{ marginBottom: '1rem' }} />
            <p style={styles.emptyText}>Türkiye'den ve dünyadan milyonlarca fırsatı saniyeler içinde ara.</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>"{query}" için bir fırsat bulunamadı.</p>
          </div>
        ) : (
          filteredProducts.map(product => (
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
    padding: '1rem 0',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem 1.5rem 1rem',
    gap: '1rem'
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem',
    borderRadius: '50%',
    backgroundColor: 'var(--bg-card)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)'
  },
  searchBar: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--accent-color)',
    borderRadius: '12px',
    padding: '0 1rem',
    height: '46px',
    boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)'
  },
  searchIcon: {
    color: 'var(--accent-color)',
    marginRight: '0.5rem'
  },
  input: {
    flex: 1,
    border: 'none',
    background: 'none',
    outline: 'none',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    width: '100%'
  },
  results: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 1rem'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 2rem',
    textAlign: 'center'
  },
  emptyText: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    lineHeight: '1.5'
  }
};
