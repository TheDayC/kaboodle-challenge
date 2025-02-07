import express from 'express';
import eventRoutes from './routes/events';
import ticketRoutes from './routes/tickets';
import logger from './utils/logger';
import { errorLogger, requestLogger } from './middleware/logger';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(requestLogger);
app.use(errorLogger);

app.use('/events', eventRoutes);
app.use('/tickets', ticketRoutes);

app.listen(PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${PORT}`);
});
