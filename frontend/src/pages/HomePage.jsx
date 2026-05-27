import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Logo } from '../components/Logo';
import { GameCard } from '../components/GameCard';
import { GameSelectModal } from '../components/GameSelectModal';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { useSocket } from '../contexts/SocketContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { GAMES } from '../services/games';

export function HomePage() {
  const navigate = useNavigate();
  const { isConnected, isConnecting } = useSocket();
  const [nickname, setNickname] = useLocalStorage('gamelobby_nickname', '');
  const [inputNick, setInputNick] = useState(nickname);
  const [selectedGame, setSelectedGame] = useState(null);

  const handleGameClick = (game) => {
    if (!inputNick.trim()) {
      toast.error('Escolha um nickname primeiro!', {
        icon: '⚠️',
        style: { background: '#130f23', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' },
      });
      return;
    }
    setNickname(inputNick.trim());
    setSelectedGame(game);
  };

  const handleJoinExisting = (roomId) => {
    navigate(`/lobby/${roomId}?nick=${encodeURIComponent(inputNick.trim())}`);
  };

  const handleCreateRoom = (roomId, code) => {
    toast.success(`Sala ${code} criada!`, {
      icon: '🏠',
      style: { background: '#130f23', border: '1px solid rgba(168,85,247,0.3)', color: '#c084fc' },
    });
    navigate(`/lobby/${roomId}?nick=${encodeURIComponent(inputNick.trim())}&code=${code}`);
  };

  return (
    <div className="min-h-screen bg-dark-950 grid-bg hexagon-bg scanline-overlay overflow-y-auto">
      <header className="sticky top-0 z-10 border-b border-dark-600 px-6 py-3"
              style={{ background: 'rgba(7, 3, 15, 0.8)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo size="md" />
          <ConnectionStatus isConnected={isConnected} isConnecting={isConnecting} />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono mb-6"
               style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.25)', color: '#c084fc' }}>
            <span className="status-dot w-1.5 h-1.5" />
            Chat em tempo real — encontre seu squad
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 tracking-wide">
            Encontre Seu{' '}
            <span className="text-neon-purple glow-text">Squad</span>
          </h1>
          <p className="text-gray-500 font-body text-lg max-w-xl mx-auto">
            Conecte-se com gamers em tempo real. Escolha seu jogo, entre no lobby e comece a conversar.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <div className="neon-border rounded-xl p-6" style={{ background: 'rgba(19, 15, 35, 0.8)' }}>
            <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">
              Seu Nickname
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={inputNick}
                onChange={(e) => setInputNick(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && inputNick.trim() && setNickname(inputNick.trim())}
                placeholder="Digite seu nickname..."
                maxLength={20}
                className="input-gamer flex-1 font-mono"
              />
              {inputNick.trim() && (
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold font-display flex-shrink-0"
                  style={{ background: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.4)', color: '#c084fc' }}
                >
                  {inputNick[0]?.toUpperCase()}
                </div>
              )}
            </div>

          </div>
        </div>

        <div>
          <h2 className="font-display font-semibold text-sm text-gray-600 uppercase tracking-widest mb-6 text-center">
            Selecionar Jogo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {GAMES.map((game) => (
              <GameCard key={game.id} game={game} onClick={handleGameClick} />
            ))}
          </div>
        </div>

      </main>

      {/* Modal */}
      {selectedGame && (
        <GameSelectModal
          game={selectedGame}
          onJoinExisting={handleJoinExisting}
          onCreateRoom={handleCreateRoom}
          onCancel={() => setSelectedGame(null)}
        />
      )}
    </div>
  );
}