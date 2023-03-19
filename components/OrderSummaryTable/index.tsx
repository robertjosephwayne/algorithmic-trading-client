import { useState, useEffect, useMemo } from 'react';
import { useGetOrdersQuery } from '../../api/apiSlice';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { currencyFormatter, percentageFormatter, tableSortingFunctions } from '../../utils';
import Loader from '../Loader';
import { Box, Button, Card, TableContainer } from '@mui/material';
import { ExportToCsv } from 'export-to-csv';
import { FileDownload } from '@mui/icons-material';

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
                sortingFn: 'currencySorting',
            },
            {
                accessorKey: 'stopPrice',
                header: 'Stop Price',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
                sortingFn: 'currencySorting',
            },
            {
                accessorKey: 'notional',
                header: 'Notional',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
                sortingFn: 'currencySorting',
            },
            {
                accessorKey: 'trailPercent',
                header: 'Trail Percent',
                Cell: ({ cell }) => {
                    if (cell.getValue<string>()) {
                        return percentageFormatter(cell.getValue<string>());
                    }
                },
                sortingFn: 'percentageSorting',
            },
            {
                accessorKey: 'trailPrice',
                header: 'Trail Price',
                Cell: ({ cell }) => currencyFormatter(cell.getValue<number>()),
                sortingFn: 'currencySorting',
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
        filename: `open orders ${new Date().toLocaleDateString()}`,
    };

    const csvExporter = new ExportToCsv(csvOptions);

    const handleExportData = () => {
        csvExporter.generateCsv(rowData);
    };

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
        <Card>
            <TableContainer sx={{ boxShadow: 'none' }}>
                <MaterialReactTable
                    columns={columns}
                    data={rowData}
                    autoResetPageIndex={false}
                    renderTopToolbarCustomActions={() => {
                        return (
                            <Box
                                sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
                            >
                                <Button onClick={handleExportData} startIcon={<FileDownload />}>
                                    Export All Data
                                </Button>
                            </Box>
                        );
                    }}
                    sortingFns={tableSortingFunctions}
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
                />
            </TableContainer>
        </Card>
    );
}
