import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>
        <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '900', fontSize: '1.6rem' }}>İzci</span>
      </Link>
      <div style={styles.actions}>
        <Link to="/search" style={styles.iconBtn}>
          <Search size={20} />
        </Link>
        <Link to="/alerts" style={styles.iconBtn}>
          <Bell size={20} />
        </Link>
        <Link to="/login" style={styles.iconBtn}>
          <User size={20} />
        </Link>
      </div>
    </header>
  );
}

const styles = {
  header: {
    height: 'var(--header-height)',
    width: '100%',
    position: 'fixed',
    top: 0,
    maxWidth: '480px', /* Matches app width */
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1rem',
    zIndex: 10,
    borderBottom: '1px solid var(--border-color)',
  },
  logo: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center'
  },
  actions: {
    display: 'flex',
    gap: '0.75rem'
  },
  iconBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem',
    borderRadius: '50%',
    color: 'var(--text-primary)',
    backgroundColor: 'var(--bg-color)'
  }
};
