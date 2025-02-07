import express from 'express';
import { getTickets, getTicketById } from '../controllers/tickets';

const router = express.Router();

router.get('/', getTickets);
router.get('/:id', getTicketById);

export default router;
