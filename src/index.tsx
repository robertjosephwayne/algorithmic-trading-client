import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import ErrorPage from './components/ErrorPage';
import Charts from './routes/Charts';
import Root from './routes/Root';
import store from './redux/store';

import WebSocketProvider from './components/WebSocket';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
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
        <Provider store={store}>
            <WebSocketProvider>
                <RouterProvider router={router} />
            </WebSocketProvider>
        </Provider>
    </React.StrictMode>,
);
