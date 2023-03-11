import { useState, useEffect, useMemo } from 'react';
import { useGetOrdersQuery } from '../../api/apiSlice';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { currencyFormatter } from '../../utils';
import Loader from '../Loader';
import { Card } from '@mui/material';

type OrderSummaryTableRow = {
    symbol: string;
    quantity: number;
    filledQuantity: number;
    side: string;
    type: string;
    timeInForce: string;
    limitPrice: string;
    stopPrice: string;
    notional: string;
    trailPercent: string;
    trailPrice: string;
};

export default function OrderSummaryTable() {
    const [rowData, setRowData] = useState<OrderSummaryTableRow[]>([]);

    const { data: orders, isLoading } = useGetOrdersQuery({}, { pollingInterval: 5000 });

    const columns = useMemo<MRT_ColumnDef<OrderSummaryTableRow>[]>(
        () => [
            {
                accessorKey: 'symbol',
                header: 'Symbol',
            },
            {
                accessorKey: 'quantity',
                header: 'Quantity',
            },
            {
                accessorKey: 'filledQuantity',
                header: 'Filled Quantity',
            },
            {
                accessorKey: 'side',
                header: 'Side',
                Cell: ({ cell }) => {
                    return cell.getValue<string>().toUpperCase();
                },
            },
            {
                accessorKey: 'type',
                header: 'Type',
                Cell: ({ cell }) => {
                    return cell.getValue<string>().toUpperCase().replace('_', ' ');
                },
            },
            {
                accessorKey: 'timeInForce',
                header: 'Time in Force',
                Cell: ({ cell }) => {
                    return cell.getValue<string>().toUpperCase();
                },
            },
            {
                accessorKey: 'limitPrice',
                header: 'Limit Price',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
            },
            {
                accessorKey: 'stopPrice',
                header: 'Stop Price',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
            },
            {
                accessorKey: 'notional',
                header: 'Notional',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
            },
            {
                accessorKey: 'trailPercent',
                header: 'Trail Percent',
                Cell: ({ cell }) => {
                    if (cell) {
                        return `${cell.getValue<string>()}%`;
                    }
                },
            },
            {
                accessorKey: 'trailPrice',
                header: 'Trail Price',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
            },
        ],
        [],
    );

    useEffect(() => {
        if (!orders) return;

        const updatedRowData = Object.entries(orders).map((order: any) => {
            const rowData: any = {
                symbol: order[1].symbol,
                quantity: order[1].quantity,
                filledQuantity: order[1].filled_quantity,
                side: order[1].side,
                type: order[1].type,
                timeInForce: order[1].time_in_force,
                limitPrice: order[1].limit_price,
                stopPrice: order[1].stop_price,
                notional: order[1].notional,
                trailPercent: order[1].trail_percent,
                trailPrice: order[1].trail_price,
            };

            return rowData;
        });

        setRowData(updatedRowData);
    }, [orders]);

    return isLoading ? (
        <Loader fullPage={true} />
    ) : (
        <Card variant='outlined'>
            <MaterialReactTable columns={columns} data={rowData} autoResetPageIndex={false} />
        </Card>
    );
}
