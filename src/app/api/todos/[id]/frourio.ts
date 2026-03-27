import type { FrourioSpec } from '@frourio/next';
import { z } from 'zod';

export const frourioSpec = {
  // Todo更新
  patch: {
    body: z.object({ done: z.boolean() }),
    res: {
      200: {
        body: z.object({
          id: z.string(),
          title: z.string(),
          done: z.boolean(),
          createdAt: z.string(),
        }),
      },
    },
  },
  // Todo削除
  delete: {
    res: {
      200: { body: z.object({}) },
    },
  },
} satisfies FrourioSpec;
