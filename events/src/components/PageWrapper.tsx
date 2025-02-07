import { Box, Container, Typography } from '@mui/material';
import { FC, ReactNode, useEffect } from 'react';

interface PageWrapperProps {
    title: string;
    children: ReactNode;
}

const PageWrapper: FC<PageWrapperProps> = ({ title, children }) => {
    useEffect(() => {
        document.title = `${title} | Kaboodle Challenge`;
    }, []);

    return (
        <>
            <Box sx={{ bgcolor: 'primary.main', width: '100%' }}>
                <Container maxWidth="xl">
                    <Typography variant="h2" color="white">
                        Kaboodle
                    </Typography>
                </Container>
            </Box>
            <Box>
                <Container maxWidth="xl">{children}</Container>
            </Box>
        </>
    );
};

export default PageWrapper;
