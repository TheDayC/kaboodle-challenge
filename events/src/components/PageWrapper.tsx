import { Box, Container, Stack, Typography } from '@mui/material';
import { FC, ReactNode, useEffect } from 'react';
import NavigationMenu from './NavigationMenu';

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
            <Box sx={{ bgcolor: 'black', width: '100%', py: 2 }}>
                <Container maxWidth="xl">
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h2" color="white">
                            Kaboodle Challenge
                        </Typography>
                        <NavigationMenu />
                    </Stack>
                </Container>
            </Box>
            <Box sx={{ py: 2 }}>
                <Container maxWidth="xl">{children}</Container>
            </Box>
        </>
    );
};

export default PageWrapper;
