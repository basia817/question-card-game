require('dotenv').config();

const express = require('express');
const cors = require('cors');

const questionsRouter = require('./routes/questions');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/questions', questionsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Question Card Game API is running.' });
});

// Centralised error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
