import { PuffLoader } from 'react-spinners';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useGetBarsQuery } from '../../api/apiSlice';

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className='p-2 bg-black'>
                <p>Date: {dateFormatter(payload[0].payload.Timestamp)}</p>
                <div>Closing Price: {currencyFormatter(payload[0].payload.Close)}</div>
            </div>
        );
    }

    return null;
};

export default function CryptoChart({
    symbol,
    lineColor,
    timeframe,
}: {
    symbol: string;
    lineColor?: string;
    timeframe: string;
}) {
    const { data, isLoading, isFetching } = useGetBarsQuery({ symbol, timeframe });

    return isLoading ? (
        <div className='absolute flex flex-col items-center justify-center w-screen h-screen'>
            <PuffLoader color='white' />
        </div>
    ) : (
        <>
            <div className='flex justify-center text-lg text-white'>
                <span>Closing Price</span>
            </div>
            <div className='flex items-center justify-center h-full text-white'>
                {isFetching ? (
                    <div
                        className='flex flex-col items-center justify-center text-white'
                        style={{ width: '80%', height: '80%' }}
                    >
                        <PuffLoader color='white' />
                    </div>
                ) : (
                    <ResponsiveContainer className='text-white' width='80%' height='80%'>
                        <LineChart width={400} height={400} data={data}>
                            {!isFetching && (
                                <Line
                                    type='monotone'
                                    dataKey='Close'
                                    stroke={lineColor || '#BB86FC'}
                                    dot={false}
                                    strokeWidth={2}
                                />
                            )}
                            <XAxis
                                dataKey='Timestamp'
                                tickFormatter={dateFormatter}
                                interval='preserveStartEnd'
                                tick={{ fill: 'white' }}
                                axisLine={{ stroke: 'white', strokeWidth: 2 }}
                                tickLine={false}
                            />
                            <YAxis
                                tickFormatter={currencyFormatter}
                                tick={{ fill: 'white' }}
                                axisLine={{ stroke: 'white', strokeWidth: 2 }}
                                tickLine={false}
                            />
                            <Tooltip formatter={tooltipFormatter} content={<CustomTooltip />} />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </>
    );
}

function currencyFormatter(value: any): string {
    if (!value) return '';

    return value.toLocaleString(undefined, {
        currency: 'usd',
        style: 'currency',
        maximumFractionDigits: 0,
    });
}

function dateFormatter(value: any): string {
    if (!value) return '';

    return new Date(value).toLocaleDateString();
}

function tooltipFormatter(value: any) {
    return currencyFormatter(value);
}
