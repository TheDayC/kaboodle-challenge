import { ChangeEvent, FC } from 'react';
import { DateTime } from 'luxon';
import {
    Box,
    Button,
    Divider,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { useMutation } from '@tanstack/react-query';
import { AddCircle, Publish, RemoveCircle } from '@mui/icons-material';
import { zodResolver } from '@hookform/resolvers/zod';

import PageWrapper from '../components/PageWrapper';
import { EventSubmission } from '../types/forms';
import { eventSubmissionSchema } from '../utils/schemas';

const DEFAULT_TICKET = { name: '', type: 'adult', price: 0, fee: 0, availability: 'available' };

const HomePage: FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        register,
    } = useForm({
        defaultValues: {
            name: '',
            date: DateTime.now().setZone('UTC'),
            description: '',
            tickets: [DEFAULT_TICKET],
        },
        resolver: zodResolver(eventSubmissionSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'tickets',
    });

    const postEvent = useMutation({
        mutationFn: (data: EventSubmission) => {
            return fetch('/api/events/new', {
                method: 'POST',
                body: JSON.stringify({
                    ...data,
                    date: data.date.toISO(),
                }),
            });
        },
    });

    const onSubmit: SubmitHandler<EventSubmission> = (data) => {
        console.log('🚀 ~ data:', data);
        postEvent.mutate(data);
    };

    return (
        <PageWrapper title="Home">
            <Typography variant="h1">Add new event</Typography>
            <Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h3">Event Information</Typography>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Name"
                                    variant="outlined"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                        <Controller
                            name="date"
                            control={control}
                            render={({ field }) => (
                                <LocalizationProvider dateAdapter={AdapterLuxon}>
                                    <DatePicker {...field} label="Date" format="dd/MM/yyyy" />
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
                        <Typography variant="h3">Ticket Information</Typography>
                        {fields.map((field, index) => (
                            <Stack key={field.id} direction="column" spacing={2}>
                                <Stack direction="row" justifyContent="flex-start" alignItems="center">
                                    <Typography variant="h6">Ticket {index + 1}</Typography>
                                    {index > 0 && (
                                        <IconButton onClick={() => remove(index)} color="error">
                                            <RemoveCircle />
                                        </IconButton>
                                    )}
                                </Stack>
                                <Controller
                                    name={`tickets.${index}.name`}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Ticket Name"
                                            variant="outlined"
                                            error={!!errors.tickets?.[index]?.name}
                                            helperText={errors.tickets?.[index]?.name?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name={`tickets.${index}.type`}
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl>
                                            <InputLabel id="select-label">Type</InputLabel>
                                            <Select {...field} label="Type" labelId="select-type-label">
                                                <MenuItem value="adult">Adult</MenuItem>
                                                <MenuItem value="child">Child</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                                <Controller
                                    {...register(`tickets.${index}.price`, { valueAsNumber: true })}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Price"
                                            variant="outlined"
                                            type="number"
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start">&pound;</InputAdornment>
                                                    ),
                                                },
                                            }}
                                            helperText={
                                                errors.tickets?.[index]?.price?.message ||
                                                'Only enter in whole pounds. Max £999.'
                                            }
                                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                            }}
                                            error={!!errors.tickets?.[index]?.price}
                                        />
                                    )}
                                />
                                <Controller
                                    {...register(`tickets.${index}.fee`, { valueAsNumber: true })}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Fee"
                                            variant="outlined"
                                            type="number"
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start">&pound;</InputAdornment>
                                                    ),
                                                },
                                            }}
                                            helperText={
                                                errors.tickets?.[index]?.fee?.message ||
                                                'Only enter in whole pounds. Max £100.'
                                            }
                                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                            }}
                                            error={!!errors.tickets?.[index]?.fee}
                                        />
                                    )}
                                />
                                <Controller
                                    name={`tickets.${index}.availability`}
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl>
                                            <InputLabel id="select-label">Type</InputLabel>
                                            <Select {...field} label="Type" labelId="select-type-label">
                                                <MenuItem value="available">Available</MenuItem>
                                                <MenuItem value="sold-out">Sold Out</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                                <Divider />
                            </Stack>
                        ))}
                        <Stack direction="row" justifyContent="space-between">
                            <Button variant="outlined" startIcon={<AddCircle />} onClick={() => append(DEFAULT_TICKET)}>
                                Add Ticket
                            </Button>
                            <Button type="submit" variant="contained" startIcon={<Publish />}>
                                Submit
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </PageWrapper>
    );
};

export default HomePage;
