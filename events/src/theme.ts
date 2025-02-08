import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#6f1deb',
        },
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",
    },
});

export default theme;
