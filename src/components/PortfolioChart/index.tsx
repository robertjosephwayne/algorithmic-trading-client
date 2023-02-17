import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Loader from '../Loader';
import { currencyFormatter, dateFormatter } from '../../utils';
import PortfolioChartTooltip from '../PortfolioChartTooltip';
import { useEffect, useState } from 'react';

interface Props {
    data: any;
    isLoading: boolean;
}

export default function PortfolioChart({ data, isLoading }: Props) {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);

    useEffect(() => {
        if (!data) return;

        const minValue = data.reduce((minValue: any, { equity }: any) => {
            const currentMin = equity;
            return minValue === null || currentMin < minValue ? currentMin : minValue;
        }, null);

        const maxValue = data.reduce((maxValue: any, { equity }: any) => {
            const currentMax = equity;
            return currentMax > maxValue ? currentMax : maxValue;
        }, minValue);

        setMinValue(minValue);
        setMaxValue(maxValue);
    }, [data]);

    return (
        <>
            <div className='flex items-center justify-center h-full text-white'>
                {isLoading ? (
                    <Loader />
                ) : (
                    <ResponsiveContainer
                        className='text-white'
                        width='80%'
                        height='80%'
                        minHeight='200px'
                        minWidth='200px'
                    >
                        <LineChart width={300} height={300} data={data}>
                            {!isLoading && (
                                <Line
                                    type='monotone'
                                    dataKey={'equity'}
                                    stroke={'#BB86FC'}
                                    dot={false}
                                    strokeWidth={2}
                                />
                            )}
                            <Tooltip
                                formatter={(value: string) => currencyFormatter(value, 2)}
                                content={<PortfolioChartTooltip showTime={false} />}
                                cursor={{ fill: 'white', opacity: 0.2 }}
                            />
                            <XAxis
                                dataKey='timestamp'
                                tickFormatter={(value) => dateFormatter(value, false)}
                                tick={{ fill: 'white' }}
                                axisLine={{ stroke: 'white', strokeWidth: 2 }}
                                tickLine={false}
                            />
                            <YAxis
                                domain={[minValue, maxValue]}
                                tickFormatter={(value) => currencyFormatter(value, 0)}
                                tick={{ fill: 'white' }}
                                axisLine={{ stroke: 'white', strokeWidth: 2 }}
                                tickLine={false}
                                padding={{ bottom: 3 }}
                                allowDataOverflow={true}
                                width={80}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </>
    );
}
