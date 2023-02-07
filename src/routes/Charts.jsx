import { useState } from 'react';
import { Link } from 'react-router-dom';
import CryptoChart from '../components/CryptoChart';
import cn from 'classnames';
import { useGetBarsQuery } from '../api/apiSlice';
import { formatRFC3339 } from 'date-fns';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function Charts() {
    const symbols = ['BTCUSD', 'ETHUSD', 'LTCUSD'];
    const timeframes = ['Day', 'Week', 'Month'];
    const [selectedSymbol, setSelectedSymbol] = useState('BTCUSD');
    const [selectedTimeframe, setSelectedTimeframe] = useState('Month');
    const [startDate, setStartDate] = useState(formatRFC3339(new Date(2015, 0, 1)));
    const [interval] = useState(1);

    const { data, isLoading, isFetching } = useGetBarsQuery({
        symbol: selectedSymbol,
        timeframe: selectedTimeframe.toLowerCase(),
        start: startDate,
        interval,
    });

    const handleStartDateChange = (event) => {
        setStartDate(formatRFC3339(new Date(event)));
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <div className='flex flex-col w-full h-full'>
                <div className='flex justify-end p-4 space-x-4 text-sm text-white'>
                    <Link
                        className='w-24 px-2 py-1 text-center hover:bg-white hover:bg-opacity-20'
                        to='/'
                    >
                        Live Prices
                    </Link>

                    <Link className='w-24 px-2 py-1 text-center text-black bg-white' to='/charts'>
                        Charts
                    </Link>
                </div>

                <CryptoChart data={data} isLoading={isFetching || isLoading} yAxisKey='Close' />

                <div className='flex flex-col items-center justify-center pb-4 text-white'>
                    <div className='p-1 m-1'>
                        <DesktopDatePicker
                            label='Start Date'
                            inputFormat='MM/DD/YYYY'
                            value={startDate}
                            onChange={handleStartDateChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </div>

                    <div className='p-1 m-1 border border-white border-1'>
                        {symbols.map((symbol) => {
                            return (
                                <button
                                    className={cn(
                                        'w-20',
                                        { 'bg-white': symbol === selectedSymbol },
                                        { 'text-black': symbol === selectedSymbol },
                                    )}
                                    key={symbol}
                                    onClick={() => setSelectedSymbol(symbol)}
                                >
                                    {symbol.replace('USD', '')}
                                </button>
                            );
                        })}
                    </div>
                    <div className='p-1 m-1 border border-white border-1'>
                        {timeframes.map((timeframe) => {
                            return (
                                <button
                                    className={cn(
                                        'w-20',
                                        { 'bg-white': timeframe === selectedTimeframe },
                                        { 'text-black': timeframe === selectedTimeframe },
                                    )}
                                    key={timeframe}
                                    onClick={() => setSelectedTimeframe(timeframe)}
                                >
                                    {timeframe}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
