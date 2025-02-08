import express from 'express';
import { getEvents, getEventById, createEvent } from '../controllers/events';

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/new', createEvent);

export default router;
