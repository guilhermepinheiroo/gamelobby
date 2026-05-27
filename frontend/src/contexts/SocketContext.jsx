import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { connectSocket, getSocket } from '../services/socket';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    setIsConnecting(true);
    const socket = connectSocket();
    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      setIsConnecting(false);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('connect_error', () => {
      setIsConnecting(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current || getSocket(), isConnected, isConnecting }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error('useSocket must be used within SocketProvider');
  return ctx;
}
