import './index.css';

import { useState, useEffect } from 'react';
import {
    useReactTable,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    ColumnResizeMode,
    SortingState,
} from '@tanstack/react-table';
import io from 'socket.io-client';
import { cryptoSymbol } from 'crypto-symbol';
const { nameLookup } = cryptoSymbol({
    Celo: 'CGLD',
    Paxos: 'PAX',
});
import { getSnapshotAllTickers } from '../../api/crypto';
import { config } from '../../constants';

const wsUrl = config.SERVER_URL;
const socket = io(wsUrl);

type CryptoSummaryTableRow = {
    pair: string;
    price: number;
    displayName: string;
};

const columnHelper = createColumnHelper<CryptoSummaryTableRow>();
const columns = [
    columnHelper.accessor('displayName', {
        header: 'Name',
        cell: (info) => info.getValue(),
        minSize: 250,
    }),
    columnHelper.accessor('pair', {
        header: 'Pair',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('price', {
        header: 'Price',
        cell: (info) => currencyFormatter(info.getValue()),
    }),
];

function CryptoSummaryTable() {
    const [bars, setBars] = useState<{ [key: string]: { price?: number } }>({});
    const [rowData, setRowData] = useState<CryptoSummaryTableRow[]>([]);

    const [columnResizeMode, setColumnResizeMode] = useState<ColumnResizeMode>('onChange');
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data: rowData,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        columnResizeMode,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    useEffect(() => {
        const updatedRowData = Object.entries(bars).map((bar) => {
            const pair = bar[0];
            const pairDetails: any = bar[1];

            const rowData: any = {
                pair,
                price: pairDetails.price,
                displayName: pairDetails.displayName,
            };

            return rowData;
        });

        setRowData(updatedRowData);
    }, [bars]);

    useEffect(() => {
        socket.on('bar', (bar) => {
            if (!bar.pair || !bar.pair.includes('-USD')) return;

            const displayName = nameLookup(bar.pair.replace('-USD', ''));
            setBars((existingBars) => {
                const updatedBars = {
                    ...existingBars,
                    [bar.pair]: {
                        ...existingBars[bar.pair],
                        price: bar.p,
                        displayName,
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

    useEffect(() => {
        getSnapshotAllTickers().then((response) => {
            const tickers = response.data;
            const initialBars: any = {};

            for (const ticker of tickers) {
                if (!ticker.ticker.includes('-USD')) continue;

                const displayName = nameLookup(ticker.ticker.replace('-USD', ''));
                initialBars[ticker.ticker] = {
                    price: ticker.lastTrade.p,
                    displayName,
                };
            }

            setBars((existingBars) => {
                return {
                    ...existingBars,
                    ...initialBars,
                };
            });
        });
    }, []);

    return (
        <table className='crypto-summary-table'>
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id} style={{ width: header.getSize() }}>
                                {header.isPlaceholder ? null : (
                                    <div
                                        {...{
                                            className: header.column.getCanSort()
                                                ? 'cursor-pointer select-none'
                                                : '',
                                            onClick: header.column.getToggleSortingHandler(),
                                        }}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                        {{
                                            asc: ' 🔼',
                                            desc: ' 🔽',
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} style={{ width: cell.column.getSize() }}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default CryptoSummaryTable;

function currencyFormatter(value: number) {
    if (!value) return;

    return value.toLocaleString(undefined, {
        currency: 'usd',
        style: 'currency',
    });
}
