import { FC } from 'react';
import PageWrapper from '../components/PageWrapper';
import { Typography } from '@mui/material';

const NotFoundPage: FC = () => (
    <PageWrapper title="Not Found">
        <Typography variant="h1">404 - Page Not Found</Typography>
    </PageWrapper>
);

export default NotFoundPage;
