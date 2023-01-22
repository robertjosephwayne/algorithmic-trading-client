import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { config } from './constants';

const wsUrl = config.SERVER_URL;
const socket = io(wsUrl);

function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [bars, setBars] = useState<{ [key: string]: { price?: number } }>({});

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('bar', (bar) => {
            console.log(bar);
            setBars((existingBars) => {
                const updatedBars = {
                    ...existingBars,
                    [bar.pair]: {
                        price: bar.p,
                    },
                };
                return updatedBars;
            });
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('bar');
        };
    }, []);

    return (
        <div>
            {isConnected &&
                Object.keys(bars).map((key) => (
                    <div key={key}>
                        {key}{' '}
                        {(bars[key].price || 0).toLocaleString(undefined, {
                            currency: 'usd',
                            style: 'currency',
                        })}
                    </div>
                ))}
        </div>
    );
}

export default App;
