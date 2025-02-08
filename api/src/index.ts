import express from 'express';
import cors from 'cors';
import * as entries from './db/entries.json';

import eventRoutes from './routes/events';
import logger from './utils/logger';
import { errorLogger, requestLogger } from './middleware/logger';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(errorLogger);

app.use('/events', eventRoutes);

app.listen(PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${PORT}`);
    console.log(entries);
});
