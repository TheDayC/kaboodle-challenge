import { FC } from 'react';
import { Typography, Link, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link as RouterLink } from 'react-router';

import PageWrapper from '../components/PageWrapper';
import { useQuery } from '@tanstack/react-query';
import { eventsSchema } from '../utils/schemas';
import { DateTime } from 'luxon';

const columns = [
    {
        field: 'name',
        headerName: 'Name',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        renderCell: (data: any) => {
            return (
                <Link component={RouterLink} to={`/events/${data.row.id}`} sx={{ color: 'primary.main' }}>
                    {data.row.name}
                </Link>
            );
        },
    },
    { field: 'date', headerName: 'Date' },
    { field: 'description', headerName: 'Description', width: 250 },
    {
        field: 'view',
        headerName: 'View',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        renderCell: (data: any) => {
            return (
                <Button component={RouterLink} to={`/events/${data.row.id}`} variant="contained">
                    View
                </Button>
            );
        },
    },
];

const EventsPage: FC = () => {
    const eventsQuery = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const res = await fetch('/api/events', {
                method: 'GET',
            }).then((r) => r.json());

            const { data: events, success } = eventsSchema.safeParse(res);

            if (success) {
                return events.map(({ id, name, date, description }) => ({
                    id,
                    name,
                    date: DateTime.fromISO(date).toFormat('dd/MM/yyyy'),
                    description,
                }));
            } else {
                return undefined;
            }
        },
    });

    return (
        <PageWrapper title="Home">
            <Typography variant="h1">Events</Typography>
            <DataGrid
                rows={eventsQuery.data}
                columns={columns}
                slotProps={{
                    loadingOverlay: {
                        variant: 'skeleton',
                        noRowsVariant: 'skeleton',
                    },
                }}
                loading={eventsQuery.isPending}
            />
        </PageWrapper>
    );
};

export default EventsPage;
