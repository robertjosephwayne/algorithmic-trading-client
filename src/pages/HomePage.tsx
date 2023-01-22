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
            const pairDetails = bar[1];
            return {
                pair,
                price: pairDetails.price,
            };
        });
        setRowData(updatedRowData);
    }, [bars]);

    useEffect(() => {
        socket.on('bar', (bar) => {
            if (!bar.pair) return;

            setBars((existingBars) => {
                const updatedBars = {
                    ...existingBars,
                    [bar.pair]: {
                        price: bar.p,
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
            {rowData.map((row) => (
                <div key={row.pair}>
                    <div style={{ width: '150px', display: 'inline-block' }}>{row.pair}</div>
                    <span>{currencyFormatter(row.price)}</span>
                </div>
            ))}
        </div>
    );
}

export default HomePage;

function currencyFormatter(value: number) {
    return value.toLocaleString(undefined, {
        currency: 'usd',
        style: 'currency',
    });
}
