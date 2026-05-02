import React from 'react';
import { TrendingDown, Bell, BellOff, ExternalLink } from 'lucide-react';

export default function ProductCard({ product, onToggleTrack }) {
  const formatPrice = (price, currency = 'TRY') => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: currency }).format(price);
  };

  const hasDropped = product.previousPrice > product.currentPrice;
  const dropPercentage = hasDropped 
    ? Math.round(((product.previousPrice - product.currentPrice) / product.previousPrice) * 100)
    : 0;

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img src={product.image} alt={product.name} style={styles.image} />
        {product.isInternational && (
          <div style={styles.intlBadge}>✈️ Yurtdışı</div>
        )}
      </div>
      <div style={styles.details}>
        <a href={product.url} target="_blank" rel="noopener noreferrer" style={styles.titleLink}>
          <h3 style={styles.title}>{product.name}</h3>
          <ExternalLink size={14} style={styles.linkIcon} />
        </a>
        <span style={styles.store}>{product.store}</span>
        
        <div style={styles.priceContainer}>
          <div>
            <div style={styles.currentPrice}>{formatPrice(product.currentPrice, product.currency)}</div>
            {hasDropped && (
              <div style={styles.previousPrice}>{formatPrice(product.previousPrice, product.currency)}</div>
            )}
          </div>
          
          {hasDropped && (
            <div style={styles.badge}>
              <TrendingDown size={14} style={{ marginRight: '4px' }} />
              %{dropPercentage}
            </div>
          )}
        </div>
      </div>
      <button 
        style={{
          ...styles.trackBtn, 
          color: product.isTracking ? 'var(--accent-color)' : 'var(--text-secondary)'
        }}
        onClick={() => onToggleTrack(product.id)}
      >
        {product.isTracking ? <Bell size={20} /> : <BellOff size={20} />}
      </button>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: 'var(--bg-card)',
    borderRadius: '16px',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-md)',
    position: 'relative',
    overflow: 'hidden'
  },
  imageContainer: {
    width: '64px',
    height: '64px',
    backgroundColor: 'var(--bg-color)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  intlBadge: {
    position: 'absolute',
    bottom: '4px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0,0,0,0.65)',
    color: 'white',
    fontSize: '0.55rem',
    padding: '2px 6px',
    borderRadius: '10px',
    whiteSpace: 'nowrap',
    fontWeight: 'bold',
    backdropFilter: 'blur(4px)'
  },
  details: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },
  titleLink: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.25rem',
    textDecoration: 'none',
    color: 'inherit',
    paddingRight: '1.5rem'
  },
  title: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    margin: 0,
    lineHeight: '1.2'
  },
  linkIcon: {
    color: 'var(--text-secondary)',
    flexShrink: 0,
    marginTop: '2px'
  },
  store: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)'
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: '0.5rem'
  },
  currentPrice: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: 'var(--text-primary)'
  },
  previousPrice: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    textDecoration: 'line-through'
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)', /* Emerald with opacity */
    color: 'var(--accent-color)',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: 'bold'
  },
  trackBtn: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    padding: '0.25rem'
  }
};
