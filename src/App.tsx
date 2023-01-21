import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { config } from './constants';

const wsUrl = config.SERVER_URL;
const socket = io(wsUrl);

function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState('');

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('pong', () => {
            setLastPong(new Date().toISOString());
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        };
    }, []);

    const sendPing = () => {
        socket.emit('ping', 'test');
    };

    return (
        <div>
            <p>Connected: {'' + isConnected}</p>
            <p>Last pong: {lastPong || '-'}</p>
            <button onClick={sendPing}>Send ping</button>
        </div>
    );
}

export default App;
