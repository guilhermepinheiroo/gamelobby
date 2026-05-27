# 🎮 GameLobby

**Real-time gamer chat system — find your squad, chat by game**

> A full-stack real-time chat application built with React, Node.js, and Socket.IO. Built for gamers looking to find squads for CS2, Valorant, League of Legends, and more.

---

## ✨ Features

- **Real-time WebSocket chat** via Socket.IO
- **7 game lobbies**: CS2, Valorant, LoL, Fortnite, Minecraft, R6 Siege, GTA V
- **Quick Join** main lobbies or **Create private rooms** with custom codes
- **Online users list** with live presence
- **System messages**: user joined/left notifications
- **Auto-scroll** to latest messages
- **Timestamp** on every message
- **Nickname saved** to localStorage
- **Toast notifications** for key events
- **Loading screen** while connecting
- **Discord-like layout**: sidebar, chat area, online users

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + TailwindCSS v3 |
| Backend | Node.js + Express + Socket.IO |
| Routing | React Router v6 |
| Toasts | react-hot-toast |
| Styling | TailwindCSS + custom CSS animations |
| Fonts | Rajdhani, Exo 2, JetBrains Mono |

---

## 📁 Project Structure

```
gamelobby/
├── backend/
│   ├── server.js              # Entry point
│   ├── socket/
│   │   └── socketHandlers.js  # All Socket.IO event handlers
│   ├── utils/
│   │   ├── roomManager.js     # In-memory room/user state
│   │   └── messageFormatter.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Logo.jsx
    │   │   ├── GameCard.jsx
    │   │   ├── GameSelectModal.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── Message.jsx
    │   │   ├── MessageInput.jsx
    │   │   ├── OnlineUsers.jsx
    │   │   ├── LoadingScreen.jsx
    │   │   └── ConnectionStatus.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   └── LobbyPage.jsx
    │   ├── services/
    │   │   ├── socket.js      # Socket singleton + emitters
    │   │   └── games.js       # Game data
    │   ├── contexts/
    │   │   └── SocketContext.jsx
    │   ├── hooks/
    │   │   ├── useChat.js
    │   │   └── useLocalStorage.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/gamelobby.git
cd gamelobby
```

### 2. Start the Backend

```bash
cd backend
npm install
npm run dev       # Development with nodemon
# OR
npm start         # Production
```

Backend will run on **http://localhost:3001**

Check health: http://localhost:3001/health

### 3. Start the Frontend

```bash
cd frontend
npm install

# Copy env file
cp .env.example .env

npm run dev
```

Frontend will run on **http://localhost:5173**

---

## ⚙️ Environment Variables

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3001
```

### Backend (`backend/.env`)

```env
PORT=3001
ALLOWED_ORIGINS=http://localhost:5173
```

---

## 🌐 Socket Events Reference

### Client → Server

| Event | Payload | Description |
|---|---|---|
| `join_room` | `{ roomId, nickname }` | Join a game room |
| `send_message` | `{ roomId, nickname, text }` | Send a chat message |
| `leave_room` | `{ roomId, nickname }` | Leave a room explicitly |
| `disconnect` | — | Auto-fired on tab close |

### Server → Client

| Event | Payload | Description |
|---|---|---|
| `receive_message` | `{ message }` | New message broadcast |
| `user_joined` | `{ message, nickname }` | System: someone joined |
| `user_left` | `{ message, nickname }` | System: someone left |
| `online_users` | `{ users, count }` | Updated user list |

---

## 🚢 Deploy

### Frontend → Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repo, set root to `frontend/`
4. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com`
5. Deploy!

### Backend → Render

1. Go to [render.com](https://render.com) → New Web Service
2. Connect your repo, set root to `backend/`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables:
   - `PORT=10000` (Render default)
   - `ALLOWED_ORIGINS=https://your-app.vercel.app`
6. Deploy!

### Backend → Railway

1. Go to [railway.app](https://railway.app) → New Project
2. Deploy from GitHub, select `backend/` folder
3. Add same environment variables as above
4. Railway auto-detects Node.js and deploys

---

## 🎨 Design System

- **Colors**: Dark (#07030f base) with purple/violet neon accents (#a855f7)
- **Fonts**: Rajdhani (display), Exo 2 (body), JetBrains Mono (code/UI)
- **Effects**: CSS grid background, scanline overlay, neon glow shadows
- **Animations**: fade-in, slide-up, bounce, pulse-slow

---

## 📝 License

MIT — feel free to use, fork, and build on this!

---

Built with ❤️ for the gamer community.
