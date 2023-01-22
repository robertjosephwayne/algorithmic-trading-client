import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { config } from '../constants';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const wsUrl = config.SERVER_URL;
const socket = io(wsUrl);

function HomePage() {
    const [bars, setBars] = useState<{ [key: string]: { price?: number } }>({});
    const [rowData, setRowData] = useState<any[]>([]);
    const [columnDefs] = useState([
        { field: 'pair', width: 200 },
        {
            field: 'price',
            width: 200,
            valueFormatter: (params: any) => currencyFormatter(params.data.price),
        },
    ]);

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
        <div className='ag-theme-alpine' style={{ margin: '40px auto', width: 402 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                domLayout='autoHeight'
            ></AgGridReact>
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
