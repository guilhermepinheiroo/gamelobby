import { useCallback, useEffect, useRef, useState } from 'react';
import { useSocket } from '../contexts/SocketContext';
import { joinRoom, leaveRoom, sendMessage } from '../services/socket';

export function useChat(roomId, nickname) {
  const { socket, isConnected } = useSocket();
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Socket event listeners
  useEffect(() => {
    if (!socket || !roomId || !nickname) return;

    const handleReceiveMessage = ({ message }) => {
      setMessages((prev) => [...prev, { ...message, isOwn: message.socketId === socket.id }]);
    };

    const handleUserJoined = ({ message }) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleUserLeft = ({ message }) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleOnlineUsers = ({ users, count }) => {
      setOnlineUsers(users);
    };

    socket.on('receive_message', handleReceiveMessage);
    socket.on('user_joined', handleUserJoined);
    socket.on('user_left', handleUserLeft);
    socket.on('online_users', handleOnlineUsers);

return () => {
  socket.off('receive_message', handleReceiveMessage);
  socket.off('user_joined', handleUserJoined);
  socket.off('user_left', handleUserLeft);
  socket.off('online_users', handleOnlineUsers);
  setOnlineUsers([]);
};
  }, [socket, roomId, nickname]);

  // Join room when connected
  useEffect(() => {
    if (isConnected && roomId && nickname && !isJoined) {
      joinRoom(roomId, nickname);
      setIsJoined(true);
    }
  }, [isConnected, roomId, nickname, isJoined]);

  const sendMsg = useCallback(
    (text) => {
      if (!text.trim() || !roomId || !nickname) return;
      sendMessage(roomId, nickname, text);
    },
    [roomId, nickname]
  );

  const leave = useCallback(() => {
    if (roomId && nickname) {
      leaveRoom(roomId, nickname); // emite pro servidor primeiro
      setIsJoined(false);
      setMessages([]);
      setOnlineUsers([]); // limpa local depois
    }
  }, [roomId, nickname]);

  return { messages, onlineUsers, sendMsg, leave, messagesEndRef, isJoined };
}
