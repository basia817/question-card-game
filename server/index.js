const express = require('express');
const cors = require('cors');

const questionsRouter = require('./routes/questions');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/questions', questionsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Question Card Game API is running.' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
