import express from 'express';
import { getEvents, getEventById } from '../controllers/events';

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);

export default router;
