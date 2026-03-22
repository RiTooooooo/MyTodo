import { prismaClient } from 'server/lib/prismaClient';
import { createRoute } from './frourio.server';

export const { GET, POST } = createRoute({
  // Todo一覧を取得する
  get: async () => {
    const todos = await prismaClient.todo.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return {
      status: 200,
      body: todos.map((todo) => ({
        ...todo,
        createdAt: todo.createdAt.toISOString(),
      })),
    };
  },
  // 新しいTodoを作成する
  post: async ({ body }) => {
    const todo = await prismaClient.todo.create({
      data: { title: body.title },
    });

    return {
      status: 201,
      body: {
        ...todo,
        createdAt: todo.createdAt.toISOString(),
      },
    };
  },
});
