import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useGetPortfolioHistoryQuery } from '../../api/apiSlice';
import Loader from '../Loader';
import { currencyFormatter, dateFormatter } from '../../utils';
import PortfolioChartTooltip from '../PortfolioChartTooltip';

export default function PortfolioChart() {
    const { data, isLoading } = useGetPortfolioHistoryQuery({});

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
                                tickFormatter={(value) => currencyFormatter(value, 0)}
                                tick={{ fill: 'white' }}
                                axisLine={{ stroke: 'white', strokeWidth: 2 }}
                                tickLine={false}
                                width={80}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </>
    );
}
