import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { readDB, writeDB } from '../services/database';
import { eventSchema, ticketSchema } from '../utils/schemas';

export const getEvents = (req: Request, res: Response, next: NextFunction) => {
    try {
        const db = readDB();
        const events = z.array(eventSchema).parse(db.events); // Parse the events object from the JSON as a specific event schema.

        res.status(200).json(events);
    } catch (err) {
        next(err); // Catch the error, send to the logger and move on.
    }
};

export const getEventById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const db = readDB(); // Read all DB entries, we'd filter this with a query in a real database.
        const id = z.string().parse(req.params.id); // Parse the id sent in the request as a number.
        const events = z.array(eventSchema).parse(db.events); // Parse the events object from the JSON as a specific event schema.
        const event = events.find((e) => e.id === id); // Find the event requested by id.

        // Should the event exist then return it, else inform the UI that it doesn't exist.
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (err) {
        next(err); // Catch the error, send to the logger and move on.
    }
};

export const createEvent = (req: Request, res: Response, next: NextFunction) => {
    try {
        const db = readDB();

        // Create a new schema from the existing event schema that excludes the id as the UI has no concept of these.
        const eventWithTickets = eventSchema
            .omit({ id: true, tickets: true })
            .extend({ tickets: z.array(ticketSchema.omit({ id: true })) })
            .parse(req.body);

        // Push our new event and associated tickets to the db, generating uuids for each.
        db.events.push({
            id: uuidv4(),
            ...eventWithTickets,
            tickets: eventWithTickets.tickets.map((ticket) => ({
                id: uuidv4(),
                ...ticket,
            })),
        });

        // Write the newly modified db object back to the json file.
        writeDB(db);

        res.status(201).json({ message: 'Event created!' });
    } catch (err) {
        next(err); // Catch the error, send to the logger and move on.
    }
};
