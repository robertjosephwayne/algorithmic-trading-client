import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import ErrorPage from './components/ErrorPage';
import Charts from './routes/Charts';
import store from './redux/store';

import WebSocketProvider from './components/WebSocket';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Market from './routes/Market';
import Positions from './routes/Positions';
import TradeBook from './routes/TradeBook';
import Orders from './routes/Orders';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#405C23',
        },
    },
});

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
        path: '/market',
        element: <Market />,
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
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Provider store={store}>
                <WebSocketProvider>
                    <ThemeProvider theme={lightTheme}>
                        <RouterProvider router={router} />
                    </ThemeProvider>
                </WebSocketProvider>
            </Provider>
        </LocalizationProvider>
    </React.StrictMode>,
);
