import { useState } from 'react';
import { Link } from 'react-router-dom';
import CryptoChart from '../components/CryptoChart';

export default function Charts() {
    const symbols = ['BTCUSD', 'ETHUSD', 'LTCUSD'];
    const [selectedSymbol, setSelectedSymbol] = useState('BTCUSD');

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
            <CryptoChart symbol={selectedSymbol} />
        </div>
    );
}
