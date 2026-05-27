import { GAMES } from '../services/games';
import { Logo } from './Logo';
import { ConnectionStatus } from './ConnectionStatus';
import { useSocket } from '../contexts/SocketContext';

export function Sidebar({ currentGame, onSelectGame, nickname, onLeave }) {
  const { isConnected, isConnecting } = useSocket();

  return (
    <div className="w-64 flex-shrink-0 bg-dark-900 border-r border-dark-600 flex flex-col">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-dark-600">
        <Logo size="sm" />
        <div className="mt-2">
          <ConnectionStatus isConnected={isConnected} isConnecting={isConnecting} />
        </div>
      </div>

      {/* User info */}
      <div className="px-4 py-3 border-b border-dark-600">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-neon-violet/30 border border-neon-violet/40 flex items-center justify-center text-xs font-bold font-display text-neon-purple">
            {nickname?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-mono font-medium text-gray-200 truncate">{nickname}</p>
            <p className="text-xs text-gray-600 font-mono">Jogador</p>
          </div>
        </div>
      </div>

      {/* Games list */}
      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-3 py-2">
          <p className="text-xs font-mono text-gray-600 uppercase tracking-widest px-2 mb-2">
            Lobbies de Jogos
          </p>
          <div className="space-y-0.5">
            {GAMES.map((game) => {
              const isActive = currentGame?.id === game.id;
              return (
                <button
                  key={game.id}
                  onClick={() => onSelectGame(game)}
                  className={`sidebar-item w-full text-left ${isActive ? 'active' : ''}`}
                  style={isActive ? { borderLeftColor: game.color, color: game.color } : {}}
                >
                  <span className="text-base">{game.emoji}</span>
                  <span className="font-medium truncate">{game.name}</span>
                  {isActive && (
                    <span className="ml-auto">
                      <span className="status-dot w-1.5 h-1.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Leave button */}
      <div className="px-4 py-4 border-t border-dark-600">
        <button
          onClick={onLeave}
          className="w-full px-4 py-2 rounded-lg text-xs font-mono text-gray-500 hover:text-red-400
                     hover:bg-red-500/10 border border-dark-500 hover:border-red-500/30 transition-all duration-200"
        >
          ← Sair do GameLobby
        </button>
      </div>
    </div>
  );
}