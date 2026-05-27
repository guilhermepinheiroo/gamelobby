const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { setupSocketHandlers } = require('./socket/socketHandlers');

const app = express();
const server = http.createServer(app);

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || (origin && origin.endsWith('.vercel.app'))) {
        return callback(null, true);
      }
      callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST'],
    credentials: true,
  },
  pingTimeout: 60000,
  pingInterval: 25000,
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'GameLobby backend is running 🎮' });
});

app.get('/rooms', (req, res) => {
  const rooms = roomManager.getAllRooms();
  res.json({ rooms });
});

const roomManager = require('./utils/roomManager');

setupSocketHandlers(io, roomManager);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`\n🎮 GameLobby Backend running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health\n`);
});
