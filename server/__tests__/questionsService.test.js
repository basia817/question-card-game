const db = require('../data/db');
const { getQuestions, createQuestion, deleteQuestion } = require('../services/questionsService');

jest.mock('../data/db');

const mockQuestions = [
  { id: 1, category: 'couples', text: 'What is your favorite memory of us?' },
  { id: 2, category: 'friends', text: 'What is something you have never told me?' },
  { id: 3, category: 'family', text: 'What family tradition means the most to you?' },
  { id: 4, category: 'couples', text: 'Where do you see us in 5 years?' },
  { id: 5, category: 'friends', text: 'What is your happiest memory with me?' },
];

beforeEach(() => {
  jest.clearAllMocks();
  db.getAll.mockReturnValue([...mockQuestions]);
});

describe('getQuestions', () => {
  it('returns all questions when no category is provided', () => {
    const result = getQuestions();
    expect(result).toHaveLength(5);
    expect(db.getAll).toHaveBeenCalledTimes(1);
  });

  it('returns only questions matching the given category', () => {
    const result = getQuestions('couples');
    expect(result).toHaveLength(2);
    result.forEach((q) => {
      expect(q.category).toBe('couples');
    });
  });

  it('returns an empty array for a category with no matches', () => {
    const result = getQuestions('nonexistent');
    expect(result).toEqual([]);
  });
});

describe('createQuestion', () => {
  it('calls db.insert and returns the new question object', () => {
    const newQuestion = { id: 6, category: 'family', text: 'New question?' };
    db.insert.mockReturnValue(newQuestion);

    const result = createQuestion('family', 'New question?');

    expect(db.insert).toHaveBeenCalledWith({ category: 'family', text: 'New question?' });
    expect(result).toEqual(newQuestion);
  });
});

describe('deleteQuestion', () => {
  it('calls db.remove with the correct id', () => {
    db.remove.mockReturnValue(undefined);

    deleteQuestion(3);

    expect(db.remove).toHaveBeenCalledWith(3);
  });
});
