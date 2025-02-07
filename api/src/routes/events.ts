import express from 'express';
import { getEvents, getEventById, createEvent } from '../controllers/events';

const router = express.Router();

router.get('/events', getEvents);
router.get('/events/:id', getEventById);
router.post('/events/new', createEvent);

export default router;
