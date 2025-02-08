/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import { dbSchema } from '../utils/schemas';

const entries = path.join(__dirname, '../db/entries.json');

export function readDB(): z.infer<typeof dbSchema> {
    const data = fs.readFileSync(entries, 'utf8');

    return JSON.parse(data);
}

export function writeDB(data: any): void {
    fs.writeFileSync(entries, JSON.stringify(data, null, 2), 'utf8');
}
