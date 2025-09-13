const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://personal-finance-tracker-gold.vercel.app',
    'https://personal-finance-tracker-gold-*.vercel.app',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposedHeaders: ['Content-Type'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

// Body parser
app.use(express.json());

// Mount routers
const transactions = require('./routes/transactions');
app.use('/api/transactions', transactions);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});