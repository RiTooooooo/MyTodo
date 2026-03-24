import { prismaClient } from 'server/lib/prismaClient';
import { createRoute } from './frourio.server';

export const { PATCH } = createRoute({
  // Todoの完了状態を更新する
  patch: async ({ params, body }) => {
    const todo = await prismaClient.todo.update({
      where: { id: params.id },
      data: { done: body.done },
    });

    return {
      status: 200 as const,
      body: {
        ...todo,
        createdAt: todo.createdAt.toISOString(),
      },
    };
  },
});
