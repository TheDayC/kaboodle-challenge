import { z } from 'zod';

export const eventSchema = z.object({
    id: z.number(),
    name: z.string(),
    date: z.string(),
    description: z.string(),
});

export const ticketSchema = z.object({
    id: z.number(),
    name: z.string(),
    type: z.string(),
    price: z.number(),
    fee: z.number(),
    availability: z.string(),
});
