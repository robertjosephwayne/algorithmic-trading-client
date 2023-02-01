import { Link } from 'react-router-dom';
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

export default function CryptoChart() {
    const btcBarsQueryResponse = useGetBarsQuery({ symbol: 'BTCUSD' });
    const btcData = btcBarsQueryResponse.data;
    const btcIsLoading = btcBarsQueryResponse.isLoading;

    const ethBarsQueryResponse = useGetBarsQuery({ symbol: 'ETHUSD' });
    // const ethData = ethBarsQueryResponse.data;
    const ethIsLoading = ethBarsQueryResponse.isLoading;

    return btcIsLoading || ethIsLoading ? (
        <div className='flex flex-col items-center justify-center w-screen h-screen'>
            <CircleLoader color='white' />
        </div>
    ) : (
        <div className='flex flex-col h-full'>
            <div className='flex justify-end p-4 text-white'>
                <Link to='/'>Table</Link>
            </div>
            <div className='flex justify-center text-lg text-white'>
                <span>BTC Price</span>
            </div>
            <div className='flex items-center justify-center h-full text-white'>
                <ResponsiveContainer className='text-white' width='80%' height='80%'>
                    <LineChart width={400} height={400} data={btcData}>
                        <Line type='monotone' dataKey='Close' stroke='#2196f3' />
                        <XAxis
                            dataKey='Timestamp'
                            tickFormatter={dateFormatter}
                            interval='preserveStartEnd'
                            tick={{ fill: 'white' }}
                            axisLine={{ stroke: 'white' }}
                            tickLine={false}
                        />
                        <YAxis
                            tickFormatter={currencyFormatter}
                            tick={{ fill: 'white' }}
                            axisLine={{ stroke: 'white' }}
                            tickLine={false}
                        />
                        <Tooltip formatter={tooltipFormatter} content={<CustomTooltip />} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
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
