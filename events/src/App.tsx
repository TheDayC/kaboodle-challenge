import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from './theme';
import HomePage from './pages/home';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    {/* <Route path="*" element={<NotFoundPage />} /> */}
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
