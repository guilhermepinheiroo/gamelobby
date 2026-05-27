import { io } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

let socket = null;

/**
 * Initialize socket connection (singleton)
 */
export function getSocket() {
  if (!socket) {
    socket = io(API_URL, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: false,
    });
  }
  return socket;
}

/**
 * Connect to socket server
 */
export function connectSocket() {
  const s = getSocket();
  if (!s.connected) s.connect();
  return s;
}

/**
 * Disconnect socket
 */
export function disconnectSocket() {
  if (socket?.connected) {
    socket.disconnect();
  }
}

/**
 * Emit join_room event
 */
export function joinRoom(roomId, nickname) {
  const s = getSocket();
  s.emit('join_room', { roomId, nickname });
}

/**
 * Emit send_message event
 */
export function sendMessage(roomId, nickname, text) {
  const s = getSocket();
  s.emit('send_message', { roomId, nickname, text });
}

/**
 * Emit leave_room event
 */
export function leaveRoom(roomId, nickname) {
  const s = getSocket();
  s.emit('leave_room', { roomId, nickname });
}

export default { getSocket, connectSocket, disconnectSocket, joinRoom, sendMessage, leaveRoom };
