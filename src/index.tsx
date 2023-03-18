import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import ErrorPage from './components/ErrorPage';
import store from './redux/store';

import WebSocketProvider from './components/WebSocket';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Positions from './routes/Positions';
import TradeBook from './routes/TradeBook';
import Orders from './routes/Orders';
import Fundamentals from './routes/Fundamentals';
import Charts from './routes/Charts';
import Watchlist from './routes/Watchlist';
import PortfolioHistory from './routes/PortfolioHistory';
import PortfolioMetrics from './routes/PortfolioMetrics';
import Returns from './routes/Returns';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#131722',
        },
        info: {
            main: '#171B26',
        },
    },
    components: {
        MuiTable: {
            styleOverrides: {
                root: {
                    backgroundColor: '#171B26',
                    borderColor: '#363C4E',
                },
            },
        },
    },
});

const router = createBrowserRouter([
    {
        path: '/',
        element: <Charts />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/fundamentals',
        element: <Fundamentals />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/watchlist',
        element: <Watchlist />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/orders',
        element: <Orders />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/positions',
        element: <Positions />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/trade-book',
        element: <TradeBook />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/portfolio-metrics',
        element: <PortfolioMetrics />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/portfolio-history',
        element: <PortfolioHistory />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/returns',
        element: <Returns />,
        errorElement: <ErrorPage />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Provider store={store}>
                <WebSocketProvider>
                    <ThemeProvider theme={darkTheme}>
                        <RouterProvider router={router} />
                    </ThemeProvider>
                </WebSocketProvider>
            </Provider>
        </LocalizationProvider>
    </React.StrictMode>,
);
