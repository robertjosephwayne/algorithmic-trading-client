import Page from '../components/Page';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';
import { useGetPositionsQuery } from '../api/apiSlice';
import { useEffect, useState } from 'react';

export default function Charts() {
    const [watchlist, setWatchlist] = useState([]);
    const { data: positions, isLoading } = useGetPositionsQuery({});

    useEffect(() => {
        if (!positions) return;

        const updatedWatchlist = positions.map((position: any) => {
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

            if (marketEtf) {
                return `${position.exchange}:${position.symbol}/${marketEtf}`;
            } else {
                return `${position.exchange}:${position.symbol}`;
            }
        });

        setWatchlist(updatedWatchlist);
    }, [positions]);

    return (
        <Page>
            <div className='w-full h-4/5'>
                <AdvancedRealTimeChart
                    theme='dark'
                    symbol={watchlist[0]}
                    autosize={true}
                    watchlist={watchlist}
                    interval='W'
                />
            </div>
        </Page>
    );
}
