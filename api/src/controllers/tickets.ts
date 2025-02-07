import { NextFunction, Request, Response } from 'express';
import { readDB } from '../services/database';
import { z } from 'zod';
import { ticketSchema } from '../utils/schemas';

export const getTickets = (req: Request, res: Response, next: NextFunction) => {
    try {
        const db = readDB(); // Read all DB entries.
        const tickets = z.array(ticketSchema).parse(db.tickets); // Parse the tickets object from the JSON as a specific ticket schema.

        res.json(tickets);
    } catch (err) {
        next(err); // Catch the error, send to the logger and move on.
    }
};

export const getTicketById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const db = readDB(); // Read all DB entries, we'd filter this with a query in a real database.
        const id = z.number().parse(req.params.id); // Parse the id sent in the request as a number.
        const tickets = z.array(ticketSchema).parse(db.tickets); // Parse the tickets object from the JSON as a specific ticket schema.
        const ticket = tickets.find((t) => t.id === id); // Find the ticket requested by id.

        // Should the ticket exist then return it, else inform the UI that it doesn't exist.
        if (ticket) {
            res.status(200).json(ticket);
        } else {
            res.status(404).json({ error: 'Ticket not found' });
        }
    } catch (err) {
        next(err); // Catch the error, send to the logger and move on.
    }
};
