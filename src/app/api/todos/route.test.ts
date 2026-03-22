import { expect, test } from 'vitest';
import { $fc } from './frourio.client';

test('GET /api/todos', async () => {
  const res = await $fc().$get();

  expect(res).toBeInstanceOf(Array);
});

test('POST /api/todos', async () => {
  const res = await $fc().$post({ body: { title: 'テスト' } });

  expect(res.title).toBe('テスト');
  expect(res.done).toBe(false);
});