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

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useGetSnapshotAllTickersQuery } from '../../api/apiSlice';
import { addBar } from '../../redux/features/crypto/cryptoSlice';
import CircleLoader from 'react-spinners/CircleLoader';

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

export default function CryptoSummaryTable() {
    const dispatch = useDispatch();
    const [rowData, setRowData] = useState<CryptoSummaryTableRow[]>([]);

    const [columnResizeMode] = useState<ColumnResizeMode>('onChange');
    const [sorting, setSorting] = useState<SortingState>([{ id: 'price', desc: true }]);

    const bars = useSelector((state: RootState) => state.crypto.bars);

    const { data, isLoading } = useGetSnapshotAllTickersQuery({});

    useEffect(() => {
        if (data) {
            for (const ticker of data) {
                const bar = {
                    pair: ticker.ticker,
                    p: ticker.lastTrade.p,
                };

                dispatch(addBar(bar));
            }
        }
    }, [data]);

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
        const updatedRowData = Object.entries(bars || []).map((bar) => {
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

    return isLoading ? (
        <div className='loader-container'>
            <CircleLoader />
        </div>
    ) : (
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

function currencyFormatter(value: number) {
    if (!value) return;

    return value.toLocaleString(undefined, {
        currency: 'usd',
        style: 'currency',
    });
}