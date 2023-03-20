import Page from '../components/Page';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';
import { getPositions, getRunningQueriesThunk, useGetPositionsQuery } from '../api/apiSlice';
import { useMemo } from 'react';
import Sidenav from '../components/Sidenav';
import pageRoutes from '../routes';
import { wrapper } from '../redux/store';

export default function Charts() {
    const { data: positions, isLoading: positionsQueryIsLoading } = useGetPositionsQuery({});

    const watchlist = useMemo(() => {
        if (!positions) return [];

        return positions.map((position: any) => {
            let marketEtf = '';

            switch (position.exchange) {
                case 'NYSE':
                    marketEtf = 'SPY';
                    break;
                case 'NASDAQ':
                    marketEtf = 'QQQ';
                    break;
                default:
                    break;
            }

            if (marketEtf && marketEtf !== position.symbol) {
                return `${position.exchange}:${position.symbol}/${marketEtf}`;
            } else {
                return `${position.symbol}`;
            }
        });
    }, [positions]);

    return (
        <Page>
            <Sidenav routes={pageRoutes} brandName='Trading Dashboard' />
            {!positionsQueryIsLoading && (
                <AdvancedRealTimeChart
                    symbol={watchlist[0]}
                    autosize={true}
                    watchlist={watchlist}
                    interval='W'
                />
            )}
        </Page>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    store.dispatch(getPositions.initiate({}));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
        props: {},
    };
});
