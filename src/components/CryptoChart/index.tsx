import { PuffLoader } from 'react-spinners';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

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
    data,
    isLoading,
    lineColor,
    title,
    yAxisKey,
}: {
    data: any;
    isLoading: boolean;
    lineColor?: string;
    yAxisKey: string;
    title: string;
}) {
    return (
        <>
            <div className='flex justify-center text-lg text-white'>
                <span>{title}</span>
            </div>
            <div className='flex items-center justify-center h-full text-white'>
                {isLoading ? (
                    <div
                        className='flex flex-col items-center justify-center text-white'
                        style={{ width: '80%', height: '80%' }}
                    >
                        <PuffLoader color='white' />
                    </div>
                ) : (
                    <ResponsiveContainer className='text-white' width='80%' height='80%'>
                        <LineChart width={400} height={400} data={data}>
                            {!isLoading && (
                                <Line
                                    type='monotone'
                                    dataKey={yAxisKey}
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
