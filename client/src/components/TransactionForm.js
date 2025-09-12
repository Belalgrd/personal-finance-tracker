import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { transactionAPI } from '../services/api';
import { Save, X } from 'lucide-react';

const TransactionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTransaction = useCallback(async () => {
    try {
      const { data } = await transactionAPI.getOne(id);
      const transaction = data.data;
      setFormData({
        title: transaction.title,
        amount: Math.abs(transaction.amount),
        category: transaction.category,
        date: new Date(transaction.date).toISOString().split('T')[0],
      });
    } catch (err) {
      setError('Failed to fetch transaction');
    }
  }, [id]);

  useEffect(() => {
    if (isEdit) {
      fetchTransaction();
    }
  }, [isEdit, fetchTransaction]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const amount = formData.category === 'income' 
        ? Math.abs(parseFloat(formData.amount))
        : -Math.abs(parseFloat(formData.amount));

      const transactionData = {
        ...formData,
        amount,
      };

      if (isEdit) {
        await transactionAPI.update(id, transactionData);
      } else {
        await transactionAPI.create(transactionData);
      }

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'income', label: 'Income', type: 'income' },
    { value: 'food', label: 'Food', type: 'expense' },
    { value: 'transport', label: 'Transport', type: 'expense' },
    { value: 'shopping', label: 'Shopping', type: 'expense' },
    { value: 'bills', label: 'Bills', type: 'expense' },
    { value: 'entertainment', label: 'Entertainment', type: 'expense' },
    { value: 'other', label: 'Other', type: 'expense' },
  ];

  return (
    <div style={styles.container}>
      <div className="card" style={styles.formCard}>
        <h2 style={styles.heading}>{isEdit ? 'Edit Transaction' : 'Add New Transaction'}</h2>
        
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter transaction title"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="form-control"
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label} {cat.type === 'income' ? '(+)' : '(-)'}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div style={styles.actions}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <Save size={18} />
              {loading ? 'Saving...' : (isEdit ? 'Update' : 'Add')}
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate('/')}
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
  },
  formCard: {
    padding: '32px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '24px',
  },
  error: {
    backgroundColor: '#fee',
    color: '#c00',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  actions: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px',
  },
};

export default TransactionForm;