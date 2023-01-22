import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { getTickers } from './api/crypto';
import { config } from './constants';

const wsUrl = config.SERVER_URL;
const socket = io(wsUrl);

function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [bar, setBar] = useState<any>({});
    const [tickers, setTickers] = useState<any[]>([]);

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('bar', (bar) => {
            setBar(bar);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('bar');
        };
    }, []);

    return (
        <div>
            <p>Connected: {'' + isConnected}</p>
            <p>Last update: {new Date(bar.t).toLocaleString() || '-'}</p>

            {tickers && tickers.map((ticker) => ticker.ticker)}

            {isConnected && bar && (
                <div key={bar.i}>
                    {bar.pair} {(bar.p || 0).toLocaleString(2)}
                </div>
            )}
        </div>
    );
}

export default App;
