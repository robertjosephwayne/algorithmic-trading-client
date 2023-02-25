import { useState, useEffect, useMemo } from 'react';
import { useGetActivitiesQuery } from '../../api/apiSlice';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { currencyFormatter, dateFormatter, toProperCase } from '../../utils';
import Loader from '../Loader';
import { Card } from '@mui/material';

type ActivitySummaryTableRow = {
    price: string;
    quantity: string;
    side: string;
    symbol: string;
    transactionTime: string;
};

export default function ActivitySummaryTableRow() {
    const [rowData, setRowData] = useState<ActivitySummaryTableRow[]>([]);

    const { data: activities, isLoading } = useGetActivitiesQuery({}, { pollingInterval: 5000 });

    const columns = useMemo<MRT_ColumnDef<ActivitySummaryTableRow>[]>(
        () => [
            {
                accessorKey: 'transactionTime',
                header: 'Transaction Time',
                Cell: ({ cell }) => dateFormatter(cell.getValue<string>(), true),
                enableColumnFilter: false,
            },
            {
                accessorKey: 'symbol',
                header: 'Symbol',
            },
            {
                accessorKey: 'side',
                header: 'Side',
                Cell: ({ cell }) => toProperCase(cell.getValue<string>()),
            },
            {
                accessorKey: 'price',
                header: 'Price',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
                filterVariant: 'range',
            },
            {
                accessorKey: 'quantity',
                header: 'Quantity',
                filterVariant: 'range',
            },
        ],
        [],
    );

    useEffect(() => {
        if (!activities) return;

        const updatedRowData = Object.entries(activities).map((activity: any) => {
            const { price, quantity, side, symbol, transaction_time } = activity[1];

            const rowData: ActivitySummaryTableRow = {
                price,
                quantity,
                side,
                symbol,
                transactionTime: transaction_time,
            };

            return rowData;
        });

        setRowData(updatedRowData);
    }, [activities]);

    return isLoading ? (
        <Loader fullPage={true} />
    ) : (
        <Card variant='outlined'>
            <MaterialReactTable columns={columns} data={rowData} />
        </Card>
    );
}
