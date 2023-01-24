import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';

import Charts from './routes/Charts';
import Root from './routes/Root';

const router = createBrowserRouter(
    [
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
    ],
    {
        basename: '/financial-dashboard-client',
    },
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
