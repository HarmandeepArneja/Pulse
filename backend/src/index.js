const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { PrismaClient } = require('@prisma/client');
const apiRouter = require('./routes');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Pulse API is running' });
});

app.use('/api', apiRouter);

// TODO: Add routes for auth, checkins, analytics, integrations, email

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Pulse backend running on http://localhost:${PORT}`);
}); 