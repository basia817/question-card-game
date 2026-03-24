const questionsService = require('../services/questionsService');

const getQuestions = (req, res) => {
  const { category } = req.query;
  const questions = questionsService.getQuestions(category);
  res.json(questions);
};

const createQuestion = (req, res) => {
  const { category, text } = req.body;
  const question = questionsService.createQuestion(category, text);
  res.status(201).json(question);
};

const deleteQuestion = (req, res) => {
  const { id } = req.params;
  questionsService.deleteQuestion(Number(id));
  res.status(204).send();
};

module.exports = { getQuestions, createQuestion, deleteQuestion };
