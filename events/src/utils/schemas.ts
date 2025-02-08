import { DateTime } from 'luxon';
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

export const eventsSchema = z.array(eventSchema);

// Before we POST our event date as an ISO string it's held as a Luxon DateTime.
// This custom schema lets us validate that specific type with Zod and in turn via RHF to pass the correct value type.
const dateTimeSchema = z.custom<DateTime>((value) => value instanceof DateTime && value.isValid, {
    message: 'Invalid DateTime object',
});

export const eventSubmissionSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string(),
    date: dateTimeSchema,
    tickets: z.array(
        z.object({
            name: z.string().min(1, 'Ticket name is required'),
            type: z.string(),
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
            availability: z.string(),
        })
    ),
});
