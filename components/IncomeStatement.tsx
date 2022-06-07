/* eslint-disable react/jsx-key */
import { useMemo } from 'react';
import { useTable } from 'react-table';

export default function IncomeStatement({ reports }) {
    const reportsToTableData = (reports) => {
        if (!reports || !reports[0]) return [];
        const lineItems = Object.keys(reports[0]);
        const endingDates = reports.map((report) => report.fiscalDateEnding);

        const reportsByDate = {};
        for (const report of reports) {
            reportsByDate[report.fiscalDateEnding] = report;
        }

        const rows = [];

        for (const lineItem of lineItems) {
            const row = {
                lineItem,
            };

            for (const date of endingDates) {
                row[date] = reportsByDate[date][lineItem];
            }

            rows.push(row);
        }

        return rows;
    };

    const data = useMemo(() => reportsToTableData(reports), [reports]);

    const columns = useMemo(
        () => [
            {
                Header: ' ',
                accessor: 'lineItem',
            },
            ...reports.map((report) => {
                return {
                    Header: report.fiscalDateEnding,
                    accessor: report.fiscalDateEnding,
                };
            }),
        ],
        [reports],
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    return (
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                    borderBottom: 'solid 3px red',
                                    background: 'aliceblue',
                                    color: 'black',
                                    fontWeight: 'bold',
                                }}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: '10px',
                                            border: 'solid 1px gray',
                                            background: 'papayawhip',
                                        }}>
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
