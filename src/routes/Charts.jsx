import { useState } from 'react';
import { Link } from 'react-router-dom';
import CryptoChart from '../components/CryptoChart';
import cn from 'classnames';

export default function Charts() {
    const symbols = ['BTCUSD', 'ETHUSD', 'LTCUSD'];
    const timeframes = ['Daily', 'Weekly', 'Monthly'];
    const [selectedSymbol, setSelectedSymbol] = useState('BTCUSD');
    const [selectedTimeframe, setSelectedTimeframe] = useState('Monthly');

    return (
        <div className='flex flex-col h-full pb-4'>
            <div className='flex justify-end p-4 text-white'>
                <Link to='/'>Live Prices</Link>
            </div>
            <CryptoChart symbol={selectedSymbol} timeframe={selectedTimeframe.toLowerCase()} />
            <div className='flex flex-col items-center justify-center text-white'>
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
    );
}
