import { NextRequest } from 'next/server';
import { afterEach, expect, test } from 'vitest';
import { prismaClient } from 'server/lib/prismaClient';
import { POST } from '../route';
import { PATCH } from './route';

afterEach(async () => {
  await prismaClient.todo.deleteMany();
});

test('PATCH - doneをtrueに更新できる', async () => {
  // ① Todoを作成する
  const postRes = await POST(
    new NextRequest('http://localhost/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title: 'テスト' }),
    }),
  );
  expect(postRes.status).toBe(201);

  // ② POST のレスポンスを検証しつつ id を取得する
  const created = await postRes.json() as { id: string };
  const params = Promise.resolve({ id: created.id });

  // ③ doneをtrueに更新する
  const res = await PATCH(
    new NextRequest(`http://localhost/api/todos/${created.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ done: true }),
    }),
    { params },
  );

  // ④ 変数に代入せず直接検証する
  expect(res.status).toBe(200);
  await expect(res.json()).resolves.toEqual(
    expect.objectContaining({ done: true }),
  );
});