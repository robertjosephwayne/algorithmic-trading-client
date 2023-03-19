import { useState, useEffect, useMemo } from 'react';
import { useGetPositionsQuery } from '../../api/apiSlice';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import {
    currencyFormatter,
    percentageFormatter,
    toProperCase,
    tableSortingFunctions,
} from '../../utils';
import Loader from '../Loader';
import { Box, Button, Card, TableContainer } from '@mui/material';
import { ExportToCsv } from 'export-to-csv';
import { FileDownload } from '@mui/icons-material';
import MDBox from '../MDBox';

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
                sortingFn: 'currencySorting',
            },
            {
                accessorKey: 'currentPrice',
                header: 'Current Price',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
                sortingFn: 'currencySorting',
            },
            {
                accessorKey: 'costBasis',
                header: 'Cost Basis',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
                sortingFn: 'currencySorting',
            },
            {
                accessorKey: 'marketValue',
                header: 'Market Value',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
                sortingFn: 'currencySorting',
                filterVariant: 'range',
            },
            {
                accessorKey: 'totalUnrealizedProfitLossAmount',
                header: 'Unrealized P/L ($)',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
                sortingFn: 'currencySorting',
                filterVariant: 'range',
            },
            {
                accessorKey: 'totalUnrealizedProfitLossPercent',
                header: 'Unrealized P/L (%)',
                Cell: ({ cell }) => {
                    if (cell.getValue<string>()) {
                        return percentageFormatter(cell.getValue<string>());
                    }
                },
                sortingFn: 'percentageSorting',
                filterVariant: 'range',
            },
            {
                accessorKey: 'intradayUnrealizedProfitLossAmount',
                header: 'Today P/L ($)',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
                sortingFn: 'currencySorting',
                filterVariant: 'range',
            },
            {
                accessorKey: 'intradayUnrealizedProfitLossPercent',
                header: 'Today P/L (%)',
                Cell: ({ cell }) => {
                    if (cell.getValue<string>()) {
                        return percentageFormatter(cell.getValue<string>());
                    }
                },
                sortingFn: 'percentageSorting',
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
        <Card>
            <TableContainer sx={{ boxShadow: 'none' }}>
                <MaterialReactTable
                    columns={columns}
                    data={rowData}
                    autoResetPageIndex={false}
                    enableRowActions
                    renderRowActions={({ row }: { row: any }) => (
                        <a href={`/fundamentals?symbol=${row.getValue('symbol')}`}>Fundamentals</a>
                    )}
                    positionToolbarAlertBanner='bottom'
                    renderTopToolbarCustomActions={() => {
                        return (
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: '1rem',
                                    p: '0.5rem',
                                    flexWrap: 'wrap',
                                }}
                            >
                                <Button onClick={handleExportData} startIcon={<FileDownload />}>
                                    Export All Data
                                </Button>
                            </Box>
                        );
                    }}
                    muiTopToolbarProps={{
                        sx: {
                            backgroundColor: 'white.main',
                        },
                    }}
                    muiBottomToolbarProps={{
                        sx: {
                            backgroundColor: 'white.main',
                        },
                    }}
                    muiTableHeadCellProps={{
                        sx: {
                            backgroundColor: 'white.main',
                            fontSize: ({ typography: { size } }: any) => ({ fontSize: size.sm }),
                            textTransform: 'uppercase',
                        },
                    }}
                    muiTableBodyCellProps={{
                        sx: {
                            backgroundColor: 'white.main',
                            fontSize: ({ typography: { size } }: any) => ({ fontSize: size.sm }),
                        },
                    }}
                    positionActionsColumn='last'
                    displayColumnDefOptions={{
                        'mrt-row-actions': {
                            header: '', // change header text
                        },
                    }}
                    sortingFns={tableSortingFunctions}
                />
            </TableContainer>
        </Card>
    );
}
