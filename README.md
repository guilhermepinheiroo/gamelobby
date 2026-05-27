# 🎮 GameLobby

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
