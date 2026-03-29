const request = require('supertest');
const app = require('../index');

describe('GET /api/questions', () => {
  it('returns 200 and an array of all questions', async () => {
    const res = await request(app).get('/api/questions');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('returns only questions matching the category filter', async () => {
    const res = await request(app).get('/api/questions?category=friends');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((q) => {
      expect(q.category).toBe('friends');
    });
  });

  it('returns an empty array for an invalid category', async () => {
    const res = await request(app).get('/api/questions?category=invalid');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe('POST /api/questions', () => {
  it('returns 201 and the new question object for a valid body', async () => {
    const res = await request(app)
      .post('/api/questions')
      .send({ category: 'couples', text: 'What song reminds you of me?' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.category).toBe('couples');
    expect(res.body.text).toBe('What song reminds you of me?');
  });
});

describe('DELETE /api/questions/:id', () => {
  it('returns 204 with an empty body for a valid id', async () => {
    const res = await request(app).delete('/api/questions/1');
    expect(res.status).toBe(204);
    expect(res.text).toBe('');
  });
});
