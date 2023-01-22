import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { config } from '../constants';

const wsUrl = config.SERVER_URL;
const socket = io(wsUrl);

function HomePage() {
    const [bars, setBars] = useState<{ [key: string]: { price?: number } }>({});
    const [rowData, setRowData] = useState<any[]>([]);

    useEffect(() => {
        const updatedRowData = Object.entries(bars).map((bar) => {
            const pair = bar[0];
            const pairDetails: any = bar[1];

            const rowData: any = {};
            rowData.pair = pair;
            rowData.prices = {};

            for (const exchange in pairDetails) {
                rowData.prices[exchange] = pairDetails[exchange].price;
            }

            return rowData;
        });

        setRowData(updatedRowData);
    }, [bars]);

    useEffect(() => {
        socket.on('bar', (bar) => {
            if (!bar.pair || !bar.pair.includes('-USD')) return;

            setBars((existingBars) => {
                const updatedBars = {
                    ...existingBars,
                    [bar.pair]: {
                        ...existingBars[bar.pair],
                        [bar.x]: {
                            price: bar.p,
                        },
                    },
                };
                return updatedBars;
            });
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('bar');
        };
    }, []);

    return (
        <div style={{ margin: '10px' }}>
            <div
                style={{ fontWeight: 'bold', borderBottom: '2px solid black', marginBottom: '5px' }}
            >
                <div style={{ width: '150px', display: 'inline-block' }}>Pair</div>
                <div style={{ width: '150px', display: 'inline-block' }}>Coinbase</div>
                <div style={{ width: '150px', display: 'inline-block' }}>Bitfinex</div>
                <div style={{ width: '150px', display: 'inline-block' }}>Bitstamp</div>
                <div style={{ width: '150px', display: 'inline-block' }}>Kraken</div>
            </div>
            {rowData.map((row) => (
                <div key={row.pair}>
                    <div style={{ width: '150px', display: 'inline-block', padding: '2px 0' }}>
                        {row.pair}
                    </div>
                    <div style={{ width: '150px', display: 'inline-block' }}>
                        {currencyFormatter(row.prices[1]) || '-'}
                    </div>
                    <div style={{ width: '150px', display: 'inline-block' }}>
                        {currencyFormatter(row.prices[2]) || '-'}
                    </div>
                    <div style={{ width: '150px', display: 'inline-block' }}>
                        {currencyFormatter(row.prices[6]) || '-'}
                    </div>
                    <div style={{ width: '150px', display: 'inline-block' }}>
                        {currencyFormatter(row.prices[23]) || '-'}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default HomePage;

function currencyFormatter(value: number) {
    if (!value) return;

    return value.toLocaleString(undefined, {
        currency: 'usd',
        style: 'currency',
    });
}
