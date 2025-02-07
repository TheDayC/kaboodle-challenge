import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';

import { readDB } from '../services/database';
import { eventSchema } from '../utils/schemas';

export const getEvents = (req: Request, res: Response, next: NextFunction) => {
    try {
        const db = readDB();
        const events = z.array(eventSchema).parse(db.events); // Parse the events object from the JSON as a specific event schema.

        res.json(events);
    } catch (err) {
        next(err); // Catch the error, send to the logger and move on.
    }
};

export const getEventById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const db = readDB(); // Read all DB entries, we'd filter this with a query in a real database.
        const id = z.number().parse(req.params.id); // Parse the id sent in the request as a number.
        const events = z.array(eventSchema).parse(db.events); // Parse the events object from the JSON as a specific event schema.
        const event = events.find((e) => e.id === id); // Find the event requested by id.

        // Should the event exist then return it, else inform the UI that it doesn't exist.
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).json({ error: 'Event not found' });
        }
    } catch (err) {
        next(err); // Catch the error, send to the logger and move on.
    }
};

export const createEvent = (req: Request, res: Response, next: NextFunction) => {
    try {
        const db = readDB(); // Read all DB entries, we'd filter this with a query in a real database.
        const id = z.number().parse(req.params.id); // Parse the id sent in the request as a number.
        const events = z.array(eventSchema).parse(db.events); // Parse the events object from the JSON as a specific event schema.
        const event = events.find((e) => e.id === id); // Find the event requested by id.

        // Should the event exist then return it, else inform the UI that it doesn't exist.
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).json({ error: 'Event not found' });
        }
    } catch (err) {
        next(err); // Catch the error, send to the logger and move on.
    }
};
