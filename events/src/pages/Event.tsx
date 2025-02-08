import { FC } from 'react';
import { Chip, Skeleton, Stack, Typography, Button, capitalize, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import { CalendarMonth, LibraryAdd } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

import { eventSchema } from '../utils/schemas';
import PageWrapper from '../components/PageWrapper';

const EventsPage: FC = () => {
    const { id } = useParams();
    const { palette } = useTheme();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const ticketColumns = [
        { field: 'name', headerName: 'Name' },
        { field: 'price', headerName: 'Price', renderCell: (data: any) => `£${data.row.price}` },
        { field: 'fee', headerName: 'Fee', renderCell: (data: any) => `£${data.row.fee}` },
        { field: 'type', headerName: 'Type', renderCell: (data: any) => capitalize(data.row.type) },
        {
            field: 'availability',
            headerName: 'Availability',
            renderCell: (data: any) => {
                const availability = data.row.availability;
                const isAvailable = availability === 'available';

                return (
                    <span style={{ color: isAvailable ? palette.success.main : palette.error.main }}>
                        {capitalize(data.row.availability)}
                    </span>
                );
            },
        },
        {
            field: 'addtocart',
            headerName: 'Add to cart',
            width: 150,
            renderCell: (data: any) => {
                const availability = data.row.availability;
                const isAvailable = availability === 'available';

                if (isAvailable) {
                    return (
                        <Button variant="contained" endIcon={<LibraryAdd />}>
                            Add to cart
                        </Button>
                    );
                } else {
                    return null;
                }
            },
        },
    ];
    /* eslint-enable @typescript-eslint/no-explicit-any */

    const { data: event, isPending } = useQuery({
        queryKey: ['event', id],
        queryFn: async () => {
            const res = await fetch(`/api/events/${id}`, {
                method: 'GET',
            }).then((r) => r.json());

            const { data, success } = eventSchema.safeParse(res);

            return success ? data : undefined;
        },
    });

    if (isPending || !event) {
        return (
            <PageWrapper title="Event">
                <Stack direction="column" spacing={4}>
                    <Stack direction="column" spacing={1} alignItems="flex-start">
                        <Skeleton variant="text" sx={{ fontSize: '6rem', width: '50%' }} />
                        <Skeleton variant="rounded" sx={{ width: 150 }} />
                    </Stack>
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '25%' }} />
                    <Stack direction="column" spacing={1} alignItems="flex-start">
                        <Typography variant="h3">Tickets</Typography>
                        <DataGrid
                            rows={undefined}
                            columns={ticketColumns}
                            slotProps={{
                                loadingOverlay: {
                                    variant: 'skeleton',
                                    noRowsVariant: 'skeleton',
                                },
                            }}
                            sx={{ width: '100%' }}
                            loading
                        />
                    </Stack>
                </Stack>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper title={event.name}>
            <Stack direction="column" spacing={4}>
                <Stack direction="column" spacing={1} alignItems="flex-start">
                    <Typography variant="h1">{event.name}</Typography>
                    <Chip
                        label={DateTime.fromISO(event.date).toFormat('dd/MM/yyyy')}
                        color="primary"
                        icon={<CalendarMonth />}
                    />
                </Stack>
                <Typography variant="body1">{event.description}</Typography>
                <Stack direction="column" spacing={1} alignItems="flex-start">
                    <Typography variant="h3">Tickets</Typography>
                    <DataGrid
                        rows={event.tickets}
                        columns={ticketColumns}
                        slotProps={{
                            loadingOverlay: {
                                variant: 'skeleton',
                                noRowsVariant: 'skeleton',
                            },
                        }}
                        sx={{ width: '100%' }}
                    />
                </Stack>
            </Stack>
        </PageWrapper>
    );
};

export default EventsPage;
