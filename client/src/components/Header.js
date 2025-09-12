import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, TrendingUp } from 'lucide-react';

const Header = () => {
  return (
    <header style={styles.header} className="glass">
      <div className="container">
        <nav style={styles.nav}>
          <Link to="/" style={styles.logo}>
            <TrendingUp size={28} style={styles.logoIcon} />
            <span style={styles.logoText}>FinanceTracker</span>
          </Link>
          <Link to="/add" className="btn btn-primary" style={styles.addBtn}>
            <PlusCircle size={18} />
            <span className="hide-mobile">Add Transaction</span>
            <span className="mobile-only">Add</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: 'var(--shadow)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backdropFilter: 'blur(10px)',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'var(--primary)',
    textDecoration: 'none',
  },
  logoIcon: {
    animation: 'pulse 2s infinite',
  },
  logoText: {
    background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: 'clamp(20px, 4vw, 28px)',
  },
  addBtn: {
    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.35)',
  },
};

export default Header;