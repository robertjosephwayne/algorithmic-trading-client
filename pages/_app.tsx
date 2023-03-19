// import './index.css';

import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { wrapper } from '../redux/store';

import WebSocketProvider from '../components/WebSocket';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ThemeProvider } from '@mui/material/styles';

import { MaterialUIControllerProvider, useMaterialUIController } from '../context';
import { CssBaseline } from '@mui/material';

import theme from '../assets/theme';
import themeDark from '../assets/theme-dark';
import createCache from '@emotion/cache';
const clientSideEmotionCache = createCache({ key: 'css', prepend: true });
import { CacheProvider } from '@emotion/react';

function Main({ Component, ...rest }: any) {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const { store, props } = wrapper.useWrappedStore(rest);
    const { pageProps } = props;

    return (
        <ThemeProvider theme={darkMode ? themeDark : theme}>
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Provider store={store}>
                    <WebSocketProvider>
                        <Component {...pageProps} />
                    </WebSocketProvider>
                </Provider>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }: any) {
    return (
        <MaterialUIControllerProvider>
            <CacheProvider value={emotionCache}>
                <Head>
                    <link rel='icon' href='/favicon.ico' />
                    <title>Trading Dashboard</title>
                </Head>
                <Main Component={Component} pageProps={pageProps} />
            </CacheProvider>
        </MaterialUIControllerProvider>
    );
}
