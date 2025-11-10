const db = require('../src/db');

describe('Feature Flags DB Utils', () => {
  const feature = 'testFeature';
  const userId = '999';

  afterAll(async () => {
    await db.setFlag(feature, userId, null); // or delete the test flag
  });

  test('setFlag and getFlag for a user', async () => {
    await db.setFlag(feature, userId, true);

    const result = await db.getFlag(feature, userId);

    expect(result.enabled).toBe(true);
    expect(result.reason).toBe('user');
  });

  test('getFlag returns global when user flag not set', async () => {
    await db.setFlag(feature, null, false); // null userId = global

    const result = await db.getFlag(feature, 'anotherUser');

    expect(result.enabled).toBe(false);
    expect(result.reason).toBe('global');
  });
});
