import React from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const Stats = ({ transactions }) => {
  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
  
  const expense = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);
  
  const balance = income - expense;

  const stats = [
    {
      title: 'Total Income',
      value: income,
      icon: TrendingUp,
      color: 'var(--secondary)',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    },
    {
      title: 'Total Expense',
      value: expense,
      icon: TrendingDown,
      color: 'var(--danger)',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    },
    {
      title: 'Balance',
      value: balance,
      icon: Wallet,
      color: 'var(--primary)',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className="card fade-in" style={{ 
          ...styles.card,
          animationDelay: `${index * 0.1}s`,
          borderLeft: `4px solid ${stat.color}`,
        }}>
          <div style={{
            ...styles.iconWrapper,
            background: stat.gradient,
          }}>
            <stat.icon size={24} color="white" />
          </div>
          <div style={styles.content}>
            <p style={styles.label}>{stat.title}</p>
            <h2 style={styles.amount}>
              ${Math.abs(stat.value).toLocaleString('en-US', { 
                minimumFractionDigits: 2,
                maximumFractionDigits: 2 
              })}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    transition: 'all 0.3s ease',
  },
  iconWrapper: {
    padding: '12px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow-md)',
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '4px',
    fontWeight: '500',
  },
  amount: {
    fontSize: 'clamp(20px, 3vw, 28px)',
    fontWeight: '700',
    lineHeight: 1,
  },
};

export default Stats;