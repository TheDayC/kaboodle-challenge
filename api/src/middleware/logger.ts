import { Request, Response, NextFunction } from 'express';
import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/access.log' }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    ],
});

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`🚪 Route Accessed: ${req.method} ${req.url}`);
    next();
};

export const errorLogger = (err: Error, req: Request, res: Response) => {
    logger.error(`❌ Error: ${err.message}`, { stack: err.stack });
    res.status(500).json({ error: 'An error occurred!' });
};
