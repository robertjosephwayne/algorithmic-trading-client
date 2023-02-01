import { CircleLoader } from 'react-spinners';
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

export default function CryptoChart({ symbol, lineColor }: { symbol: string; lineColor?: string }) {
    const { data, isLoading } = useGetBarsQuery({ symbol });

    return isLoading ? (
        <div className='absolute flex flex-col items-center justify-center w-screen h-screen'>
            <CircleLoader color='white' />
        </div>
    ) : (
        <>
            <div className='flex justify-center text-lg text-white'>
                <span>{symbol.replace('USD', '')}</span>
            </div>
            <div className='flex items-center justify-center h-full text-white'>
                <ResponsiveContainer className='text-white' width='80%' height='80%'>
                    <LineChart width={400} height={400} data={data}>
                        <Line
                            type='monotone'
                            dataKey='Close'
                            stroke={lineColor || '#BB86FC'}
                            dot={false}
                            strokeWidth={2}
                        />
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
