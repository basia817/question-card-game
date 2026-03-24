const db = require('../data/db');

const getQuestions = (category) => {
  const questions = db.getAll();
  if (category) {
    return questions.filter((q) => q.category === category);
  }
  return questions;
};

const createQuestion = (category, text) => {
  return db.insert({ category, text });
};

const deleteQuestion = (id) => {
  return db.remove(id);
};

module.exports = { getQuestions, createQuestion, deleteQuestion };
