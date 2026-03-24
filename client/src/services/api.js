const BASE_URL = '/api';

export const fetchQuestions = async (category) => {
  const url = category
    ? `${BASE_URL}/questions?category=${category}`
    : `${BASE_URL}/questions`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch questions: ${response.statusText}`);
  }
  return response.json();
};
