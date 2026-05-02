import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LineChart, Bell } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Keşfet', icon: <Home size={22} /> },
    { path: '/tracking', label: 'Takip', icon: <LineChart size={22} /> },
    { path: '/alerts', label: 'Alarmlar', icon: <Bell size={22} /> },
  ];

  return (
    <nav style={styles.nav}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.path} 
            to={item.path} 
            style={{
              ...styles.navItem,
              color: isActive ? 'var(--accent-color)' : 'var(--text-secondary)'
            }}
          >
            {item.icon}
            <span style={styles.label}>{item.label}</span>
            {isActive && <div style={styles.activeIndicator} />}
          </Link>
        )
      })}
    </nav>
  );
}

const styles = {
  nav: {
    height: 'var(--nav-height)',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    maxWidth: '480px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(12px)',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 10,
    borderTop: '1px solid var(--border-color)',
    paddingBottom: 'env(safe-area-inset-bottom)'
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
    transition: 'color 0.2s ease',
  },
  label: {
    fontSize: '0.7rem',
    marginTop: '0.25rem',
    fontWeight: '500'
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: '40%',
    height: '3px',
    backgroundColor: 'var(--accent-color)',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
  }
};
