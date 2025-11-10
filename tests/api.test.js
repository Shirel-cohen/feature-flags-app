const request = require('supertest');
const app = require('../src/server'); // your Express app

describe('Feature Flags API', () => {
  test('POST /api/flags - create a global flag', async () => {
    const res = await request(app)
      .post('/api/flags')
      .send({ feature: 'darkMode', enabled: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Flag saved');
  });

  test('GET /api/flags - retrieve the flag', async () => {
    const res = await request(app)
      .get('/api/flags')
      .query({ feature: 'darkMode' });

    expect(res.statusCode).toBe(200);
    expect(res.body.enabled).toBe(true);
    expect(res.body.reason).toBe('global');
  });
});
