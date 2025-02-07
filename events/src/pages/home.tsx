import { FC } from 'react';
import { DateTime } from 'luxon';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

import PageWrapper from '../components/PageWrapper';
import { EventSubmission } from '../types/forms';

const HomePage: FC = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            date: DateTime.now().setZone('UTC'),
            description: '',
        },
    });

    const onSubmit: SubmitHandler<EventSubmission> = (data) => {
        console.log(data);
    };

    return (
        <PageWrapper title="Home">
            <Typography variant="h1">Add new event</Typography>
            <Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction="column" spacing={2}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => <TextField {...field} label="Name" variant="outlined" />}
                        />
                        <Controller
                            name="date"
                            control={control}
                            render={({ field }) => (
                                <LocalizationProvider dateAdapter={AdapterLuxon}>
                                    <DatePicker {...field} label="Date" format="dd/MM/YYYY" />
                                </LocalizationProvider>
                            )}
                        />
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Description"
                                    variant="outlined"
                                    multiline
                                    minRows={4}
                                    maxRows={4}
                                />
                            )}
                        />
                        <Button type="submit" variant="contained">
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Box>
        </PageWrapper>
    );
};

export default HomePage;
