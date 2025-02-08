import { z } from 'zod';

export const eventSchema = z.object({
    id: z.number(),
    name: z.string(),
    date: z.string(),
    description: z.string(),
});

export const eventSubmissionSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    tickets: z.array(
        z.object({
            name: z.string().min(1, 'Ticket name is required'),
            price: z
                .string()
                .min(1, 'Min price is 1')
                .max(999, 'Max price is £999')
                .transform((val) => (val === '' ? undefined : Number(val))),
            fee: z
                .string()
                .min(0, 'Min price is 0')
                .max(100, 'Max price is £100')
                .transform((val) => (val === '' ? undefined : Number(val))),
        })
    ),
});
