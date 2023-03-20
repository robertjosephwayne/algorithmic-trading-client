/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidenav from '/components/Sidenav';

// NextJS Material Dashboard 2 PRO themes
import theme from '/assets/theme';
import themeRTL from '/assets/theme/theme-rtl';

// NextJS Material Dashboard 2 PRO Dark Mode themes
import themeDark from '/assets/theme-dark';
import themeDarkRTL from '/assets/theme-dark/theme-rtl';

// RTL plugins
import rtlPlugin from 'stylis-plugin-rtl';

// NextJS Material Dashboard 2 PRO routes
import routes from '/routes';

// NextJS Material Dashboard 2 PRO Context Provider
import {
    MaterialUIControllerProvider,
    useMaterialUIController,
    setMiniSidenav,
    setOpenConfigurator,
} from '/context';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createCache({ key: 'css', prepend: true });

function Main({ Component, pageProps }) {
    const [controller, dispatch] = useMaterialUIController();
    const { miniSidenav, direction, layout, openConfigurator, sidenavColor, darkMode } = controller;
    const [onMouseEnter, setOnMouseEnter] = useState(false);
    const [rtlCache, setRtlCache] = useState(null);
    const { pathname } = useRouter();

    // Cache for the rtl
    useMemo(() => {
        const cacheRtl = createCache({
            key: 'rtl',
            stylisPlugins: [rtlPlugin],
        });

        setRtlCache(cacheRtl);
    }, []);

    // Open sidenav when mouse enter on mini sidenav
    const handleOnMouseEnter = () => {
        if (miniSidenav && !onMouseEnter) {
            setMiniSidenav(dispatch, false);
            setOnMouseEnter(true);
        }
    };

    // Close sidenav when mouse leave mini sidenav
    const handleOnMouseLeave = () => {
        if (onMouseEnter) {
            setMiniSidenav(dispatch, true);
            setOnMouseEnter(false);
        }
    };

    // Change the openConfigurator state
    const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

    // Setting the dir attribute for the body element
    useEffect(() => {
        document.body.setAttribute('dir', direction);
    }, [direction]);

    // Setting page scroll to 0 when changing the route
    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [pathname]);

    return direction === 'rtl' ? (
        <CacheProvider value={rtlCache}>
            <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
                <CssBaseline />
                <Component {...pageProps} />
                {layout === 'dashboard' && (
                    <>
                        <Sidenav
                            color={sidenavColor}
                            brandName='Trading Dashboard'
                            routes={routes}
                            onMouseEnter={handleOnMouseEnter}
                            onMouseLeave={handleOnMouseLeave}
                        />
                    </>
                )}
            </ThemeProvider>
        </CacheProvider>
    ) : (
        <ThemeProvider theme={darkMode ? themeDark : theme}>
            <CssBaseline />
            <Component {...pageProps} />
            {layout === 'dashboard' && (
                <>
                    <Sidenav
                        color={sidenavColor}
                        brandName='Trading Dashboard'
                        routes={routes}
                        onMouseEnter={handleOnMouseEnter}
                        onMouseLeave={handleOnMouseLeave}
                    />
                </>
            )}
        </ThemeProvider>
    );
}

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
    return (
        <MaterialUIControllerProvider>
            <CacheProvider value={emotionCache}>
                <Head>
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    <link rel='shortcut icon' href='./favicon.ico' />
                    <link rel='icon' href='/favicon.ico' />
                    <title>Trading Dashboard</title>
                </Head>
                <Main Component={Component} pageProps={pageProps} />
            </CacheProvider>
        </MaterialUIControllerProvider>
    );
}

export default MyApp;
