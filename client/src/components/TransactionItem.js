import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Edit2, Trash2, Calendar, Tag } from 'lucide-react';

const TransactionItem = ({ transaction, onDelete }) => {
  const isIncome = transaction.amount > 0;
  
  return (
    <div className="card slide-in" style={styles.item}>
      <div style={styles.left}>
        <h3 style={styles.title}>{transaction.title}</h3>
        <div style={styles.meta}>
          <span style={styles.metaItem}>
            <Calendar size={14} />
            <span className="hide-mobile">
              {format(new Date(transaction.date), 'MMM dd, yyyy')}
            </span>
            <span className="mobile-only">
              {format(new Date(transaction.date), 'MMM dd')}
            </span>
          </span>
          <span style={styles.metaItem}>
            <Tag size={14} />
            {transaction.category}
          </span>
        </div>
      </div>
      
      <div style={styles.right}>
        <span style={{
          ...styles.amount,
          color: isIncome ? 'var(--secondary)' : 'var(--danger)'
        }}>
          {isIncome ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </span>
        
        <div style={styles.actions}>
          <Link 
            to={`/${transaction._id}/edit`} 
            className="btn btn-outline" 
            style={styles.actionBtn}
            aria-label="Edit transaction"
          >
            <Edit2 size={16} />
          </Link>
          <button 
            onClick={() => onDelete(transaction._id)} 
            className="btn btn-outline"
            style={{ ...styles.actionBtn, color: 'var(--danger)' }}
            aria-label="Delete transaction"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    gap: '12px',
    flexWrap: 'wrap',
  },
  left: {
    flex: '1 1 auto',
    minWidth: 0,
  },
  title: {
    fontSize: 'clamp(15px, 2.5vw, 18px)',
    fontWeight: '600',
    marginBottom: '4px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  meta: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: '#6b7280',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  amount: {
    fontSize: 'clamp(16px, 2.5vw, 20px)',
    fontWeight: '700',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  actionBtn: {
    padding: '6px 10px',
  },
};

export default TransactionItem;