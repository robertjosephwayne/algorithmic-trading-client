import { useState } from 'react';
import { Link } from 'react-router-dom';
import CryptoChart from '../components/CryptoChart';

export default function Charts() {
    const symbols = ['BTCUSD', 'ETHUSD', 'LTCUSD'];
    const timeframes = ['Daily', 'Weekly', 'Monthly'];
    const [selectedSymbol, setSelectedSymbol] = useState('BTCUSD');
    const [selectedTimeframe, setSelectedTimeframe] = useState('Monthly');

    return (
        <div className='flex flex-col h-full'>
            <div className='flex justify-between p-4 text-white'>
                <div className='space-x-4'>
                    {symbols.map((symbol) => {
                        return (
                            <button key={symbol} onClick={() => setSelectedSymbol(symbol)}>
                                {symbol.replace('USD', '')}
                            </button>
                        );
                    })}
                </div>
                <Link to='/'>Live Prices</Link>
            </div>
            <CryptoChart symbol={selectedSymbol} timeframe={selectedTimeframe.toLowerCase()} />
            <div className='flex justify-center p-4 text-white'>
                <div className='space-x-4'>
                    {timeframes.map((timeframe) => {
                        return (
                            <button key={timeframe} onClick={() => setSelectedTimeframe(timeframe)}>
                                {timeframe}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
