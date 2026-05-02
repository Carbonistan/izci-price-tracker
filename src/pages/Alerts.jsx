import React from 'react';
import { mockAlerts } from '../mockData';
import { AlertCircle, Info } from 'lucide-react';

export default function Alerts() {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Alarmlar</h2>
      <p style={styles.subtext}>Fiyatı belirlediğin seviyeye düşen ürünler.</p>

      <div style={styles.list}>
        {mockAlerts.map(alert => (
          <div key={alert.id} style={{
            ...styles.alertCard,
            borderColor: alert.type === 'critical' ? 'rgba(239, 68, 68, 0.3)' : 'var(--border-color)',
            backgroundColor: alert.type === 'critical' ? 'rgba(239, 68, 68, 0.05)' : 'var(--bg-card)'
          }}>
            <div style={styles.iconContainer}>
              {alert.type === 'critical' ? (
                <AlertCircle size={24} color="var(--danger-color)" />
              ) : (
                <Info size={24} color="var(--accent-color)" />
              )}
            </div>
            <div style={styles.details}>
              <div style={styles.headerRow}>
                <h3 style={styles.title}>{alert.title}</h3>
                <span style={styles.time}>{alert.time}</span>
              </div>
              <p style={styles.message}>{alert.message}</p>
            </div>
          </div>
        ))}
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
    flexDirection: 'column',
    gap: '1rem'
  },
  alertCard: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid',
  },
  iconContainer: {
    paddingTop: '0.25rem'
  },
  details: {
    flex: 1
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.25rem'
  },
  title: {
    fontSize: '0.95rem',
    fontWeight: '600',
    margin: 0
  },
  time: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    whiteSpace: 'nowrap'
  },
  message: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    margin: 0,
    lineHeight: '1.4'
  }
};
