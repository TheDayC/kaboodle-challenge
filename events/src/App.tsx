import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from './theme';
import Home from './pages/home';
import Events from './pages/Events';
import Event from './pages/Event';
import NotFound from './pages/NotFound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App = () => {
    const queryClient = new QueryClient();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/events/:id" element={<Event />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </QueryClientProvider>
        </ThemeProvider>
    );
};

export default App;
