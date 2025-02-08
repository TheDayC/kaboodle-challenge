import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, '../src/db/entries.json');

const data = {
    events: [
        {
            id: 1,
            name: 'Event 1',
            date: '2025-04-01T12:00:00.000Z',
            description: 'This is a description of event 1.',
            tickets: [
                {
                    id: 1,
                    name: 'Ticket 1',
                    type: 'adult',
                    price: 1000,
                    fee: 2000,
                    availability: 'available',
                },
                {
                    id: 2,
                    name: 'Ticket 2',
                    type: 'child',
                    price: 500,
                    fee: 2000,
                    availability: 'sold out',
                },
                {
                    id: 3,
                    name: 'VIP Pass',
                    type: 'vip',
                    price: 5000,
                    fee: 3000,
                    availability: 'available',
                },
                {
                    id: 4,
                    name: 'Early Bird',
                    type: 'discount',
                    price: 800,
                    fee: 1500,
                    availability: 'available',
                },
            ],
        },
        {
            id: 2,
            name: 'Event 2',
            date: '2025-05-15T18:30:00.000Z',
            description: 'This is a description of event 2.',
            tickets: [
                {
                    id: 1,
                    name: 'Ticket 1',
                    type: 'adult',
                    price: 1000,
                    fee: 2000,
                    availability: 'available',
                },
                {
                    id: 2,
                    name: 'Ticket 2',
                    type: 'child',
                    price: 500,
                    fee: 2000,
                    availability: 'sold out',
                },
            ],
        },
        {
            id: 3,
            name: 'Event 3',
            date: '2025-06-20T15:00:00.000Z',
            description: 'This is a description of event 3.',
            tickets: [
                {
                    id: 1,
                    name: 'Ticket 1',
                    type: 'adult',
                    price: 1000,
                    fee: 2000,
                    availability: 'available',
                },
            ],
        },
    ],
};

fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), (err) => {
    if (err) {
        console.error('Error writing db.json:', err);
    } else {
        console.log('Database populated successfully!');
    }
});
