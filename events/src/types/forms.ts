import { DateTimeMaybeValid } from 'luxon';

export interface EventSubmission {
    name: string;
    date: DateTimeMaybeValid;
    description: string;
}
