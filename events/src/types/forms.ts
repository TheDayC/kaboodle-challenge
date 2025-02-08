import { DateTimeMaybeValid } from 'luxon';

interface TicketSubmission {
    name: string;
    type: string;
    price: number;
    fee: number;
    availability: string;
}

export interface EventSubmission {
    name: string;
    date: DateTimeMaybeValid;
    description: string;
    tickets: TicketSubmission[];
}
