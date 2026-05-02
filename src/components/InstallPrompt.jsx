import React, { useState, useEffect } from 'react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Daha önce kapatıldıysa gösterme
    if (localStorage.getItem('izci_install_dismissed')) return;

    // Android / Chrome: Otomatik yükleme istemi
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // iOS: Safari kontrolü
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isIOS && !isStandalone) {
      setShowIOSPrompt(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('izci_install_dismissed', 'true');
  };

  if (dismissed) return null;

  // Android / Chrome kurulum banner'ı
  if (deferredPrompt) {
    return (
      <div style={styles.banner}>
        <div style={styles.content}>
          <span style={styles.emoji}>📲</span>
          <div>
            <p style={styles.title}>İzci'yi Telefonuna Yükle!</p>
            <p style={styles.subtitle}>Fırsatları anında takip et.</p>
          </div>
        </div>
        <div style={styles.actions}>
          <button onClick={handleInstall} style={styles.installBtn}>Yükle</button>
          <button onClick={handleDismiss} style={styles.closeBtn}>✕</button>
        </div>
      </div>
    );
  }

  // iOS Safari kurulum banner'ı
  if (showIOSPrompt) {
    return (
      <div style={styles.banner}>
        <div style={styles.content}>
          <span style={styles.emoji}>📲</span>
          <div>
            <p style={styles.title}>İzci'yi Ana Ekranına Ekle!</p>
            <p style={styles.subtitle}>
              Alttaki <strong>⬆️ Paylaş</strong> butonuna bas, ardından <strong>"Ana Ekrana Ekle"</strong> seçeneğine dokun.
            </p>
          </div>
        </div>
        <div style={styles.actions}>
          <button onClick={handleDismiss} style={styles.closeBtn}>✕</button>
        </div>
      </div>
    );
  }

  return null;
}

const styles = {
  banner: {
    position: 'fixed',
    bottom: '70px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - 2rem)',
    maxWidth: '430px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: 'white',
    borderRadius: '16px',
    padding: '1rem 1.25rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 8px 30px rgba(99, 102, 241, 0.4)',
    zIndex: 9999,
    animation: 'slideUp 0.5s ease-out'
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flex: 1
  },
  emoji: {
    fontSize: '2rem'
  },
  title: {
    margin: 0,
    fontSize: '0.95rem',
    fontWeight: 'bold'
  },
  subtitle: {
    margin: '0.2rem 0 0 0',
    fontSize: '0.75rem',
    opacity: 0.9,
    lineHeight: 1.3
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginLeft: '0.5rem'
  },
  installBtn: {
    background: 'white',
    color: '#6366f1',
    border: 'none',
    borderRadius: '10px',
    padding: '0.5rem 1rem',
    fontWeight: 'bold',
    fontSize: '0.85rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  closeBtn: {
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
