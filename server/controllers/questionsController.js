const questionsService = require('../services/questionsService');

const VALID_CATEGORIES = ['couples', 'friends', 'family'];

const getQuestions = (req, res, next) => {
  try {
    const { category } = req.query;
    const questions = questionsService.getQuestions(category);
    res.json(questions);
  } catch (err) {
    next(err);
  }
};

const createQuestion = (req, res, next) => {
  try {
    const { category, text } = req.body;

    if (!category || !VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({
        error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(', ')}`,
      });
    }

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Text must be a non-empty string' });
    }

    const question = questionsService.createQuestion(category, text);
    res.status(201).json(question);
  } catch (err) {
    next(err);
  }
};

const deleteQuestion = (req, res, next) => {
  try {
    const { id } = req.params;
    questionsService.deleteQuestion(Number(id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { getQuestions, createQuestion, deleteQuestion };
