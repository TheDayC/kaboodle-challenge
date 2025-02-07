import { z } from 'zod';

export const eventSchema = z.object({
    id: z.number(),
    name: z.string(),
    date: z.string(),
    description: z.string(),
});
