import { useState, useEffect, useMemo } from 'react';
import { useGetPositionsQuery } from '../../api/apiSlice';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { currencyFormatter, toProperCase } from '../../utils';
import Loader from '../Loader';
import { Card } from '@mui/material';

type PositionSummaryTableRow = {
    symbol: string;
    quantity: number;
    side: string;
    exchange: string;
    averageEntryPrice: string;
    costBasis: string;
    marketValue: string;
    currentPrice: string;
    totalUnrealizedProfitLossAmount: string;
    totalUnrealizedProfitLossPercent: string;
    intradayUnrealizedProfitLossAmount: string;
    intradayUnrealizedProfitLossPercent: string;
};

export default function PositionSummaryTable() {
    const [rowData, setRowData] = useState<PositionSummaryTableRow[]>([]);

    const { data: positions, isLoading } = useGetPositionsQuery({}, { pollingInterval: 5000 });

    const columns = useMemo<MRT_ColumnDef<PositionSummaryTableRow>[]>(
        () => [
            {
                accessorKey: 'symbol',
                header: 'Symbol',
            },
            {
                accessorKey: 'exchange',
                header: 'Exchange',
            },
            {
                accessorKey: 'side',
                header: 'Side',
                Cell: ({ cell }) => {
                    return toProperCase(cell.getValue<string>());
                },
            },
            {
                accessorKey: 'quantity',
                header: 'Quantity',
            },
            {
                accessorKey: 'averageEntryPrice',
                header: 'Avg. Entry Price',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
            },
            {
                accessorKey: 'currentPrice',
                header: 'Current Price',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
            },
            {
                accessorKey: 'costBasis',
                header: 'Cost Basis',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
            },
            {
                accessorKey: 'marketValue',
                header: 'Market Value',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
                filterVariant: 'range',
            },
            {
                accessorKey: 'totalUnrealizedProfitLossAmount',
                header: 'Total P/L ($)',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
                filterVariant: 'range',
            },
            {
                accessorKey: 'totalUnrealizedProfitLossPercent',
                header: 'Total P/L (%)',
                Cell: ({ cell }) => {
                    if (cell.getValue<string>()) {
                        const floatValue = parseFloat(cell.getValue<string>());
                        const formattedValue = floatValue.toLocaleString(undefined, {
                            style: 'percent',
                            minimumFractionDigits: 2,
                        });
                        return formattedValue;
                    }
                },
                filterVariant: 'range',
            },
            {
                accessorKey: 'intradayUnrealizedProfitLossAmount',
                header: 'Today P/L ($)',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
                filterVariant: 'range',
            },
            {
                accessorKey: 'intradayUnrealizedProfitLossPercent',
                header: 'Today P/L (%)',
                Cell: ({ cell }) => {
                    if (cell.getValue<string>()) {
                        const floatValue = parseFloat(cell.getValue<string>());
                        const formattedValue = floatValue.toLocaleString(undefined, {
                            style: 'percent',
                            minimumFractionDigits: 2,
                        });
                        return formattedValue;
                    }
                },
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
                marketValue: position[1].market_value,
                costBasis: position[1].cost_basis,
                averageEntryPrice: position[1].average_entry_price,
                currentPrice: position[1].current_price,
                totalUnrealizedProfitLossAmount: position[1].total_unrealized_pl,
                totalUnrealizedProfitLossPercent: position[1].total_unrealized_pl_percent,
                intradayUnrealizedProfitLossAmount: position[1].intraday_unrealized_pl,
                intradayUnrealizedProfitLossPercent: position[1].intraday_unrealized_pl_percent,
            };

            return rowData;
        });

        setRowData(updatedRowData);
    }, [positions]);

    return isLoading ? (
        <Loader fullPage={true} />
    ) : (
        <Card variant='outlined'>
            <MaterialReactTable
                columns={columns}
                data={rowData}
                autoResetPageIndex={false}
                enableRowActions
                renderRowActions={({ row }: { row: any }) => (
                    <a href={`/fundamentals?symbol=${row.getValue('symbol')}`}>Fundamentals</a>
                )}
                positionActionsColumn='last'
                displayColumnDefOptions={{
                    'mrt-row-actions': {
                        header: '', // change header text
                    },
                }}
            />
        </Card>
    );
}
