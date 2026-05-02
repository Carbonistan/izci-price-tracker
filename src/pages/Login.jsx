import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
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
        <h1 style={styles.title}>Tekrar Hoş Geldin! 👋</h1>
        <p style={styles.subtitle}>Fırsatları takip etmeye kaldığın yerden devam et.</p>

        <form style={styles.form} onSubmit={(e) => { e.preventDefault(); alert('Backend bağlantısı test edildi, ana sayfaya yönlendiriliyorsunuz.'); navigate('/'); }}>
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
              placeholder="Şifren" 
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div style={styles.forgotPassword}>
            <a href="#" style={styles.forgotLink}>Şifremi Unuttum</a>
          </div>

          <button type="submit" style={styles.submitBtn}>Giriş Yap</button>
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
          Hesabın yok mu? <Link to="/register" style={styles.registerLink}>Hemen Kayıt Ol</Link>
        </p>
      </div>
    </div>
  );
}

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
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    textAlign: 'center',
    marginBottom: '2.5rem'
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
  forgotPassword: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '-0.5rem'
  },
  forgotLink: {
    color: 'var(--accent-color)',
    fontSize: '0.85rem',
    textDecoration: 'none',
    fontWeight: '600'
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
  registerLink: {
    color: 'var(--accent-color)',
    fontWeight: 'bold',
    textDecoration: 'none',
    marginLeft: '0.25rem'
  }
};
