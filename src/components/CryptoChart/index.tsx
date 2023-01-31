import { Link } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useGetBarsQuery } from '../../api/apiSlice';

export default function CryptoChart() {
    const { data, isLoading } = useGetBarsQuery({});

    return isLoading ? (
        <div className='flex flex-col items-center justify-center w-screen h-screen'>
            <CircleLoader color='white' />
        </div>
    ) : (
        <div className='flex flex-col h-full'>
            <div className='flex justify-end p-4 text-white'>
                <Link to='/'>Table</Link>
            </div>
            <div className='flex justify-center text-white'>
                <span>BTC Price</span>
            </div>
            <div className='flex items-center justify-center h-full text-white'>
                <ResponsiveContainer className='' width='80%' height='80%'>
                    <LineChart width={400} height={400} data={data}>
                        <Line type='monotone' dataKey='Close' stroke='#2196f3' />
                        <XAxis dataKey='Timestamp' tickFormatter={dateFormatter} />
                        <YAxis tickFormatter={currencyFormatter} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

function currencyFormatter(value: any, index: number): string {
    if (!value) return '';

    return value.toLocaleString(undefined, {
        currency: 'usd',
        style: 'currency',
        maximumFractionDigits: 0,
    });
}

function dateFormatter(value: any, index: number): string {
    if (!value) return '';

    return new Date(value).toLocaleDateString();
}
