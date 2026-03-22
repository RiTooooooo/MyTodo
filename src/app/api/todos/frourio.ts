import type { FrourioSpec } from '@frourio/next';
import { z } from 'zod';

export const frourioSpec = {
  // Todo一覧取得
  get: {
    res: {
      200: {
        body: z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            done: z.boolean(),
            createdAt: z.string(),
          }),
        ),
      },
    },
  },
  // Todo作成
  post: {
    body: z.object({ title: z.string() }),
    res: {
      201: {
        body: z.object({
          id: z.string(),
          title: z.string(),
          done: z.boolean(),
          createdAt: z.string(),
        }),
      },
    },
  },
} satisfies FrourioSpec;
