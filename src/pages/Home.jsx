import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../mockData';
import { Settings2, X } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState(mockProducts); // Fallback data
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterLocation, setFilterLocation] = useState('all'); // 'all', 'local', 'intl'
  const [minDrop, setMinDrop] = useState(0); // 0, 10, 20, 30
  
  const categories = [
    'Teknoloji', 'Süpermarket', 'Kırtasiye', 
    'Moda', 'Kozmetik', 'Ev & Yaşam', 'Spor & Outdoor'
  ];
  
  // İlgi alanlarını LocalStorage'da tutarak Bundle gibi kişiselleştirilmiş deneyim sağla
  const [selectedInterests, setSelectedInterests] = useState(() => {
    const saved = localStorage.getItem('izci_interests');
    return saved ? JSON.parse(saved) : ['Teknoloji'];
  });

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('API Error, using fallback data:', err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('izci_interests', JSON.stringify(selectedInterests));
  }, [selectedInterests]);

  const toggleInterest = (category) => {
    if (selectedInterests.includes(category)) {
      setSelectedInterests(selectedInterests.filter(c => c !== category));
    } else {
      setSelectedInterests([...selectedInterests, category]);
    }
  };

  const handleToggleTrack = (id) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, isTracking: !p.isTracking } : p
    ));
  };

  // Seçili ilgi alanlarına göre filtrele ve fiyat düşüşüne göre Bundle tarzı karma bir akış (feed) oluştur
  const myFeedProducts = [...products]
    .filter(p => {
      // 1. Kategori Kontrolü
      if (!selectedInterests.includes(p.category)) return false;
      
      // 2. Fiyat Düşüşü Var mı?
      if (p.currentPrice >= p.previousPrice) return false;

      // 3. Konum Filtresi
      if (filterLocation === 'local' && p.isInternational) return false;
      if (filterLocation === 'intl' && !p.isInternational) return false;

      // 4. Minimum İndirim Oranı Filtresi
      const dropPercentage = ((p.previousPrice - p.currentPrice) / p.previousPrice) * 100;
      if (dropPercentage < minDrop) return false;

      return true;
    })
    .sort((a, b) => {
      const dropA = (a.previousPrice - a.currentPrice) / a.previousPrice;
      const dropB = (b.previousPrice - b.currentPrice) / b.previousPrice;
      return dropB - dropA;
    })
    .slice(0, 10); // Akış için en iyi 10 fırsat

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleRow}>
          <h2 style={styles.heading}>Sana Özel Akış</h2>
          <button style={styles.iconBtn} onClick={() => setIsFilterOpen(true)}>
            <Settings2 size={20} color="var(--text-secondary)" />
          </button>
        </div>
        <p style={styles.subtext}>Sadece ilgilendiğin kategorilerdeki en iyi fırsatlar.</p>
      </div>

      <div style={styles.categories}>
        {categories.map(cat => {
          const isSelected = selectedInterests.includes(cat);
          return (
            <button 
              key={cat}
              onClick={() => toggleInterest(cat)}
              style={{
                ...styles.categoryBtn,
                backgroundColor: isSelected ? 'var(--accent-color)' : 'var(--bg-card)',
                color: isSelected ? '#fff' : 'var(--text-primary)',
                borderColor: isSelected ? 'var(--accent-color)' : 'var(--border-color)',
                boxShadow: isSelected ? '0 4px 10px rgba(99, 102, 241, 0.3)' : 'none'
              }}
            >
              {isSelected ? '✓ ' : '+ '}{cat}
            </button>
          )
        })}
      </div>

      <div style={styles.list}>
        {selectedInterests.length === 0 ? (
          <div style={styles.emptyState}>
            <Settings2 size={40} color="var(--border-color)" style={{ marginBottom: '1rem' }} />
            <p style={styles.emptyText}>Akışını oluşturmak için yukarıdan en az bir ilgi alanı seçmelisin.</p>
          </div>
        ) : myFeedProducts.length === 0 ? (
          <p style={styles.emptyText}>Seçtiğin alanlarda şu an düşüşte olan ürün yok.</p>
        ) : (
          myFeedProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onToggleTrack={handleToggleTrack}
            />
          ))
        )}
      </div>

      {isFilterOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Akış Filtreleri</h3>
              <button style={styles.iconBtn} onClick={() => setIsFilterOpen(false)}>
                <X size={24} color="var(--text-primary)" />
              </button>
            </div>

            <div style={styles.filterSection}>
              <h4 style={styles.filterLabel}>Satıcı Konumu</h4>
              <div style={styles.filterOptions}>
                <button 
                  style={{...styles.filterBtn, ...(filterLocation === 'all' ? styles.filterBtnActive : {})}}
                  onClick={() => setFilterLocation('all')}
                >Hepsi</button>
                <button 
                  style={{...styles.filterBtn, ...(filterLocation === 'local' ? styles.filterBtnActive : {})}}
                  onClick={() => setFilterLocation('local')}
                >Sadece Yurtiçi</button>
                <button 
                  style={{...styles.filterBtn, ...(filterLocation === 'intl' ? styles.filterBtnActive : {})}}
                  onClick={() => setFilterLocation('intl')}
                >Sadece Yurtdışı</button>
              </div>
            </div>

            <div style={styles.filterSection}>
              <h4 style={styles.filterLabel}>Minimum İndirim</h4>
              <div style={styles.filterOptions}>
                {[0, 10, 20, 30].map(val => (
                  <button 
                    key={val}
                    style={{...styles.filterBtn, ...(minDrop === val ? styles.filterBtnActive : {})}}
                    onClick={() => setMinDrop(val)}
                  >
                    {val === 0 ? 'Tümü' : `%${val}+`}
                  </button>
                ))}
              </div>
            </div>

            <button style={styles.applyBtn} onClick={() => setIsFilterOpen(false)}>
              Sonuçları Göster
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '1.5rem 0',
  },
  header: {
    padding: '0 1rem',
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.25rem'
  },
  heading: {
    fontSize: '1.5rem',
    margin: 0
  },
  subtext: {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    marginBottom: '1rem'
  },
  categories: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    padding: '0 1rem 1rem 1rem',
  },
  categoryBtn: {
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    border: '1px solid',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 1rem'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem 1rem',
    backgroundColor: 'var(--bg-card)',
    borderRadius: '16px',
    border: '1px dashed var(--border-color)'
  },
  emptyText: {
    color: 'var(--text-secondary)',
    textAlign: 'center',
    fontSize: '0.95rem',
    margin: 0,
    lineHeight: '1.4'
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.25rem'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backdropFilter: 'blur(4px)'
  },
  modalContent: {
    width: '100%',
    maxWidth: '480px',
    backgroundColor: 'var(--bg-card)',
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
    padding: '1.5rem',
    boxShadow: '0 -4px 20px rgba(0,0,0,0.1)'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  modalTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    margin: 0
  },
  filterSection: {
    marginBottom: '1.5rem'
  },
  filterLabel: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    marginBottom: '0.75rem',
    fontWeight: '600'
  },
  filterOptions: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap'
  },
  filterBtn: {
    padding: '0.5rem 1rem',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-color)',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  filterBtnActive: {
    backgroundColor: 'var(--accent-color)',
    color: '#fff',
    borderColor: 'var(--accent-color)'
  },
  applyBtn: {
    width: '100%',
    padding: '1rem',
    backgroundColor: 'var(--accent-color)',
    color: '#fff',
    border: 'none',
    borderRadius: '16px',
    fontSize: '1.05rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '0.5rem'
  }
};
