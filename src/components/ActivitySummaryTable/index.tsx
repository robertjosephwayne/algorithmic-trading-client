import { useState, useEffect, useMemo } from 'react';
import { useGetActivitiesQuery } from '../../api/apiSlice';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { currencyFormatter, dateFormatter } from '../../utils';
import Loader from '../Loader';

type ActivitySummaryTableRow = {
    activityType: string;
    type: string;
    cumulativeQuantity: string;
    orderStatus: string;
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
                accessorKey: 'activityType',
                header: 'Activity Type',
            },
            {
                accessorKey: 'cumulativeQuantity',
                header: 'Cumulative Quantity',
                filterVariant: 'range',
            },
            {
                accessorKey: 'orderStatus',
                header: 'Order Status',
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
            {
                accessorKey: 'side',
                header: 'Side',
            },
        ],
        [],
    );

    useEffect(() => {
        if (!activities) return;

        const updatedRowData = Object.entries(activities).map((activity: any) => {
            const {
                activity_type,
                cumulative_quantity,
                order_status,
                price,
                quantity,
                side,
                symbol,
                transaction_time,
                type,
            } = activity[1];

            const rowData: ActivitySummaryTableRow = {
                activityType: activity_type,
                type,
                cumulativeQuantity: cumulative_quantity,
                orderStatus: order_status.replace('_', ' '),
                price,
                quantity,
                side,
                symbol: symbol.replace('/', ''),
                transactionTime: transaction_time,
            };

            return rowData;
        });

        setRowData(updatedRowData);
    }, [activities]);

    return isLoading ? (
        <Loader fullPage={true} />
    ) : (
        <MaterialReactTable columns={columns} data={rowData} />
    );
}
