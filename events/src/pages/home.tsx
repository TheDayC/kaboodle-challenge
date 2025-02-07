import { FC } from 'react';
import PageWrapper from '../components/PageWrapper';
import { Typography } from '@mui/material';

const HomePage: FC = () => {
    return (
        <PageWrapper title="Home">
            <Typography variant="h1">Add new event</Typography>
        </PageWrapper>
    );
};

export default HomePage;
