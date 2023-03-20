import Page from '../components/Page';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';
import { useGetPositionsQuery } from '../api/apiSlice';
import { useMemo } from 'react';
import Loader from '../components/Loader';

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
            <div className='w-full h-4/5'>
                {positionsQueryIsLoading ? (
                    <Loader fullPage={true} />
                ) : (
                    <AdvancedRealTimeChart
                        theme='dark'
                        symbol={watchlist[0]}
                        autosize={true}
                        watchlist={watchlist}
                        interval='W'
                    />
                )}
            </div>
        </Page>
    );
}
