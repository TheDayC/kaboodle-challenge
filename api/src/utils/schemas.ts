import { z } from 'zod';

export const ticketSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    price: z.number(),
    fee: z.number(),
    availability: z.string(),
});

export const eventSchema = z.object({
    id: z.string(),
    name: z.string(),
    date: z.string(),
    description: z.string(),
    tickets: z.array(ticketSchema),
});

export const dbSchema = z.object({
    events: z.array(eventSchema),
});
