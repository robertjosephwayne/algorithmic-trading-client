import { useState, useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useGetLatestTradesQuery } from '../../api/apiSlice';
import { addBar } from '../../redux/features/crypto/cryptoSlice';
import { PuffLoader } from 'react-spinners';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { currencyFormatter } from '../../utils';

type CryptoSummaryTableRow = {
    ticker: string;
    price: number;
    displayName: string;
};

export default function CryptoSummaryTable() {
    const dispatch = useDispatch();
    const [rowData, setRowData] = useState<CryptoSummaryTableRow[]>([]);

    const bars = useSelector((state: RootState) => state.crypto.bars);

    const { data, isLoading } = useGetLatestTradesQuery({});

    const columns = useMemo<MRT_ColumnDef<CryptoSummaryTableRow>[]>(
        () => [
            {
                accessorKey: 'displayName',
                header: 'Name',
            },
            {
                accessorKey: 'ticker',
                header: 'Ticker',
            },
            {
                accessorKey: 'price',
                header: 'Price',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
                filterVariant: 'range',
            },
        ],
        [],
    );

    useEffect(() => {
        if (data) {
            for (const symbol in data) {
                const bar = {
                    symbol,
                    price: data[symbol].price,
                };

                dispatch(addBar(bar));
            }
        }
    }, [data]);

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
        <div className='absolute flex flex-col items-center justify-center w-screen h-screen'>
            <PuffLoader color='white' />
        </div>
    ) : (
        <div className='p-4'>
            <MaterialReactTable columns={columns} data={rowData} />
        </div>
    );
}
