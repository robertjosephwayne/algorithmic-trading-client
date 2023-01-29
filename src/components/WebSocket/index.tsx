import { createContext, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { config } from '../../constants';
import { useDispatch } from 'react-redux';
import { addBar } from '../../redux/features/crypto/cryptoSlice';

const wsUrl = config.SERVER_URL || '';

const WebSocketContext = createContext<{ socket: Socket } | null>(null);

export { WebSocketContext };

export default function WebSocket({ children }: { children: ReactNode }) {
    let socket;

    const dispatch = useDispatch();

    if (!socket) {
        socket = io(wsUrl);

        socket.on('bar', (payload) => {
            const bar = {
                symbol: payload.Symbol,
                price: payload.Price,
            };

            dispatch(addBar(bar));
        });
    }

    const ws = {
        socket: socket,
    };

    return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
}
