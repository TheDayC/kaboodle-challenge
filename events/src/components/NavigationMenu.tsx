import { FC } from 'react';
import { Link as RouterLink } from 'react-router';
import { Stack, Link } from '@mui/material';

// The menu items are on the same black background as the header, for time and accessibility's sake reverse the text decoration so it's clear it's a menu item.
const LINK_SX = {
    color: 'white',
    textDecoration: 'underline',
    '&:hover': {
        textDecoration: 'none',
    },
};

const NavigationMenu: FC = () => {
    return (
        <Stack direction="row" spacing={2}>
            <Link component={RouterLink} to="/" sx={LINK_SX}>
                Home
            </Link>
            <Link component={RouterLink} to="/events" sx={LINK_SX}>
                Events
            </Link>
        </Stack>
    );
};

export default NavigationMenu;
