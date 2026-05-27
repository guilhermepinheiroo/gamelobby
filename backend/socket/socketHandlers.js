const { formatMessage } = require('../utils/messageFormatter');

/**
 * @param {import('socket.io').Server} io
 * @param {import('../utils/roomManager')} roomManager
 */
function setupSocketHandlers(io, roomManager) {
  io.on('connection', (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    socket.on('join_room', ({ roomId, nickname }) => {
      if (!roomId || !nickname) {
        socket.emit('error', { message: 'roomId and nickname are required' });
        return;
      }

      const previousRoom = roomManager.getUserRoom(socket.id);
      if (previousRoom && previousRoom !== roomId) {
        socket.leave(previousRoom);
        roomManager.removeUserFromRoom(previousRoom, socket.id);

        const leftMsg = formatMessage('system', `${nickname} left the lobby`, 'system');
        io.to(previousRoom).emit('user_left', { message: leftMsg });
        io.to(previousRoom).emit('online_users', {
          users: roomManager.getRoomUsers(previousRoom),
          count: roomManager.getRoomCount(previousRoom),
        });
      }

      socket.join(roomId);
      roomManager.addUser(roomId, socket.id, { nickname });

      console.log(`👤 ${nickname} joined room: ${roomId}`);

      socket.emit('online_users', {
        users: roomManager.getRoomUsers(roomId),
        count: roomManager.getRoomCount(roomId),
      });

      const joinMsg = formatMessage('system', `${nickname} entered the lobby`, 'system');
      socket.to(roomId).emit('user_joined', { message: joinMsg, nickname });

      io.to(roomId).emit('online_users', {
        users: roomManager.getRoomUsers(roomId),
        count: roomManager.getRoomCount(roomId),
      });
    });

    socket.on('send_message', ({ roomId, nickname, text }) => {
      if (!roomId || !nickname || !text?.trim()) return;

      const message = formatMessage(nickname, text.trim(), 'user', socket.id);
      console.log(`💬 [${roomId}] ${nickname}: ${text.trim()}`);

      io.to(roomId).emit('receive_message', { message });
    });

    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);

      const leftRooms = roomManager.removeUserFromAllRooms(socket.id);

      leftRooms.forEach(({ roomId, user }) => {
        const leftMsg = formatMessage(
          'system',
          `${user.nickname} left the lobby`,
          'system'
        );
        io.to(roomId).emit('user_left', { message: leftMsg, nickname: user.nickname });
        io.to(roomId).emit('online_users', {
          users: roomManager.getRoomUsers(roomId),
          count: roomManager.getRoomCount(roomId),
        });
      });
    });

    socket.on('leave_room', ({ roomId, nickname }) => {
      if (!roomId) return;
      socket.leave(roomId);
      roomManager.removeUserFromRoom(roomId, socket.id);

      const leftMsg = formatMessage('system', `${nickname} left the lobby`, 'system');
      io.to(roomId).emit('user_left', { message: leftMsg, nickname });
      io.to(roomId).emit('online_users', {
        users: roomManager.getRoomUsers(roomId),
        count: roomManager.getRoomCount(roomId),
      });
    });
  });
}

module.exports = { setupSocketHandlers };
