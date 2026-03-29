import { fetchQuestions } from '../api';

describe('fetchQuestions', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('calls GET /api/questions when no category is provided', async () => {
    const mockData = [{ id: 1, category: 'couples', text: 'Test?' }];
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const result = await fetchQuestions();

    expect(fetch).toHaveBeenCalledWith('/api/questions');
    expect(result).toEqual(mockData);
  });

  it('calls GET /api/questions?category=family when category is provided', async () => {
    const mockData = [{ id: 3, category: 'family', text: 'Family question?' }];
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const result = await fetchQuestions('family');

    expect(fetch).toHaveBeenCalledWith('/api/questions?category=family');
    expect(result).toEqual(mockData);
  });

  it('throws an error when the response is not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        statusText: 'Internal Server Error',
      })
    );

    await expect(fetchQuestions()).rejects.toThrow(
      'Failed to fetch questions: Internal Server Error'
    );
  });
});
