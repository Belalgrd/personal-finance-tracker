import React, { useState, useEffect } from 'react';
import { transactionAPI } from '../services/api';
import Stats from './Stats';
import TransactionList from './TransactionList';
import { Filter, TrendingUp, TrendingDown } from 'lucide-react';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    let filtered = [...transactions];
    
    if (filter === 'income') {
      filtered = transactions.filter(t => t.amount > 0);
    } else if (filter === 'expense') {
      filtered = transactions.filter(t => t.amount < 0);
    }
    
    setFilteredTransactions(filtered);
  }, [transactions, filter]);

  const fetchTransactions = async () => {
    try {
      const { data } = await transactionAPI.getAll();
      setTransactions(data.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await transactionAPI.delete(id);
        fetchTransactions();
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    }
  };

  return (
    <div className="fade-in">
      <Stats transactions={transactions} />
      
      <div style={styles.filterSection}>
        <h2 style={styles.sectionTitle}>Transactions</h2>
        <div style={styles.filters}>
          <button
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilter('all')}
            style={styles.filterBtn}
          >
            <Filter size={16} />
            <span>All</span>
          </button>
          <button
            className={`btn ${filter === 'income' ? 'btn-success' : 'btn-outline'}`}
            onClick={() => setFilter('income')}
            style={styles.filterBtn}
          >
            <TrendingUp size={16} />
            <span className="hide-mobile">Income</span>
          </button>
          <button
            className={`btn ${filter === 'expense' ? 'btn-danger' : 'btn-outline'}`}
            onClick={() => setFilter('expense')}
            style={styles.filterBtn}
          >
            <TrendingDown size={16} />
            <span className="hide-mobile">Expense</span>
          </button>
        </div>
      </div>
      
      <TransactionList
        transactions={filteredTransactions}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
};

const styles = {
  filterSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  sectionTitle: {
    fontSize: 'clamp(18px, 3vw, 24px)',
    fontWeight: '700',
    background: 'linear-gradient(135deg, var(--dark) 0%, var(--gray) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  filters: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  filterBtn: {
    fontSize: 'clamp(12px, 2vw, 14px)',
    padding: '8px 16px',
  },
};

export default Dashboard;