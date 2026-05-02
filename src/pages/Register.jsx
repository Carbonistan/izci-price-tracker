import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          <ArrowLeft size={24} />
        </button>
      </div>

      <div style={styles.content}>
        <div style={styles.logoContainer}>
          <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '900', fontSize: '2.5rem' }}>İzci</span>
        </div>
        <h1 style={styles.title}>Fırsatlara Katıl! 🚀</h1>
        <p style={styles.subtitle}>Ücretsiz bir hesap oluştur ve binlerce ürünü takip etmeye başla.</p>

        <form style={styles.form} onSubmit={(e) => { e.preventDefault(); alert('Kayıt tamamlandı!'); navigate('/'); }}>
          <div style={styles.inputGroup}>
            <User size={20} style={styles.inputIcon} />
            <input 
              type="text" 
              placeholder="Adın Soyadın" 
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <Mail size={20} style={styles.inputIcon} />
            <input 
              type="email" 
              placeholder="E-posta Adresin" 
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <Lock size={20} style={styles.inputIcon} />
            <input 
              type="password" 
              placeholder="Şifre Belirle" 
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={styles.submitBtn}>Hesap Oluştur</button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerLine}></span>
          <span style={styles.dividerText}>veya</span>
          <span style={styles.dividerLine}></span>
        </div>

        <div style={styles.socialGrid}>
          <button style={styles.socialBtn}>
            <span style={{marginRight: '8px', fontSize: '1.2rem'}}>🌐</span> Google
          </button>
          <button style={styles.socialBtn}>
            <span style={{marginRight: '8px', fontSize: '1.2rem'}}>🍏</span> Apple
          </button>
          <button style={styles.socialBtn}>
            <span style={{marginRight: '8px', fontSize: '1.2rem'}}>📘</span> Facebook
          </button>
        </div>

        <p style={styles.footerText}>
          Zaten hesabın var mı? <Link to="/login" style={styles.loginLink}>Giriş Yap</Link>
        </p>
      </div>
    </div>
  );
}

// Reuse the exact same styles from Login for consistency
const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--bg-color)'
  },
  header: {
    padding: '1.5rem 1rem',
  },
  backBtn: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '50%',
    padding: '0.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-primary)'
  },
  content: {
    flex: 1,
    padding: '0 2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '-2rem'
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem'
  },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    margin: '0 0 0.5rem 0',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    textAlign: 'center',
    marginBottom: '2.5rem',
    lineHeight: '1.4'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '0 1rem',
    height: '56px',
    transition: 'all 0.3s ease'
  },
  inputIcon: {
    color: 'var(--text-secondary)',
    marginRight: '0.75rem'
  },
  input: {
    flex: 1,
    border: 'none',
    background: 'none',
    outline: 'none',
    color: 'var(--text-primary)',
    fontSize: '1rem',
    height: '100%'
  },
  submitBtn: {
    backgroundColor: 'var(--accent-color)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    padding: '1.25rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
    marginTop: '0.5rem'
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '2rem 0',
    gap: '1rem'
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: 'var(--border-color)'
  },
  dividerText: {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  socialGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginBottom: '2rem'
  },
  socialBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--bg-card)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '0.85rem',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%'
  },
  footerText: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    fontSize: '0.95rem'
  },
  loginLink: {
    color: 'var(--accent-color)',
    fontWeight: 'bold',
    textDecoration: 'none',
    marginLeft: '0.25rem'
  }
};
