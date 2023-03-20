import './index.css';

import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { wrapper } from '../redux/store';

import WebSocketProvider from '../components/WebSocket';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

export default function App({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const { pageProps } = props;

    return (
        <>
            <Head>
                <link rel='icon' href='/favicon.ico' />
                <title>Trading Dashboard</title>
            </Head>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Provider store={store}>
                    <WebSocketProvider>
                        <ThemeProvider theme={darkTheme}>
                            <Component {...pageProps} />
                        </ThemeProvider>
                    </WebSocketProvider>
                </Provider>
            </LocalizationProvider>
        </>
    );
}
