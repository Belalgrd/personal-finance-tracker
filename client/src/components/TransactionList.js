import React from 'react';
import TransactionItem from './TransactionItem';
import { AlertCircle } from 'lucide-react';

const TransactionList = ({ transactions, onDelete, loading }) => {
  if (loading) {
    return <div style={styles.loading}>Loading transactions...</div>;
  }

  if (transactions.length === 0) {
    return (
      <div className="card" style={styles.empty}>
        <AlertCircle size={48} color="#9ca3af" />
        <h3>No transactions yet</h3>
        <p>Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={styles.heading}>Recent Transactions</h2>
      <div style={styles.list}>
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction._id}
            transaction={transaction}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  heading: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '20px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '16px',
    color: '#6b7280',
  },
  empty: {
    textAlign: 'center',
    padding: '60px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    color: '#6b7280',
  },
};

export default TransactionList;