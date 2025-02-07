/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';

const entries = path.join(__dirname, 'entries.json');

export function readDB(): any {
    const data = fs.readFileSync(entries, 'utf8');

    return JSON.parse(data);
}

export function writeDB(data: any): any {
    fs.writeFileSync(entries, JSON.stringify(data, null, 2), 'utf8');
}
