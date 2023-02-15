import { useState, useEffect, useMemo } from 'react';
import { useGetPositionsQuery } from '../../api/apiSlice';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { currencyFormatter } from '../../utils';
import Loader from '../Loader';

type PositionSummaryTableRow = {
    symbol: string;
    quantity: number;
    side: string;
    exchange: string;
    costBasis: string;
    marketValue: string;
    totalProfitLoss: string;
};

export default function PositionSummaryTable() {
    const [rowData, setRowData] = useState<PositionSummaryTableRow[]>([]);

    const { data: positions, isLoading } = useGetPositionsQuery({});

    const columns = useMemo<MRT_ColumnDef<PositionSummaryTableRow>[]>(
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
                accessorKey: 'side',
                header: 'Side',
            },
            {
                accessorKey: 'exchange',
                header: 'Exchange',
            },
            {
                accessorKey: 'costBasis',
                header: 'Cost Basis',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
                filterVariant: 'range',
            },
            {
                accessorKey: 'marketValue',
                header: 'Market Value',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
                filterVariant: 'range',
            },
            {
                accessorKey: 'totalProfitLoss',
                header: 'Total P/L ($)',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
                filterVariant: 'range',
            },
        ],
        [],
    );

    useEffect(() => {
        if (!positions) return;

        const updatedRowData = Object.entries(positions).map((position: any) => {
            const rowData: any = {
                symbol: position[1].symbol,
                quantity: position[1].quantity,
                side: position[1].side,
                exchange: position[1].exchange,
                costBasis: position[1].cost_basis,
                marketValue: position[1].market_value,
                totalProfitLoss: position[1].market_value - position[1].cost_basis,
            };

            return rowData;
        });

        setRowData(updatedRowData);
    }, [positions]);

    return isLoading ? (
        <Loader fullPage={true} />
    ) : (
        <div className='p-4 '>
            <MaterialReactTable columns={columns} data={rowData} />
        </div>
    );
}
