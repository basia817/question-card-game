const db = require('../data/db');

const MAX_RESULTS = 20;

/**
 * Fisher-Yates shuffle (in-place).
 */
const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const getQuestions = (category) => {
  let questions = [...db.getAll()];
  if (category) {
    questions = questions.filter((q) => q.category === category);
  }
  shuffle(questions);
  return questions.slice(0, MAX_RESULTS);
};

const createQuestion = (category, text) => {
  return db.insert({ category, text });
};

const deleteQuestion = (id) => {
  return db.remove(id);
};

module.exports = { getQuestions, createQuestion, deleteQuestion };
