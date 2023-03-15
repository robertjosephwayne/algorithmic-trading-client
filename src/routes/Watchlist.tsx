import { useEffect, useState } from 'react';
import { MarketData } from 'react-ts-tradingview-widgets';
import { useGetPositionsQuery } from '../api/apiSlice';
import Loader from '../components/Loader';
import Page from '../components/Page';

export default function Watchlist() {
    const [symbolsGroups, setSymbolsGroups] = useState<any>([]);

    const { data: positions, isLoading } = useGetPositionsQuery({});

    useEffect(() => {
        if (!positions) return;

        const watchlist = positions.map((position: any) => {
            return {
                name: position.symbol,
            };
        });

        const updatedSymbolsGroups = [
            {
                name: 'Watchlist',
                originalName: 'Watchlist',
                symbols: watchlist,
            },
        ];
        setSymbolsGroups(updatedSymbolsGroups);
    }, [positions]);

    return (
        <Page>
            <div className='w-full h-4/5'>
                {isLoading ? (
                    <Loader fullPage={true} />
                ) : (
                    <MarketData
                        colorTheme='dark'
                        autosize={true}
                        symbolsGroups={symbolsGroups}
                        largeChartUrl='https://trading.robertjosephwayne.com'
                    />
                )}
            </div>
        </Page>
    );
}
