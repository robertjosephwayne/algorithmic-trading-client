import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import ErrorPage from './components/ErrorPage';
import Charts from './routes/Charts';
import Summary from './routes/Summary';
import store from './redux/store';

import WebSocketProvider from './components/WebSocket';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const router = createBrowserRouter([
    {
        path: '/',
        element: <Summary />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/charts',
        element: <Charts />,
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
