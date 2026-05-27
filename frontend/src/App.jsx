import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SocketProvider } from './contexts/SocketContext';
import { HomePage } from './pages/HomePage';
import { LobbyPage } from './pages/LobbyPage';

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lobby/:roomId" element={<LobbyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '13px',
            },
          }}
        />
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
