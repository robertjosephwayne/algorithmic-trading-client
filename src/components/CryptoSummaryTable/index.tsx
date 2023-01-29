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
import { useGetLatestTradesQuery } from '../../api/apiSlice';
import { addBar } from '../../redux/features/crypto/cryptoSlice';
import CircleLoader from 'react-spinners/CircleLoader';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

type CryptoSummaryTableRow = {
    ticker: string;
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
    columnHelper.accessor('ticker', {
        header: 'Ticker',
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

    const { data, isLoading } = useGetLatestTradesQuery({});

    useEffect(() => {
        if (data) {
            for (const symbol in data) {
                const bar = {
                    symbol,
                    price: data[symbol].Price,
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
        const updatedRowData = Object.entries(bars).map((bar) => {
            const ticker = bar[0];
            const { price, displayName } = bar[1];

            const rowData: any = {
                ticker,
                price,
                displayName,
            };

            return rowData;
        });

        setRowData(updatedRowData);
    }, [bars]);

    return isLoading ? (
        <div className='flex flex-col items-center justify-center w-screen h-screen'>
            <CircleLoader color='white' />
        </div>
    ) : (
        <table className='mx-auto mt-4 text-white'>
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr className='text-left border-b-2' key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id} style={{ width: header.getSize() }}>
                                {header.isPlaceholder ? null : (
                                    <div
                                        {...{
                                            className: header.column.getCanSort()
                                                ? 'cursor-pointer select-none flex align-middle'
                                                : '',
                                            onClick: header.column.getToggleSortingHandler(),
                                        }}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                        {{
                                            asc: (
                                                <ArrowUpward
                                                    sx={{ fontSize: 22 }}
                                                    className='ml-1 bg-transparent'
                                                />
                                            ),
                                            desc: (
                                                <ArrowDownward
                                                    sx={{ fontSize: 22 }}
                                                    className='ml-1 bg-transparent'
                                                />
                                            ),
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
