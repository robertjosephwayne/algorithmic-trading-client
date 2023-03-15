import { useState, useEffect, useMemo } from 'react';
import { useGetPositionsQuery } from '../../api/apiSlice';
import MaterialReactTable, { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { currencyFormatter, toProperCase } from '../../utils';
import Loader from '../Loader';
import { Box, Button, Card } from '@mui/material';
import { ExportToCsv } from 'export-to-csv';
import { FileDownload } from '@mui/icons-material';

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
                header: 'Unrealized P/L ($)',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
                filterVariant: 'range',
            },
            {
                accessorKey: 'totalUnrealizedProfitLossPercent',
                header: 'Unrealized P/L (%)',
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

    const headers = useMemo(() => {
        const firstRow = rowData[0];
        const headers = [];
        for (const property in firstRow) {
            const column = columns.find((column) => column.accessorKey === property);
            if (column && column.header) {
                headers.push(column.header);
            }
        }
        return headers;
    }, [rowData]);

    const csvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        useBom: true,
        useKeysAsHeaders: false,
        headers,
        filename: `positions ${new Date().toLocaleDateString()}`,
    };

    const csvExporter = new ExportToCsv(csvOptions);

    const handleExportData = () => {
        csvExporter.generateCsv(rowData);
    };

    useEffect(() => {
        if (!positions) return;

        const updatedRowData = Object.entries(positions).map((position: any) => {
            const rowData: any = {
                symbol: position[1].symbol,
                exchange: position[1].exchange,
                side: position[1].side,
                quantity: position[1].quantity,
                averageEntryPrice: position[1].average_entry_price,
                currentPrice: position[1].current_price,
                costBasis: position[1].cost_basis,
                marketValue: position[1].market_value,
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
                positionToolbarAlertBanner='bottom'
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <Box sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}>
                            <Button
                                color='info'
                                onClick={handleExportData}
                                startIcon={<FileDownload />}
                                variant='outlined'
                                sx={{ color: 'white' }}
                            >
                                Export All Data
                            </Button>
                        </Box>
                    );
                }}
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
