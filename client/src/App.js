import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="App" style={styles.app}>
        <div style={styles.backgroundGradient} />
        <Header />
        <main style={styles.main}>
          <div className="container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<TransactionForm />} />
              <Route path="/:id/edit" element={<TransactionForm />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

const styles = {
  app: {
    position: 'relative',
    minHeight: '100vh',
  },
  backgroundGradient: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 20%, #f093fb 50%, #f5576c 100%)',
    opacity: 0.05,
    zIndex: -1,
  },
  main: {
    minHeight: 'calc(100vh - 80px)',
    paddingTop: '32px',
    paddingBottom: '32px',
  },
};

export default App;