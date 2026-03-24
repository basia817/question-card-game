// In-memory store (JSON fallback — replace with PostgreSQL when ready)
let questions = [
  { id: 1, category: 'couples', text: 'What is your favorite memory of us?' },
  { id: 2, category: 'friends', text: 'What is something you have never told me?' },
  { id: 3, category: 'family',  text: 'What family tradition means the most to you?' },
];

let nextId = 4;

const getAll = () => questions;

const insert = ({ category, text }) => {
  const question = { id: nextId++, category, text };
  questions.push(question);
  return question;
};

const remove = (id) => {
  questions = questions.filter((q) => q.id !== id);
};

module.exports = { getAll, insert, remove };
